import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonDataService } from '../../services/common-data.service';
import { ProviderService } from '../../services/provider.service';
import Swal from 'sweetalert2'
declare var $: any

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  public listProviders: any[];
  providerColums: any[];
  public totalProviderRecords: number;
  private all = { label: "All", value: null };
  public userRol;
  nombreFilter: string;

  constructor(public _commonDataService: CommonDataService,
    private _authService: AuthService,
    private _providerService: ProviderService) { }

  ngOnInit() {

    this.providerColums = [
      { field: 'nombre', header: 'Name'},
    ];
    
    this.userRol = this._authService.getUserLogedRol();
    this.getAllProvider();
  }

  getAllProvider() {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);


    setTimeout(() => {

      this._providerService.getAll().subscribe((res) => {        
        this.totalProviderRecords = res.length;
        this.listProviders = res;
        this._commonDataService.showLoader(false);        

      });

    }, 300);
  }


  deleteProvider(id) {
    let self = this;

    Swal({
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      text: '¿Esta seguro que desea eliminar el proveedor?',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then(function (result) {

      if (result.value) {

        self._commonDataService.showLoader(true);

        self._providerService.deleteProvider(id)
          .subscribe((del) => {
            self.getAllProvider();
          },
            error => console.log(error));
      }

    });


  }

}
