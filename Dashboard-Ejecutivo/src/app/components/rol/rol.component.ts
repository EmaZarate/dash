import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/common-data.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  public listRole: any[];
  roleColumns: any[];
  public totalProviderRecords: number;
  private all = { label: "All", value: null };
  public userRol;
  nombreFilter: string;
  totalRolRecords

  constructor(public _commonDataService: CommonDataService,
    private _authService: AuthService,
    private _roleService: RolService) { }

  ngOnInit() {

    this.roleColumns = [
      { field: 'descripcion', header: 'Description' }
    ];


    this.userRol = this._authService.getUserLogedRol();

    this.getAllRole();
  }

  getAllRole() {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);


    setTimeout(() => {
      debugger
      this._roleService.getAll().subscribe((res) => {
        this.totalRolRecords = res.length;
        this.listRole = res;
        this._commonDataService.showLoader(false);

      });

    }, 300);
  }

  deleteRol(id) {

    let self = this;

    Swal({
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      text: '¿Esta seguro que desea eliminar el rol?',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then(function (result) {

      if (result.value) {

        self._commonDataService.showLoader(true);

        self._roleService.deleteRol(id)
          .subscribe((del) => {
            self.getAllRole();
          },
            error => console.log(error));
      }

    });

  }

}
