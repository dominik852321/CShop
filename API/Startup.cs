using System.Linq;
using System.Text;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Core.Interface;
using Infrastructure.Data;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(z => z.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.Configure<CloudinarySettings2>(Configuration.GetSection("CloudinarySettings2"));
            
            services.AddAutoMapper(typeof(MappingProfiles));
         
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions
                .Parse(Configuration.GetConnectionString("Redis"),true);
                return ConnectionMultiplexer.Connect(configuration);
            });
           
            services.AddApplicationServices();
            services.AddSwaggerDocumentation();

            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");
            

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwaggerDocumentation();
             
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
