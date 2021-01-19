using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;
using Core.Interface;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace API.Controllers
{   
    [Authorize(Roles = "Admin")]
    public class AdminController:  BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOrderService _orderService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AdminController(IUnitOfWork unitOfWork, IGenericRepository<Product> productRepo, IOrderService orderService, UserManager<AppUser> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _productRepo = productRepo;
            _orderService = orderService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("orders")]
        public async Task<ActionResult<IReadOnlyList<OrderToListDto>>> GetOrders()
        {
            var orders = await _orderService.GetOrders();

            var orderToList = _mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToListDto>>(orders);
            
            return Ok(orderToList);
        }

        [HttpGet("orders/{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("products")]
        public async Task<ActionResult<Pagination<ProductToListDto>>> GetProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndRoomsSpecification(productParams);
            
            var products = await _productRepo.ListAsync(spec);

            var totalItems = await _productRepo.CountAsync();

            var productToList = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToListDto>>(products);

            return Ok(new Pagination<ProductToListDto>(productParams.PageIndex, productParams.PageSize, totalItems, productToList ));
        }

        [HttpGet("products/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndRoomsSpecification(id);

            var product = await _productRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));
        

            return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
        }


        [HttpPost("add")]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]ProductDto productDto)
        {
            var fileName = "";
            if(productDto.PhotoFile != null && productDto.PhotoFile.Length > 0)
            {
                using (var image = Image.Load(productDto.PhotoFile.OpenReadStream()))
                {
                    image.Mutate(x => x.Resize(1280, 768));
                    
                    var pathToDB = "images/productphotos/" + productDto.PhotoFile.FileName; 

                    var path = Path.Combine(Directory.GetCurrentDirectory() + "/Content/" + pathToDB);

                    fileName = pathToDB;
                    image.Save(path);
                }
            }

            var product = new Product()
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Description = productDto.Description,
                ProductTypeId = productDto.ProductTypeId,
                ProductRoomId = productDto.ProductRoomId,
                DateAdded = DateTime.Now,
                Height = productDto.Height,
                Width = productDto.Width,
                Color1 = productDto.Color1,
                Color2 = productDto.Color2,
                Material1 = productDto.Material1,
                Material2 = productDto.Material2,
                PictureUrl = fileName
            };
            
            _unitOfWork.Repository<Product>().Add(product);

            var result = await _unitOfWork.Complete();

            if(result <= 0) return null;

            return product;
        }

        [HttpPost("product/{id}/photo")]
        public async Task<ActionResult<ProductPhotos>> AddPhotoToProduct(int id, [FromForm]IFormFile PhotoFile)
        {
            var fileName = "";
            if(PhotoFile != null && PhotoFile.Length > 0)
            {
                using (var image = Image.Load(PhotoFile.OpenReadStream()))
                {
                    image.Mutate(x => x.Resize(1280, 768));
                    
                    var pathToDB = "images/productphotos/" + PhotoFile.FileName; 

                    var path = Path.Combine(Directory.GetCurrentDirectory() + "/Content/" + pathToDB);

                    fileName = pathToDB;
                    image.Save(path);
                }
            }

            ProductPhotos productPhotos = new ProductPhotos()
            {
                PictureUrl = fileName,
                productId = id
            };

           _unitOfWork.Repository<ProductPhotos>().Add(productPhotos);

            var result = await _unitOfWork.Complete();

            if(result <= 0) return null;

            return Ok(productPhotos);
        }

        [HttpPost("edit/{id}")]
        public async Task<ActionResult<Product>> EditProduct(int id, ProductToEditDto productToEdit)
        {   
            var product = await _productRepo.GetByIdAsync(id);

            product.Name = productToEdit.Name;
            product.Price = productToEdit.Price;
            product.Description = productToEdit.Description;
            product.ProductRoomId = productToEdit.ProductRoomId;
            product.ProductTypeId = productToEdit.ProductTypeId;
            product.Height = productToEdit.Height;
            product.Width = productToEdit.Width;
            product.Color1 = productToEdit.Color1;
            product.Color2 = productToEdit.Color2;
            product.Material1 = productToEdit.Material1;
            product.Material2 = productToEdit.Material2;

            _unitOfWork.Repository<Product>().Update(product);
            
            var result = await _unitOfWork.Complete();

            if(result <= 0) return null;

            return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
        }

        [HttpDelete("remove/{id}")]
        public async Task<ActionResult> RemoveProduct(int id)
        {
            var spec = new ProductsWithTypesAndRoomsSpecification(id);
            
            var product = await _productRepo.GetEntityWithSpec(spec);
            
            if(product.Photos.Count > 0)
            {
                foreach (var photo in product.Photos)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory() + "/Content/" + photo.PictureUrl);
                    
                    System.IO.File.Delete(path);
                    _unitOfWork.Repository<ProductPhotos>().Delete(photo);
                }
            }

            if(product.PictureUrl.Length > 0)
            {
                 var path = Path.Combine(Directory.GetCurrentDirectory() + "/Content/" + product.PictureUrl);
                 
                 System.IO.File.Delete(path);
            }
            _unitOfWork.Repository<Product>().Delete(product);

            var result = await _unitOfWork.Complete();

            if(result <= 0) return null;
         
            return Ok();
        }
    }
}