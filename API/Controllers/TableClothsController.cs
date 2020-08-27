using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Core.Interface;
using Core.Model;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CurtainShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableClothsController: ControllerBase
    {
        private readonly ITableClothRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public TableClothsController(ITableClothRepository Repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repository = Repository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        
        public async Task<IActionResult> GetAll([FromQuery]TableClothParams tableClothParams)
        {
           var tableCloths = await _repository.GetTableCloths(tableClothParams);

            var tableClothsToList = _mapper.Map<IEnumerable<TableClothToListDTO>>(tableCloths);

            Response.AddPagination(tableCloths.CurrentPage, tableCloths.PageSize, tableCloths.TotalCount, tableCloths.TotalPages);
            
            return Ok(tableClothsToList);
        }
        

        [HttpPost]
        public async Task<IActionResult> AddTableCloth([FromForm]TableClothForCreationDTO tableClothForCreation)
        {
            var file = tableClothForCreation.File;
            var uploadResult = new ImageUploadResult();

            if(file.Length> 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                      File = new FileDescription(file.Name, stream),
                      Transformation = new Transformation().Width(1920).Height(1080).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            
            tableClothForCreation.PhotoUrl = uploadResult.Uri.ToString();
            tableClothForCreation.public_id = uploadResult.PublicId;

            var tableCloth = _mapper.Map<TableCloth>(tableClothForCreation);

            _repository.Add(tableCloth);

            if(await _repository.SaveAll())
            { 
               var tableClothToReturn = _mapper.Map<TableClothToDetailDTO>(tableCloth);
               return CreatedAtRoute("GetTableCloth", new { id = tableCloth.Id}, tableClothToReturn);
            }

            throw new Exception("Utworzenie nie powiodło się");
        }


        [HttpGet("{id}", Name = "GetTableCloth")]
        public async Task<IActionResult> GetTableCloth(int id)
        {
           var tableCloth = await _repository.GetTableCloth(id);

           if(tableCloth == null)
              return BadRequest("Nie znaleziono");

           var tableClothToDetail = _mapper.Map<TableClothToDetailDTO>(tableCloth);

           return Ok(tableClothToDetail);
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTableCloth(int id, TableClothToEditDTO tableClothToEdit )
        {
           var tableCloth = await _repository.GetTableCloth(id);
           _mapper.Map(tableClothToEdit, tableCloth);

           if(await _repository.SaveAll())
              return Ok("Pomyślnie zaktualizowano");

           throw new Exception($"Aktualizacja Firany o id: {id} nie powiodła się ");   
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTableCloth(int id)
        {
            var tableCloth = await _repository.GetTableCloth(id);
            
            if(tableCloth.public_id != null)
            {
                var deleteParams = new DeletionParams(tableCloth.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if(result.Result == "ok")
                  _repository.Delete(tableCloth);
            }

            if(tableCloth.public_id == null)
                _repository.Delete(tableCloth);

            if(await _repository.SaveAll())
               return Ok();

            throw new Exception("Usunięcie nie powiodło się");   
        }
    }
}