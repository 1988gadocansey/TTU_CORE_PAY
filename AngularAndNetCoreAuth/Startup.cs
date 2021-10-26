using AngularAndNetCoreAuth.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Cors;
using System;
using System.Text;
using AngularAndNetCoreAuth.Services;
using Microsoft.OpenApi.Models;


namespace AngularAndNetCoreAuth
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
            //services.AddControllersWithViews();
            services.AddControllers().AddNewtonsoftJson();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddScoped<IMomo, MomoService>();
            
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection")));


            ///Enable CORS. Search for the AspNetCore Cors package and add it if you have any issues.
            /*services.AddCors(option =>
            {
                option.AddPolicy("EnableCors", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().Build();
                });

            });*/
            services.AddCors(c =>
            {
                c.AddPolicy("AllowMyOrigin", options => options.WithOrigins(Configuration.GetSection("AllowedOrigins").Get<string[]>()));
            });

            ///Add Microsoft.AspNetCore.Authentication.JwtBearer package to be able to use JwtBearer.
            services.AddAuthentication(options =>
            {

                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = "TTU",
                    ValidAudience = "TTU",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey"))
                };
            });
            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "TTU Payment API",
                Description = "The stress-free way to pay your fees",
                Version = "v1"
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
          

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseFileServer();
            app.UseSpaStaticFiles();
            app.UseAuthentication();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
            ///Add this if not you'll get a CORS error
            app.UseRouting();

            ///Don't forget CORS!!
            app.UseCors("EnableCors");

            ///Added this because of CORS too. .Net Core 3.1 is wilding.
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                ///Configure the timeout to 5 minutes to avoid "The Angular CLI process did not start listening for requests within the timeout period of 50 seconds." issue
                spa.Options.StartupTimeout = new TimeSpan(0, 5, 0);

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
            app.UseSwagger();
            app.UseSwaggerUI(opt => opt.SwaggerEndpoint("/swagger/v1/swagger.json", "TTU Payment API"));

        }
    }
}
