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
    public class PhotosController: ControllerBase
    {
        private readonly ICurtainRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings2> _cloudinaryConfig;
        private Cloudinary _cloudinary; 

       
        public PhotosController(ICurtainRepository Repository, IMapper mapper, IOptions<CloudinarySettings2> cloudinaryConfig)
        {
             _repository = Repository;
             _mapper = mapper;
             _cloudinaryConfig = cloudinaryConfig;

             Account account = new Account(
               _cloudinaryConfig.Value.CloudName2,
               _cloudinaryConfig.Value.ApiKey2,
               _cloudinaryConfig.Value.ApiSecret2
             );

             _cloudinary = new Cloudinary(account);
        }

        #region Curtains

        [HttpGet("curtains/{curtainId}")]
        public async Task<IActionResult> GetAllPhotos(int curtainId)
        {
            var photos = await _repository.GetPhotoMaterials(curtainId);
            var result = _mapper.Map<IEnumerable<PhotoToReturnDTO>>(photos);
            return Ok(result);
        }



        [HttpPost("curtains/{curtainId}")]
        public async Task<IActionResult> AddCurtainPhoto(int curtainId, [FromForm]PhotoForCreationDTO photoForCreation)
        {
            var curtain = await _repository.GetCurtain(curtainId);
            
            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();
            
            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                     var uploadParams = new ImageUploadParams()
                     {
                      File = new FileDescription(file.Name, stream),
                      Transformation = new Transformation().Width(300).Height(300).Crop("fill").Gravity("face")
                     };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            
            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.public_id = uploadResult.PublicId;

            
            var photo = _mapper.Map<PhotoMaterial>(photoForCreation);


            curtain.PhotoMaterial.Add(photo);

            if(await _repository.SaveAll())
            {
               var photoToReturn = _mapper.Map<PhotoToReturnDTO>(photo);
               return Ok(photoToReturn);
            }

            throw new Exception("Dodanie zdjęcia nie powiodło się");
        }

        #endregion
  
        #region TableCloths
        #endregion

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var photo = await _repository.GetPhotoMaterial(id);

            if(photo.public_id != null)
            {
                var deleteParams = new DeletionParams(photo.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if(result.Result == "ok")
                  _repository.Delete(photo);
            }

            if(photo.public_id == null)
              _repository.Delete(photo);
           
            if(await _repository.SaveAll())
              return Ok();

            return BadRequest("Nie udało się usunąć zdjęcia");
        }
        



        

        
        




    }
}