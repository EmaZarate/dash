namespace Dashboard_Ejecutivo.DataDTO
{
  public class ProjectLightDTO
  {
    public int? IdSemFecha { get; set; }
    public int IdProyecto { get; set; }
    public string SemFechaColor { get; set; }
    public int? MinSemFecha { get; set; }
    public int? MaxSemFecha { get; set; }
    public int? IdSemFinan { get; set; }
    public string SemFinColor { get; set; }
    public int? MinSemFinan { get; set; }
    public int? MaxSemFinan { get; set; }
  }
}
