import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HomeService } from '../../../../services/home.service';
import { AuthService } from '../../../../services/auth.service';

declare var $: any

@Component({
  selector: 'app-project-roles',
  templateUrl: './project-roles.component.html',
  styleUrls: ['./project-roles.component.css']
})
export class ProjectRolesComponent implements OnInit {

  @Output() emitChangesRoles = new EventEmitter<any>();

  @Input() isEditing: boolean;
  @Input() selectedProject: any;

  projectRol = [];
  roles: any[] = new Array<any>();
  userRol

  constructor(
    private _homeService: HomeService,
    private _authService: AuthService
  ) { }


  ngOnInit() {
    this.userRol = this._authService.getUserLogedRol();

    this._homeService.getRoles()
      .subscribe((res: any) => {        
        this.projectRol = res;
        this.setProjectRol();
        this.mapProjectToModel();
      })
  }

  ngOnChanges(changes) {
    if (changes.isEditing) {
      this.isEditing = changes.isEditing.currentValue;
    }
    if (changes.selectedProject) {
      this.selectedProject = changes.selectedProject.currentValue;
      if (this.selectedProject) {
        this.setProjectRol();
        this.mapProjectToModel();
      }
    }
  }

  mapProjectToModel() {
    this.projectRol.forEach(rol => {
      this.roles[rol.idRol] = rol.nominado
    });
  }

  mapModelToProject() {
    
    let rolesUpdated = [];
    
    this.projectRol.forEach(rol => {
      
      var findRoleIfExist = this.selectedProject.proyectoRoles.find(x => x.idRol == rol.idRol);
      if (findRoleIfExist != undefined) {
        findRoleIfExist.nominado = this.roles[rol.idRol];
        rol.nominado = this.roles[rol.idRol];
        rolesUpdated.push(findRoleIfExist);

        if (findRoleIfExist.descripcion == "Sponsor") {
          this.selectedProject.sponsor = findRoleIfExist.nominado;          
        }
        
        if (findRoleIfExist.descripcion == "PM") {
          this.selectedProject.pm = findRoleIfExist.nominado;
        }

      }
      else
      {
        if (this.roles[rol.idRol] != null) {
          let newRole = { descripcion: rol.descripcion, nominado: this.roles[rol.idRol], idRol: rol.idRol, idProyecto: this.selectedProject.idProyecto };
          rolesUpdated.push(newRole);
          rol.nominado = this.roles[rol.idRol];

          if (newRole.descripcion == "Sponsor") {
            this.selectedProject.sponsor = rol.nominado;
          }

          
          if (newRole.descripcion == "PM") {
            this.selectedProject.pm = rol.nominado;
          }

        }
      }

    });

    this.selectedProject.proyectoRoles = rolesUpdated;

  }

  setProjectRol() {
    if (this.selectedProject) {
      $.map(this.projectRol, x => {
        for (var i = 0; i < this.selectedProject.proyectoRoles.length; i++) {
          
          if (x.descripcion == this.selectedProject.proyectoRoles[i].descripcion) {
            x.nominado = this.selectedProject.proyectoRoles[i].nominado.trim();
            x.detalleRol = this.selectedProject.proyectoRoles[i].detalleRol.trim();
          }
        }
      });
    }

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


  editMode() {
    this.isEditing = true;
    //this.mapProjectToModel();
  }

  cancelChanges() {
    this.setProjectRol();
    this.isEditing = false;
  }

  saveChanges() {
    this.mapModelToProject();
    this.emitChangesRoles.emit(this.selectedProject);
    this.isEditing = false;
    this.setProjectRol();
  }
}
