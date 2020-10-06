using System;

using System.IO;
using System.Linq;
using System.Text;

using AutoMapper;
using Dashboard_Ejecutivo.Auth;
using Dashboard_Ejecutivo.Data;
using Dashboard_Ejecutivo.Data.Models;
using Dashboard_Ejecutivo.Helpers;
using Dashboard_Ejecutivo.Models;
using Dashboard_Ejecutivo.Services.Implementations;
using Dashboard_Ejecutivo.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SharepointPWA;
using static Dashboard_Ejecutivo.Models.MicrosoftGraphAuthSetting;

namespace Dashboard_Ejecutivo
{
  public class Startup
  {
    private readonly IConfiguration _config;
    private readonly IHostingEnvironment _env;
    public const string ObjectIdentifierType = "http://schemas.microsoft.com/identity/claims/objectidentifier";
    public const string TenantIdType = "http://schemas.microsoft.com/identity/claims/tenantid";

    private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH";
    private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

    public Startup(IConfiguration configuration, IHostingEnvironment env)
    {
      _config = configuration;
      _env = env;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddCors();
      services.AddSingleton<IJwtFactory, JwtFactory>();
      services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();

      services.Configure<MicrosoftGraphAuthSettings>(_config.GetSection(nameof(MicrosoftGraphAuthSettings)));

      var jwtAppSettingOptions = _config.GetSection(nameof(JwtIssuerOptions));

      services.Configure<JwtIssuerOptions>(options =>
      {
        options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
        options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
        options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
      });

      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

        ValidateAudience = true,
        ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = _signingKey,

        RequireExpirationTime = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
      };

      services.AddTransient<ILoginService, LoginService>();
      services.AddTransient<IHomeService, HomeService>();
      services.AddTransient<IServicesPWA, ServicesPWA>();
      services.AddTransient<IProjectService, ProjectService>();
      services.AddTransient<IProviderService, ProviderService>();
      services.AddTransient<IDocumentService, DocumentService>();
      services.AddTransient<IRolService, RolService>();
      services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();

      services.AddAuthentication(sharedOptions =>
      {
        sharedOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

        sharedOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(configureOptions =>
      {
        configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
        configureOptions.TokenValidationParameters = tokenValidationParameters;
        configureOptions.SaveToken = true;
      });

      services.AddAuthorization(opt =>
      {
        opt.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
      });

      services.AddSession();



      services.AddDbContext<dashboardejecutivo_devContext>(cfg =>
      {
        cfg.UseSqlServer(_config.GetConnectionString("ProjectContextString"));
      });

      services.ConfigureApplicationCookie(options =>
      {
        options.LoginPath = "/Login";

      });

      services.AddAutoMapper(typeof(Startup));
      services.AddMvc(opt =>
      {
        if (_env.IsProduction())
        {

          opt.Filters.Add(new RequireHttpsAttribute());
        }
      }).AddJsonOptions(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore)
        .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "wwwroot";
      });

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app.UseForwardedHeaders(new ForwardedHeadersOptions
      {
        ForwardedHeaders = ForwardedHeaders.XForwardedProto
      });
      app.UseHttpsRedirection();

      app.UseDefaultFiles();
      app.UseStaticFiles(new StaticFileOptions
      {
        FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), @"assets")),
        RequestPath = "/assets"
      });

      app.UseSession();
      app.UseAuthentication();

      app.UseSpaStaticFiles();


      app.UseMvc();

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "src";
      });
    }
  }
}

