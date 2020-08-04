using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CurtainShop.API.Data;
using CurtainShop.API.Dtos;
using CurtainShop.API.Helpers;
using CurtainShop.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CurtainShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurtainsController: ControllerBase
    {
        private readonly ICurtainRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public CurtainsController(ICurtainRepository Repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
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

        
        public async Task<IActionResult> GetAll([FromQuery]CurtainParams curtainParams)
        {
            var curtains = await _repository.GetCurtains(curtainParams);

            var curtainToList = _mapper.Map<IEnumerable<CurtainToListDTO>>(curtains);

            Response.AddPagination(curtains.CurrentPage, curtains.PageSize, curtains.TotalCount, curtains.TotalPages);
            
            return Ok(curtainToList);
        }
        

        [HttpPost]
        public async Task<IActionResult> AddCurtain([FromForm]CurtainForCreationDTO curtainForCreation)
        {
            var file = curtainForCreation.File;
            var uploadResult = new ImageUploadResult();

            if(file.Length> 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                      File = new FileDescription(file.Name, stream),
                      Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            
            curtainForCreation.PhotoUrl = uploadResult.Uri.ToString();
            curtainForCreation.public_id = uploadResult.PublicId;

            var curtain = _mapper.Map<Curtain>(curtainForCreation);

            _repository.Add(curtain);

            if(await _repository.SaveAll())
            { 
               var curtainToReturn = _mapper.Map<CurtainToDetailDTO>(curtain);
               return CreatedAtRoute("GetCurtain", new { id = curtain.Id}, curtainToReturn);
            }

            throw new Exception("Utworzenie nie powiodło się");
        }


        [HttpGet("{id}", Name = "GetCurtain")]
        public async Task<IActionResult> GetCurtain(int id)
        {
           var curtain = await _repository.GetCurtain(id);

           if(curtain==null)
              return BadRequest("Nie znaleziono");

           var curtainToDetail = _mapper.Map<CurtainToDetailDTO>(curtain);   

           return Ok(curtainToDetail);
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCurtain(int id, CurtainToEditDTO curtainToEdit )
        {
           var curtain = await _repository.GetCurtain(id);
           _mapper.Map(curtainToEdit, curtain);

           if(await _repository.SaveAll())
              return Ok("Pomyślnie zaktualizowano");

           throw new Exception($"Aktualizacja Firany o id: {id} nie powiodła się ");   
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurtain(int id)
        {
            var curtain = await _repository.GetCurtain(id);
            
            if(curtain.public_id != null)
            {
                var deleteParams = new DeletionParams(curtain.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if(result.Result == "ok")
                  _repository.Delete(curtain);
            }

            if(curtain.public_id == null)
                _repository.Delete(curtain);

            if(await _repository.SaveAll())
               return Ok();

            throw new Exception("Usunięcie nie powiodło się");   
        }



    }
}