import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonDataService } from '../../services/common-data.service';
import { HomeService } from '../../services/home.service'
import { Subject, Observable } from 'rxjs';
import { ProjectService } from "../../services/project.service";
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../services/auth.service";
import { ExcelService } from "../../services/excel.service";
import Swal from 'sweetalert2'

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {


  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public listProject: any[];
  public projectToExport : any[];
  private all = { label: "All", value: null };
  public userRol;
  public currentEnviroment: boolean = false;
  public isFilterON: boolean = false;

  @ViewChild(Table) dt: Table;

  IsDisplayCardView: boolean = false;
  viewType = "List view"
  nombreFilter:string;
  sponsorFilter: string;
  sizeFilter: string;
  presupuestoTotalFilter: string;
  stateFilter: string;
  healthFilter: string;
  npvFilter: string;
  irrFilter: string;
  paybackFilter: string;
  sponsorOptionsFilter = [];
  sizeOptionsFilter = [];
  healthOptionsFilter = [];
  budgetOptionsFilter = [{ label: "All", value: null }, { label: "Mayor igual", value: "Mayor igual" }, { label: "Menor igual", value: "Menor igual" }];
  stateOptionsFilter = [];
  _pmFields = [];
  cols: any[];
  totalProject:number

  minBudget = 0
  maxBudget = 2000000
  budgetTimeout: any;


  public totalRecords = 0;

  public colorState = {
    "RFP/RFI": "#a9d18e",
    "Inception": "#8faadc",
    "Planning": "#ffd966",
    "Execution": "#b83aeaad",
    "PostGoLive": "#f4b183",
    "BAU": "#767171",
    "BenefitsManagement": "#ffc000"
  };


  projectRol = [];


  constructor(
    public _commonDataService: CommonDataService,
    public _homeService: HomeService,
    public _projectService: ProjectService,
    private _router: Router, 
    private toastManager: ToastrService,
    private _authService: AuthService,
    private _excelService: ExcelService
  ) {}

  ngOnInit() {

      
    this.cols = [
      { field: 'nombre', header: 'Name', hidden: false, width: '23%' },
      { field: 'sponsor', header: 'Sponsor', hidden: false, width: '11%'},
      { field: 'size', header: 'Size ', hidden: false, width: '8%'},
      { field: 'presupuestoTotal', header: 'Budget (U$s)', hidden: false, width: '9%'},
      { field: 'state', header: 'State', hidden: false, width: '11%'},
      { field: 'health', header: 'Health', hidden: false, width: '7%'},
      { field: 'npv', header: 'NPV (U$S)', hidden: false, width: '10%'},
      { field: 'irr', header: 'IRR (%)', hidden: false, width: '6%'},
      { field: 'payback', header: 'Payback (Years)', hidden: false, width: '8%' }
    ];

    this._homeService.getRoles()
      .subscribe((res: any) => {
        this.projectRol = res;
      })

    this.getAllProject(1);
    
    this.userRol = this._authService.getUserLogedRol();
  }

  mayorIgual(value:any, filter: any) {


    if (filter === undefined || filter === null || filter === '') {
      return true;
    }

    if (value === undefined || value === null || !value.length) {
      return false;
    }


    if (value.endsWith("%")) {
      if (Number(value.replace(/%/g, '')) >= Number(filter.replace(/%/g, ''))) {
        return true
      }
    }
    else
    {
      if (Number(value.replace(/,/g, '')) >= Number(filter.replace(/,/g, ''))) {
        return true
      }
    }

    return false;

  };

  sinInformacion(value, filter: any) {

    
    if (filter === undefined || filter === null || filter === '') {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }


    if (filter != "Sin información") {
      if (filter == value) {
        return true
      }
    }
    else {

      if ("" == value) {
        return true
      }
    }

    return false;

  };

  getAllProject(enviroment: number) {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);


    setTimeout(() => {

      this._projectService.getAll(enviroment).subscribe((res) => {
        this.projectToExport = res;
        this.setFilters(res);
        this.totalRecords = res.length;
        this.totalProject = res.length;
        this.listProject = this.processData(res);
        this._commonDataService.showLoader(false);
        this.setProjectRol();

      });

    }, 150);


    
  }
  
  onFilter(event) {
    this.totalProject = event.filteredValue.length;
  }
  
  ngAfterViewInit() {

    this.bindingObservable();

    this.dt.filterConstraints["mayorIgual"] = this.mayorIgual;
    this.dt.filterConstraints["sinInformacion"] = this.sinInformacion;

  }

  hideOrShowContainerTagFilter() {
    
    if ($('span[id*=_tagFilter]').length > 0) {
      $("#rowTagFilter").css("display", "none");
      $("#rowTagFilter").css("display","block");
    } else {
      $("#rowTagFilter").css("display", "block");
      $("#rowTagFilter").css("display", "none");      
    }    
  }
  
  onDropDownChange(event, dt) {

    
    let idDropDown = event.originalEvent.currentTarget.closest("p-dropdown").id;

    this.setFilterTag(event.value, true, idDropDown);

    if (idDropDown == "size") {
      
      dt.filter(event.value, idDropDown, 'sinInformacion');
    }
    else if (idDropDown == "state") {

      dt.filter(event.value, idDropDown, 'sinInformacion');
    }
    else if (idDropDown == "sponsor") {

      dt.filter(event.value, idDropDown, 'sinInformacion');
    }
    else {
      dt.filter(event.value, idDropDown, 'equals');
    }
  }

  onChangeBudget(event, dt) {    
    dt.filter(event.target.value, 'presupuestoTotal', 'mayorIgual');
  }

  onChangeNPV(event, dt) {
    dt.filter(event.target.value, 'npv', 'mayorIgual')
  }

  onChangeIRR(event, dt) {
    dt.filter(event.target.value, 'irr', 'mayorIgual');
  }

  onChangePayback(event, dt) {
    dt.filter(event.target.value, 'payback', 'gte');
  }

  setFilterTag(keyBoard, isDropDown,id) {

    let idFilterTag = id || keyBoard.target.id
    
    if (isDropDown) {

      this.removeTagFilter(idFilterTag);
      if (keyBoard) {
        this.createTag(id, keyBoard);
      }      
    }
    else {
      if (keyBoard.target.value) {
        this.removeTagFilter(idFilterTag);
        this.createTag(keyBoard.target.id, keyBoard.target.value);
      }
      else {
        this.removeTagFilter(idFilterTag);
      }
    }

    setTimeout(() => {
      this.hideOrShowContainerTagFilter();
    }, 100); 

  }

  removeTagFilter(id) {
    $("#" + id + "_tagFilter").remove();
    setTimeout(() => {
      this.hideOrShowContainerTagFilter();
    }, 100);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setProjectRol() {
    
    $.map(this.listProject, x => {
      
      if (x.proyectoRoles.length) {
            
        for (var i = 0; i < this.projectRol.length; i++) {

          let count = this.containsRol(x.proyectoRoles, this.projectRol[i].descripcion);
          if (count.length <= 0) {
            x.proyectoRoles.push(this.projectRol[i]);
          }
          else
          {
            x.proyectoRoles.map(x => {
              
              if (x.descripcion == this.projectRol[i].descripcion) {
                x.idRol = this.projectRol[i].idRol;                
              }
            });
          }
        }

      }
      else {
        x.proyectoRoles = this.projectRol;
      }
      
      x.proyectoRoles.sort(this.dynamicallyOrder("idRol"))


    });
  }

  onRowClick(rowData) {

    setTimeout(_ => {
      var popovers = $('[data-toggle^="popover"]')
      
      $.each(popovers, (index, element) => {
        $(element).popover({
          placement: $(element).text().trim() == "Sponsor" ? 'auto' : 'bottom',
          title: $(element).text().trim(),
          html: true,
          trigger: "hover",
          content: this.getDetailRolByRol($(element).text().trim())
        });
      });

    }, 200);
  }

  getDetailRolByRol(descripcionRol) {
    for (var i = 0; i < this.projectRol.length; i++) {
      if (this.projectRol[i].descripcion == descripcionRol) {
        if (this.projectRol[i].detalleRol) {
          return this.projectRol[i].detalleRol;
        }
        return "";
      }
    }
  }

  containsRol(proyectoRoles, rol) {
    let arrayTemp = [];
    $.map(proyectoRoles, (element,index) => {
      if (element.descripcion == rol) {
        arrayTemp.push(element);
      }
    })

    return arrayTemp;
  }

  setFilters(projects) {

    this.sponsorOptionsFilter.push(this.all);
    this.sizeOptionsFilter.push(this.all);
    this.stateOptionsFilter.push(this.all);
    this.healthOptionsFilter.push(this.all);
    

    this.getAllSponsor(projects);
    this.getAllProjectSize(projects);
    this.getAllProjectState(projects);
    this.getAllHealthProject(projects);
    this.getAllPm(projects);

  }

  createTag(id, value) {
    
    let span = document.createElement('span');
    span.className = "badge badge-pill";
    span.style.margin = "5px";
    span.style.backgroundColor = "grey";
    span.style.color = "white";
    span.id = id + "_tagFilter";


    let spanTag = document.createElement('span');
    spanTag.textContent = this.getColumnName(id) + value;
    spanTag.style.padding = "5px";
    spanTag.style.fontSize = "13px";
    spanTag.style.fontWeight = "600";
    $(span).append(spanTag);

    let a = document.createElement('a');
    a.style.cursor = "pointer";

    a.onclick = (event) => {
      let currentTarget = event.currentTarget as HTMLElement;      
      let currentFilter = this.clearFilterByID(currentTarget.parentElement.id.split("_")[0])
      this.dt.filter(null, currentFilter, "equals");
      $(currentTarget).parent().remove();
      this.hideOrShowContainerTagFilter();
    }

    let i = document.createElement('i');
    i.className = "fa fa-lg fa-remove";

    $(a).append(i);
    $(span).append(a);

    $("#contentTagFilter").append(span);

  }
  
  getAllSponsor(project) {

    if (project.length) {

      const map = new Map();
      for (const item of project) {
        
        if (item.sponsor) {

          if (!map.has(item.sponsor.trim())) {
            map.set(item.sponsor, true);
            this.sponsorOptionsFilter.push({
              label: item.sponsor.trim(),
              value: item.sponsor.trim()
            });
          }
        }
        else
        {
          if (!map.has("Sin información")) {
            map.set("Sin información", true);
            this.sponsorOptionsFilter.push({
              label: "Sin información",
              value: "Sin información",
            });
          }
        }
      }
    }
    else {
      this.sponsorOptionsFilter = [];
    }
    
    this.sponsorOptionsFilter.sort(this.dynamicallyOrder("label"))

  }

  getAllPm(project) {

    if (project.length) {

      const map = new Map();
      for (const item of project) {
        
        if (item.pm) {

          if (!map.has(item.pm.trim())) {
            map.set(item.pm, true);
            this._pmFields.push({
              label: item.pm.trim(),
              value: item.pm.trim()
            });
          }
        }
      }
    }
    
  }

  dynamicallyOrder(property) {
    return function (obj1, obj2) {
      return obj1[property] > obj2[property] ? 1
        : obj1[property] < obj2[property] ? -1 : 0;
    }
  }

  deleteProject(id) {
    let self = this;

    Swal({
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      text: '¿Esta seguro que desea eliminar el proyecto?',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then(function (result) {

      if (result.value) {

        self._commonDataService.showLoader(true);
        
        self._projectService.deleteProject(id)
          .subscribe((del) => {
            self.getAllProject(1);
          },
            error => console.log(error));
      }

    });


  }

  getColumnName(id) {

    switch (id.trim()) {
      case "name":
        return "Name: ";
      case "state":        
        return "State: ";
      case "npv":
        return "NPV: ";
      case "irr":
        return "IRR: ";
      case "payback":;
        return "Payback: ";
      case "budget":
        return "Budget(U$S): ";
      case "sponsor":
        return "Sponsor: ";
      case "size":
        return "Size: ";
      case "health":
        return "Health: ";
      default:
        return "None: "
    }
  }
  
  customSort(event: any) {

    event.data.sort((data1, data2) => {
      let value1;
      let value2;

      if (event.field == "size") {
        value1 = data1[event.field];
        value2 = data2[event.field];
        
        value1 = (value1 == "Grande" ? 3 : value1 == "Mediano" ? 2 : value1 == "Chico" ? 1 : -1)
        value2 =  (value2 == "Grande" ? 3 : value2 == "Mediano" ? 2 : value2 == "Chico" ? 1 : -1)
      }
      else if (event.field == "presupuestoTotal" || event.field == "npv") {
        
        value1 = Number(data1[event.field].replace(/\./g, ""));
        value2 = Number(data2[event.field].replace(/\./g, ""));
      }
      else if (event.field == "payback") {        
        value1 = parseFloat(data1[event.field]);
        value2 = parseFloat(data2[event.field]);
      }
      else if (event.field == "health") {
        value1 = data1[event.field];
        value2 = data2[event.field];
        
        value1 = (value1 == "Buena" ? 1 : value1 == "Con problemas" ? 2 : value1 == "Critico" ? 3 : -1)
        value2 = (value2 == "Buena" ? 1 : value2 == "Con problemas" ? 2 : value2 == "Critico" ? 3 : -1)
      }
      else if (event.field == "state") {
        debugger
        value1 = data1[event.field];
        value2 = data2[event.field];

        value1 = (value1 == "RFP/RFI" ? 2 : value1 == "Inception" ? 1 : value1 == "Planning" ? 3 : value1 == "Execution" ? 4 : value1 == "Post Go Live" ? 5 : value1 == "BAU" ? 6 : value1 == "Benefits management" ? 7 : value1 == "Stop" ? 8 : value1 == "Backlog" ? 9 : -1)
        value2 = (value2 == "RFP/RFI" ? 2 : value2 == "Inception" ? 1 : value2 == "Planning" ? 3 : value2 == "Execution" ? 4 : value2 == "Post Go Live" ? 5 : value2 == "BAU" ? 6 : value2 == "Benefits management" ? 7 : value2 == "Stop" ? 8 : value2 == "Backlog" ? 9 : -1)

      }
      else if (event.field == "irr") {

        value1 = Number(data1[event.field].replace(/%/g, ''));
        value2 = Number(data2[event.field].replace(/%/g, ''));
      }
      else {
        value1 = data1[event.field];
        value2 = data2[event.field];
      }

      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);

    });
    
  }

  getAllHealthProject(project) {
    
    if (project.length) {
      const map = new Map();
      for (const item of project) {
        if (item.saludDescripcion) {
          if (!map.has(item.saludDescripcion.trim())) {
            map.set(item.saludDescripcion.trim(), true);
            this.healthOptionsFilter.push({
              label: item.saludDescripcion.trim(),
              value: item.saludDescripcion.trim(),
            });
          }
        }
        else {
          if (!map.has("Sin información")) {
            map.set("Sin información", true);
            this.healthOptionsFilter.push({
              label: "Sin información",
              value: "Sin información",
            });
          }
        }
      }
    }
    else {
      this.healthOptionsFilter = [];
    }
  }
  
  getAllProjectState(project) {

    if (project.length) {
      const map = new Map();
      for (const item of project) {
        if (this.getCurrentProjectState(item)) {
          if (!map.has(this.getCurrentProjectState(item))) {
            map.set(this.getCurrentProjectState(item), true);
            this.stateOptionsFilter.push({
              label: this.getCurrentProjectState(item).trim(),
              value: this.getCurrentProjectState(item).trim(),
            });
          }
        }
        else {
          if (!map.has("Sin información")) {
            map.set("Sin información", true);
            this.stateOptionsFilter.push({
              label: "Sin información",
              value: "Sin información",
            });
          }
        }
      }
    }
    else {
      this.stateOptionsFilter = [];
    }
  }

  getAllProjectSize(project) {

    if (project.length) {
      const map = new Map();
      for (const item of project) {
        if (item.tamanoProyecto) {
          if (!map.has(item.tamanoProyecto)) {
            map.set(item.tamanoProyecto, true);
            this.sizeOptionsFilter.push({
              label: item.tamanoProyecto.trim(),
              value: item.tamanoProyecto.trim(),
            });
          }
        }
        else
        {
          if (!map.has("Sin información")) {
            map.set("Sin información", true);
            this.sizeOptionsFilter.push({
              label: "Sin información",
              value: "Sin información",
            });
          }
        }
      }
    }
    else
    {
      this.sizeOptionsFilter = [];
    }
  }

  clearFilter(dt: any) {
    this.nombreFilter = "";
    this.sponsorFilter = "";
    this.sizeFilter = "";
    this.presupuestoTotalFilter = "";
    this.stateFilter = "";
    this.healthFilter = "";
    this.npvFilter = "";
    this.irrFilter = "";
    this.paybackFilter = "";
    this.clearTagFilter();
    dt.reset();

    this.totalProject = this.dt.totalRecords;
  }

  processData(projects) : any {

    let _this = this;
    let listProject = projects.map(function (project) {
      
      return {
        idProyecto: project.idProyecto,
        guidProyecto: project.guidProyecto,
        nombre: project.nombre,
        sponsor : project.sponsor,
        size : project.tamanoProyecto,
        presupuestoTotal: _this.formatMoney(project.presupuestoTotal),
        state: _this.getCurrentProjectState(project),
        health : project.saludDescripcion,
        npv: _this.formatMoney(project.npv),
        irr: project.irr != null ? project.irr + " %" : "0 %",
        payback: _this.formatMoney(project.payback,2),
        saludColor: project.saludColor,
        objetivos: project.objetivos,
        pm: _this.getRol(project, "PM"),
        ftesAsignados: project.ftesAsignados,
        unidadArt: project.unidadArt,
        unidadSegArg: project.unidadSegArg,
        unidadSegUru: project.unidadSegUru,
        unidadRetiro: project.unidadRetiro,
        unidadCajaMutual: project.unidadCajaMutual,
        unidadServFinanciero: project.unidadServFinanciero,
        unidadTurismo: project.unidadTurismo,
        unidadAsoServ: project.unidadAsoServ,
        semaforoFinanColor: project.idSemFinanNavigation != null ? project.idSemFinanNavigation.color : null,
        semaforoFechaColor: project.idSemFinanNavigation != null ? project.idSemFechaNavigation.color : null,
        stateProject: project.EstadoDashboard,
        proyectoRoles: project.proyectoRoles || []
      }
    });
    
    return listProject;
  }

  viewDetailProject(data) {

    this._commonDataService.showLoader(true);

    this._router.navigate(['home/detail', data.idProyecto]);
  }
  
  syncProject(project,call) {

    this._commonDataService.showLoader(true);

    if (call == "All") {

      //PWA service
      this._homeService.getAllProjectsPWA().subscribe((res) => {

        if (res.Validacion) {
          this.toastManager.error(res.Validacion, 'Sync');
          this._commonDataService.showLoader(false);
        }
        else {
          this.toastManager.success(res.Ok, 'Sync');
          this._commonDataService.showLoader(false);
          this.getAllProject(1);
        }

      });
    }
    else
    {
      this._homeService.getProjectByIdPWA(project.guidProyecto).subscribe((res) => {
        console.log(res);
        if (res.Validacion) {
          this.toastManager.error(res.Validacion, 'Sync');
          this._commonDataService.showLoader(false);  
        }
        else
        {
          this.toastManager.success(res.Ok, 'Sync');
          this._commonDataService.showLoader(false);
          this.getAllProject(1);
        }
        return;
      });
    }
  }
  
  onChangeViewType(event) {
    this.viewType = event.target.checked ? "Card view" : "List view";
    this.IsDisplayCardView = event.target.checked;
    if (this.dt) this.clearFilter(this.dt);
    this.bindingObservable();
  }

  formatMoney(amount, decimalCount = 0, decimal = ",", thousands = ".") {

      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");

  };

  clearTagFilter() {

    $(".filterInputSearch").each((index, element) => {
      if ($(element).val()) {
        $("#" + element.id + "_tagFilter").remove();
      }
    });


    $(".filterDropDownSearch").each((index, element) => {
      if (element.innerText.trim()) {
        $("#" + element.id + "_tagFilter").remove();
      }
    });

    setTimeout(() => {
      this.hideOrShowContainerTagFilter();
    }, 100);

  }

  getCurrentProjectState(project) {

    if (project.customStateProject != null) {
      return project.proyectoEtapas.filter(x => x.nombreEtapa == project.customStateProject).map(function (x) {
        return x.nombreEtapa.trim();
      })[0] || ""
    }
    else
    {

     return  project.proyectoEtapas.filter(x => (x.fechaInicio != null && new Date(x.fechaInicio) <= new Date() && x.vigente == true && x.fechaFin == null)
        || (new Date(x.fechaFin) >= new Date() && new Date(x.fechaInicio) <= new Date() && x.vigente == true)).map(function (x) {
          return x.nombreEtapa.trim();
        })[0] || ""
    }
  }

  getRol(project, descripcionRol) {

    for (var i = 0; i < project.proyectoRoles.length; i++) {
      if (project.proyectoRoles[i].descripcion == descripcionRol) {
        if (project.proyectoRoles[i].nominado) {
          return project.proyectoRoles[i].nominado.trim();
        }
        return "";
      }
    }
  }

  clearFilterByID(id) {

    switch (id) {
      case "name":
        this.nombreFilter = "";
        return "nombre";
      case "state":
        this.stateFilter = "";
        return "state";
      case "npv":
        this.npvFilter = "";
        return "npv";
      case "irr":
        this.irrFilter = "";
        return "irr";
      case "payback":
        this.paybackFilter = "";
        return "payback";
      case "budget":
        this.presupuestoTotalFilter = "";
        return "presupuestoTotal";
      case "sponsor":
        this.sponsorFilter = "";
        return "sponsor";
      case "size":
        this.sizeFilter = "";
        return "size";
      case "health":   
        this.healthFilter = "";
        return "health";
      default:
        return "nombre"
    }

  }

  bindingObservable() {

    setTimeout(() => {

      var filterInputSearch = $(".filterInputSearch");

      for (var i = 0; i < filterInputSearch.length; i++) {

        var input$ = Observable.fromEvent(filterInputSearch[i], 'keyup').map(x => x).debounceTime(1000);
        input$.subscribe(x => this.setFilterTag(x, false, null));

      }

    },50)


  }

  publishProject() {

    this._commonDataService.showLoader(true);

    let listGuidProject = this.listProject.map(function (project) { return project.guidProyecto  });
    
    this._projectService.publishProject(listGuidProject).subscribe((res) => {
      if (res) {
        this.toastManager.success("Se ha publicado exitosamente", 'Publicación');
        this.getAllProject(1);
      }
      else
      {
        this._commonDataService.showLoader(false);
        this.toastManager.error("Fallo la publicacion", 'Publicación');
      }
    });

  }

  onChangeEnviroment(event) {
    this._commonDataService.showLoader(true);
    let selectedValue: number = parseInt($(event.target).val().toString());
    this.getAllProject(selectedValue);

    if (selectedValue == 1) {
      this.currentEnviroment = false;
    }
    else
    {
      this.currentEnviroment = true;
    }
  }

  onChangePM(event) {    
    this.dt.filterGlobal(event.currentTarget.value, 'equals');
  }

  exportAsXLSX(): void {    
    this._excelService.exportAsExcelFile(this.projectToExport, 'Proyectos');
  }
}
