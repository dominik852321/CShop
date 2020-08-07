using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CurtainShop.API.Dtos;
using CurtainShop.API.Helpers;
using CurtainShop.API.Interface;
using CurtainShop.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CurtainShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController: ControllerBase
    {
        private readonly ICurtainRepository _repositoryCurtain;
        private readonly ITableClothRepository _repositoryTableCloths;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings2> _cloudinaryConfig;
        private Cloudinary _cloudinary; 

       
        public PhotosController(ICurtainRepository curtainRepository, ITableClothRepository tableClothRepository, IMapper mapper, IOptions<CloudinarySettings2> cloudinaryConfig)
        {
             _repositoryCurtain = curtainRepository;
             _repositoryTableCloths = tableClothRepository;
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
        public async Task<IActionResult> GetCurtainPhotos(int curtainId)
        {
            var photos = await _repositoryCurtain.GetCurtainPhotos(curtainId);
            var result = _mapper.Map<IEnumerable<PhotoToReturnDTO>>(photos);
            return Ok(result);
        }



        [HttpPost("curtains/{curtainId}")]
        public async Task<IActionResult> AddCurtainPhoto(int curtainId, [FromForm]PhotoForCreationDTO photoForCreation)
        {
            var curtain = await _repositoryCurtain.GetCurtain(curtainId);
            
            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();
            
            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                     var uploadParams = new ImageUploadParams()
                     {
                      File = new FileDescription(file.Name, stream),
                      Transformation = new Transformation().Width(1280).Height(720).Crop("fill").Gravity("face")
                     };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            
            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.public_id = uploadResult.PublicId;

            
            var photo = _mapper.Map<PhotoMaterial>(photoForCreation);


            curtain.PhotoMaterial.Add(photo);

            if(await _repositoryCurtain.SaveAll())
            {
               var photoToReturn = _mapper.Map<PhotoToReturnDTO>(photo);
               return Ok(photoToReturn);
            }

            throw new Exception("Dodanie zdjęcia nie powiodło się");
        }

        #endregion
  
        #region TableCloths

        [HttpGet("tablecloths/{tableclothId}")]
        public async Task<IActionResult> GetTableClothPhotos(int tableclothId)
        {
            var photos = await _repositoryTableCloths.GetTableClothPhotos(tableclothId);
            var result = _mapper.Map<IEnumerable<PhotoToReturnDTO>>(photos);
            return Ok(result);
        }



        [HttpPost("tablecloths/{tableclothId}")]
        public async Task<IActionResult> AddTableClothPhoto(int tableclothId, [FromForm]PhotoForCreationDTO photoForCreation)
        {
            var tablecloth = await _repositoryTableCloths.GetTableCloth(tableclothId);
            
            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();
            
            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                     var uploadParams = new ImageUploadParams()
                     {
                      File = new FileDescription(file.Name, stream),
                      Transformation = new Transformation().Width(1280).Height(720).Crop("fill").Gravity("face")
                     };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            
            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.public_id = uploadResult.PublicId;

            
            var photo = _mapper.Map<PhotoMaterial>(photoForCreation);


            tablecloth.PhotoMaterial.Add(photo);

            if(await _repositoryTableCloths.SaveAll())
            {
               var photoToReturn = _mapper.Map<PhotoToReturnDTO>(photo);
               return Ok(photoToReturn);
            }

            throw new Exception("Dodanie zdjęcia nie powiodło się");
        }


        #endregion

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var photo = await _repositoryCurtain.GetCurtainPhoto(id);

            if(photo.public_id != null)
            {
                var deleteParams = new DeletionParams(photo.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if(result.Result == "ok")
                  _repositoryCurtain.Delete(photo);
            }

            if(photo.public_id == null)
                _repositoryCurtain.Delete(photo);
           
            if(await _repositoryCurtain.SaveAll())
              return Ok();

            return BadRequest("Nie udało się usunąć zdjęcia");
        }
        



        

        
        




    }
}