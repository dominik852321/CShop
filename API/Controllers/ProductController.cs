using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interface;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class ProductController: BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IMapper _mapper;

        public ProductController(
        IGenericRepository<Product> productRepo,
        IMapper mapper)
        {
            _productRepo = productRepo;
            _mapper = mapper;
        }


        [Cached(400)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToListDto>>> GetProducts(
            [FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndRoomsSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var totalItems = await _productRepo.CountAsync(countSpec);
            
            var products = await _productRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToListDto>>(products);

            return Ok(new Pagination<ProductToListDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [Cached(400)]
        [HttpGet("3products")]
        public async Task<ActionResult<IReadOnlyList<ProductToListDto>>> Get3Products()
        {
            var spec = new ProductsWithTypesAndRoomsSpecification();

            var products = await _productRepo.Get3Items(spec);

            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToListDto>>(products));
        }


        [Cached(400)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndRoomsSpecification(id);

            var product = await _productRepo.GetEntityWithSpec(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
        }

      
        
    }


       
}