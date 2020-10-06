using System;
using Dashboard_Ejecutivo.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Dashboard_Ejecutivo.Data
{
    public partial class dashboardejecutivo_devContext : DbContext
    {
        public dashboardejecutivo_devContext()
        {
        }

        public dashboardejecutivo_devContext(DbContextOptions<dashboardejecutivo_devContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Actividades> Actividades { get; set; }
        public virtual DbSet<AreasAfectadas> AreasAfectadas { get; set; }
        public virtual DbSet<Documentos> Documentos { get; set; }
        public virtual DbSet<EquipoPorProyecto> EquipoPorProyecto { get; set; }
        public virtual DbSet<Etapas> Etapas { get; set; }
        public virtual DbSet<Issues> Issues { get; set; }
        public virtual DbSet<Objetivos> Objetivos { get; set; }
        public virtual DbSet<PerfilesUsuarios> PerfilesUsuarios { get; set; }
        public virtual DbSet<Proveedores> Proveedores { get; set; }
        public virtual DbSet<ProyectoAreasAfetadas> ProyectoAreasAfetadas { get; set; }
        public virtual DbSet<ProyectoEtapaDocumento> ProyectoEtapaDocumento { get; set; }
        public virtual DbSet<ProyectoEtapas> ProyectoEtapas { get; set; }
        public virtual DbSet<ProyectoProveedor> ProyectoProveedor { get; set; }
        public virtual DbSet<ProyectoRoles> ProyectoRoles { get; set; }
        public virtual DbSet<Proyectos> Proyectos { get; set; }
        public virtual DbSet<Riesgos> Riesgos { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<RolesEquipo> RolesEquipos { get; set; }
        public virtual DbSet<SemaforoPresupFecha> SemaforoPresupFecha { get; set; }
        public virtual DbSet<SemaforoPresupFinanciero> SemaforoPresupFinanciero { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=tcp:sancristobal2.database.windows.net,1433;Initial Catalog=dashboardejecutivo_dev;Persist Security Info=False;User ID=dashboardejecutivo;Password=D4sh04rd3j3cut1v0;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Actividades>(entity =>
            {
                entity.HasKey(e => e.IdActividad);

                entity.Property(e => e.IdActividad).HasColumnName("ID_Actividad");

                entity.Property(e => e.Descripcion).HasMaxLength(100);

                entity.Property(e => e.Estado).HasMaxLength(100);

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.Responsable).HasMaxLength(100);

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.Actividades)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<AreasAfectadas>(entity =>
            {
                entity.HasKey(e => e.IdAreasAfectadas);

                entity.ToTable("Areas_Afectadas");

                entity.Property(e => e.IdAreasAfectadas).HasColumnName("ID_Areas_Afectadas");
            });

            modelBuilder.Entity<Documentos>(entity =>
            {
                entity.HasKey(e => e.IdDocumento);

                entity.Property(e => e.IdDocumento).HasColumnName("ID_Documento");

                entity.Property(e => e.IdEtapa).HasColumnName("ID_Etapa");

                entity.Property(e => e.Nombre).HasMaxLength(100);

                entity.HasOne(d => d.IdEtapaNavigation)
                    .WithMany(p => p.Documentos)
                    .HasForeignKey(d => d.IdEtapa)
                    .OnDelete(DeleteBehavior.Cascade);
            });


            modelBuilder.Entity<EquipoPorProyecto>(entity =>
            {
              entity.HasKey(e => e.IdEquipoPorProyecto);

              entity.Property(e => e.IdEquipoPorProyecto).HasColumnName("ID_EquipoPorProyecto");

              entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

              entity.Property(e => e.Nombre)
                  .IsRequired()
                  .HasMaxLength(100)
                  .IsUnicode(false);

              entity.Property(e => e.Rol)
                  .HasMaxLength(50)
                  .IsUnicode(false);

              entity.HasOne(d => d.IdProyectoNavigation)
                  .WithMany(p => p.EquipoPorProyecto)
                  .HasForeignKey(d => d.IdProyecto);

              entity.HasOne(d => d.IdRolNavigation)
                  .WithMany(p => p.EquipoPorProyecto)
                  .HasForeignKey(d => d.IdRol)
                  .OnDelete(DeleteBehavior.Cascade);
            });




      modelBuilder.Entity<Etapas>(entity =>
            {
                entity.HasKey(e => e.IdEtapa);

                entity.Property(e => e.IdEtapa).HasColumnName("ID_Etapa");

                entity.Property(e => e.Nombre).HasMaxLength(100);
            });

            modelBuilder.Entity<Issues>(entity =>
            {
                entity.HasKey(e => e.IdIssue);

                entity.Property(e => e.IdIssue).HasColumnName("ID_Issue");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.Issues)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Objetivos>(entity =>
            {
                entity.HasKey(e => e.IdObjetivo);

                entity.Property(e => e.IdObjetivo).HasColumnName("ID_Objetivo");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.Objetivos)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<PerfilesUsuarios>(entity =>
            {
                entity.HasKey(e => e.IdPerfilUsuario);

                entity.ToTable("Perfiles_Usuarios");

                entity.Property(e => e.IdPerfilUsuario).HasColumnName("ID_Perfil_Usuario");
            });

            modelBuilder.Entity<Proveedores>(entity =>
            {
                entity.HasKey(e => e.IdProveedor);

                entity.Property(e => e.IdProveedor).HasColumnName("ID_Proveedor");

                entity.Property(e => e.Nombre).HasMaxLength(100);
            });

            modelBuilder.Entity<ProyectoAreasAfetadas>(entity =>
            {
                entity.HasKey(e => new { e.IdProyecto, e.IdArea });

                entity.ToTable("Proyecto_Areas_Afetadas");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.IdArea).HasColumnName("ID_Area");

                entity.HasOne(d => d.IdAreaNavigation)
                    .WithMany(p => p.ProyectoAreasAfetadas)
                    .HasForeignKey(d => d.IdArea)
                    .HasConstraintName("FK_Proyecto_Areas_Afectadas_ID_Area_Afectada");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.ProyectoAreasAfetadas)
                    .HasForeignKey(d => d.IdProyecto);
            });

            modelBuilder.Entity<ProyectoEtapaDocumento>(entity =>
            {
                entity.HasKey(e => new { e.IdProyecto, e.IdEtapa, e.IdDocumento });

                entity.ToTable("Proyecto_Etapa_Documento");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.IdEtapa).HasColumnName("ID_Etapa");

                entity.Property(e => e.IdDocumento).HasColumnName("ID_Documento");

                entity.HasOne(d => d.IdDocumentoNavigation)
                    .WithMany(p => p.ProyectoEtapaDocumento)
                    .HasForeignKey(d => d.IdDocumento);

                entity.HasOne(d => d.Id)
                    .WithMany(p => p.ProyectoEtapaDocumento)
                    .HasForeignKey(d => new { d.IdProyecto, d.IdEtapa })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Proyecto_Etapa_Documento_Proyecto_Etapas_ID_Etapa_ID_Proyecto");
            });

            modelBuilder.Entity<ProyectoEtapas>(entity =>
            {
                entity.HasKey(e => new { e.IdProyecto, e.IdEtapa });

                entity.ToTable("Proyecto_Etapas");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.IdEtapa).HasColumnName("ID_Etapa");

                entity.Property(e => e.FechaFin)
                    .HasColumnName("Fecha_Fin")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaInicio)
                    .HasColumnName("Fecha_Inicio")
                    .HasColumnType("datetime");

                entity.Property(e => e.PorcentajeDeAvance)
                    .HasColumnName("Porcentaje_De_Avance")
                    .HasColumnType("decimal(10, 2)");

              entity.Property(e => e.Observaciones)
                    .HasColumnName("Observaciones")
                    .HasMaxLength(2500);

              entity.Property(e => e.Vigente)
                    .HasColumnName("Vigente");

              entity.HasOne(d => d.IdEtapaNavigation)
                    .WithMany(p => p.ProyectoEtapas)
                    .HasForeignKey(d => d.IdEtapa)
                    .HasConstraintName("FK_Proyecto_Etapas_Etapas_ID_Etapas");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.ProyectoEtapas)
                    .HasForeignKey(d => d.IdProyecto);
            });

            modelBuilder.Entity<ProyectoProveedor>(entity =>
            {
                entity.HasKey(e => new { e.IdProyecto, e.IdProveedor });

                entity.ToTable("Proyecto_Proveedor");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.IdProveedor).HasColumnName("ID_Proveedor");

                entity.HasOne(d => d.IdProveedorNavigation)
                    .WithMany(p => p.ProyectoProveedor)
                    .HasForeignKey(d => d.IdProveedor);

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.ProyectoProveedor)
                    .HasForeignKey(d => d.IdProyecto);
            });

            modelBuilder.Entity<ProyectoRoles>(entity =>
            {
                entity.HasKey(e => e.IdProyectoRol);

                entity.ToTable("Proyecto_Roles");

                entity.Property(e => e.IdProyectoRol).HasColumnName("ID_Proyecto_Rol");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.IdRol).HasColumnName("ID_Rol");

                entity.Property(e => e.Nominado).HasMaxLength(100);

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.ProyectoRoles)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Proyecto_Roles_Proyecto_ID_Proyecto");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.ProyectoRoles)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Proyectos>(entity =>
            {
                entity.HasKey(e => e.IdProyecto);

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.Property(e => e.EstadoDashboard)
                    .HasColumnName("Estado_Dashboard")
                    .HasMaxLength(100);

                entity.Property(e => e.EstadoProyecto)
                    .HasColumnName("Estado_Proyecto")
                    .HasMaxLength(100);

                entity.Property(e => e.FechaDraf)
                    .HasColumnName("Fecha_Draf")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaPublicacion)
                    .HasColumnName("Fecha_Publicacion")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaUltimaModificacion)
                    .HasColumnName("Fecha_Ultima_Modificacion")
                    .HasColumnType("datetime");

                entity.Property(e => e.FtesAsignados).HasColumnName("FTEs_Asignados");

                entity.Property(e => e.FtesEstimadoPm).HasColumnName("FTEs_Estimado_PM");

                entity.Property(e => e.FtesRealPm).HasColumnName("FTEs_Real_PM");

                entity.Property(e => e.GuidProyecto)
                    .HasColumnName("Guid_Proyecto")
                    .HasMaxLength(100);

                entity.Property(e => e.IdSemFecha).HasColumnName("ID_Sem_Fecha");

                entity.Property(e => e.IdSemFinan).HasColumnName("ID_Sem_Finan");

                entity.Property(e => e.Irr).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Npv).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Payback).HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Pm)
                    .HasColumnName("PM")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PrespuestoFechaEjecutado)
                    .HasColumnName("Prespuesto_Fecha_Ejecutado")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.PresupuestoFechaPlanificado)
                    .HasColumnName("Presupuesto_Fecha_Planificado")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.PresupuestoFinancEjecutado)
                    .HasColumnName("Presupuesto_Financ_Ejecutado")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.PresupuestoFinancPlanificado)
                    .HasColumnName("Presupuesto_Financ_Planificado")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.PresupuestoTotal)
                    .HasColumnName("Presupuesto_Total")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.SaludColor)
                    .HasColumnName("Salud_Color")
                    .HasMaxLength(100);

                entity.Property(e => e.SaludDescripcion)
                    .HasColumnName("Salud_Descripcion")
                    .HasMaxLength(100);

                entity.Property(e => e.Sponsor)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TamanoProyecto)
                    .HasColumnName("Tamano_Proyecto")
                    .HasMaxLength(100);

                entity.Property(e => e.UnidadArt).HasColumnName("Unidad_ART");

                entity.Property(e => e.UnidadAsoServ).HasColumnName("Unidad_Aso_Serv");

                entity.Property(e => e.UnidadCajaMutual).HasColumnName("Unidad_Caja_Mutual");

                entity.Property(e => e.UnidadRetiro).HasColumnName("Unidad_Retiro");

                entity.Property(e => e.UnidadSegArg).HasColumnName("Unidad_Seg_Arg");

                entity.Property(e => e.UnidadSegUru).HasColumnName("Unidad_Seg_Uru");

                entity.Property(e => e.UnidadServFinanciero).HasColumnName("Unidad_Serv_Financiero");

                entity.Property(e => e.UnidadTurismo).HasColumnName("Unidad_Turismo");

                entity.Property(e => e.SeInformaTablero).HasColumnName("SeInformaEnTablero");

                entity.Property(e => e.HealthCheck).HasColumnName("Healt_Check");

                entity.Property(e => e.LinkPresupuestoFinanciero).HasColumnName("Link_Presupuesto_Financiero");

                entity.Property(e => e.LinkPresupuestoFecha).HasColumnName("Link_Presupuesto_Fecha");

              entity.HasOne(d => d.IdSemFechaNavigation)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.IdSemFecha)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(d => d.IdSemFinanNavigation)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.IdSemFinan)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Riesgos>(entity =>
            {
                entity.HasKey(e => e.IdRiesgo);

                entity.Property(e => e.IdRiesgo).HasColumnName("ID_Riesgo");

                entity.Property(e => e.IdProyecto).HasColumnName("ID_Proyecto");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.Riesgos)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.IdRol);

                entity.Property(e => e.Descripcion).HasColumnName("Descripcion");

                entity.Property(e => e.DetalleRol).HasColumnName("Detalle_Rol");

              entity.Property(e => e.IdRol).HasColumnName("ID_Rol");
            });

            modelBuilder.Entity<RolesEquipo>(entity =>
            {
              entity.HasKey(e => e.IdRol);

              entity.ToTable("Roles_Equipo");

              entity.Property(e => e.Descripcion)
                  .IsRequired()
                  .HasMaxLength(200)
                  .IsUnicode(false);
            });

            modelBuilder.Entity<SemaforoPresupFecha>(entity =>
            {
                entity.HasKey(e => e.IdSemFecha);

                entity.ToTable("Semaforo_Presup_Fecha");

                entity.Property(e => e.IdSemFecha).HasColumnName("ID_Sem_Fecha");

                entity.Property(e => e.Color).HasMaxLength(100);
            });

            modelBuilder.Entity<SemaforoPresupFinanciero>(entity =>
            {
                entity.HasKey(e => e.IdSemFinan);

                entity.ToTable("Semaforo_Presup_Financiero");

                entity.Property(e => e.IdSemFinan).HasColumnName("ID_Sem_Finan");

                entity.Property(e => e.Color).HasMaxLength(100);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.CodUsuario);

                entity.Property(e => e.CodUsuario)
                    .HasColumnName("Cod_Usuario")
                    .HasMaxLength(200)
                    .ValueGeneratedNever();

                entity.Property(e => e.IdPerfilUsuario).HasColumnName("ID_Perfil_Usuario");

                entity.HasOne(d => d.IdPerfilUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdPerfilUsuario)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
