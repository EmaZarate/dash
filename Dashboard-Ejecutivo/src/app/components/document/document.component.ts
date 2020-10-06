import { Component, OnInit, AfterViewInit,  ViewChildren, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonDataService } from '../../services/common-data.service';
import { DocumentService } from '../../services/document.service';
import Swal from 'sweetalert2'
declare var $: any

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit,AfterViewInit {

  public listDocuments: any[];
  private all = { label: "All", value: null };
  public userRol;
  documentColumns: any[];


  nameFilter: string;
  requiredFilter: string;
  stateFilter: string;

  stateOptionsFilter = [];
  requiredOptionsFilter = [];

  public totalDocumentsRecords = 0;


  constructor(private _authService: AuthService,
    public _commonDataService: CommonDataService,
    public _documentService: DocumentService) {

  }
  
  ngOnInit(): void {
    this.documentColumns = [
      { field: 'name', header: 'Name'},
      { field: 'state', header: 'State'},
      { field: 'required', header: 'Required' }
    ];

    this.getAllDocuments();

    this.userRol = this._authService.getUserLogedRol();

  }


  ngAfterViewInit(): void {

  }



  deleteDocument(id) {
    let self = this;

    Swal({
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      text: '¿Esta seguro que desea eliminar el documento?',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then(function (result) {

      if (result.value) {

        self._commonDataService.showLoader(true);

        self._documentService.deleteProvider(id)
          .subscribe((del) => {
            self.getAllDocuments();
          },
            error => console.log(error));
      }

    });


  }

  getAllDocuments() {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);


    setTimeout(() => {

      this._documentService.getAll().subscribe((res) => {
        
        this.totalDocumentsRecords = res.length;
        this.listDocuments = this.processData(res);
        this.setFilter(res);
        this._commonDataService.showLoader(false);

      });

    }, 300);

  }

  setFilter(documents) {

    this.stateOptionsFilter.push(this.all);
    this.requiredOptionsFilter.push(this.all);

    this.getAllState(documents);
    this.getAllRequired(documents);
  }

  getAllState(documents) {

    if (documents.length) {
      const map = new Map();
      for (const item of documents) {
        if (!map.has(item.nombreEtapa)) {
          map.set(item.nombreEtapa, true);
          
          this.stateOptionsFilter.push({
            label: item.nombreEtapa.trim(),
            value: item.nombreEtapa.trim(),
          });
        }
      }
    }
    else {
      this.stateOptionsFilter = [];
    }
  }

  getAllRequired(documents) {
    if (documents.length) {
      const map = new Map();
      for (const item of documents) {
        if (!map.has(item.obligatorio)) {
          map.set(item.obligatorio, true);

          this.requiredOptionsFilter.push({
            label: item.obligatorio ? "SI" : "NO",
            value: item.obligatorio ? "SI" : "NO"
          });
        }
      }
    }
    else {
      this.requiredOptionsFilter = [];
    }
  }


  onDropDownChange(event, dt) {
    let idDropDown = event.originalEvent.currentTarget.closest("p-dropdown").id;
    dt.filter(event.value, idDropDown, 'equals');    
  }

  customSort(event: any) {
    event.data.sort((data1, data2) => {
      let value1;
      let value2;

      if (event.field == "required") {
        value1 = data1[event.field];
        value2 = data2[event.field];

        value1 = (value1 == "SI" ? 1 : value1 == "NO" ? 2 : -1)
        value2 = (value2 == "SI" ? 1 : value2 == "NO" ? 2 : -1)
      }
      else if (event.field == "state") {
        
        value1 = data1[event.field];
        value2 = data2[event.field];

        value1 = (value1 == "RFP/RFI" ? 2 : value1 == "Inception" ? 1 : value1 == "Planning" ? 3 : value1 == "Execution" ? 4 : value1 == "Post Go Live" ? 5 : value1 == "BAU" ? 6 : value1 == "Benefits management" ? 7 : -1)
        value2 = (value2 == "RFP/RFI" ? 2 : value2 == "Inception" ? 1 : value2 == "Planning" ? 3 : value2 == "Execution" ? 4 : value2 == "Post Go Live" ? 5 : value2 == "BAU" ? 6 : value2 == "Benefits management" ? 7 : -1)

      }
      else
      {
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


  processData(documents) {

    let listDocuments = documents.map(function (document) {

      return {
        idDocumento: document.idDocumento,
        name: document.nombre,
        state: document.nombreEtapa.trim(),
        required: document.obligatorio ? "SI" : "NO"
      }

    });

    return listDocuments;
  }



}
