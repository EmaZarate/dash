import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from '../../../services/common-data.service';
import { DocumentService } from '../../../services/document.service';
import { HomeService } from '../../../services/home.service';
import { Subject } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-create-edit-document',
  templateUrl: './create-edit-document.component.html',
  styleUrls: ['./create-edit-document.component.css']
})
export class CreateEditDocumentComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public _stateFields: Array<any> = [];
  documentForm: FormGroup;

  get name() { return this.documentForm.get('name'); }
  get state() { return this.documentForm.get('state'); }
  get required() { return this.documentForm.get('required'); }


  isCreate: boolean;
  public _document: any = { nombre: "", idDocumento: 0, nomnbreEtapa: "", obligatorio: false, idEtapa: 0};

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    public _commonDataService: CommonDataService,
    private _homeService:HomeService,
    private _documentService: DocumentService,
    private fb: FormBuilder) { }

  ngOnInit() {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);

    this.documentForm = this.modelCreate();


    this._homeService.getStates()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res: any[]) => {        
        this._stateFields = res;
        setTimeout(_ => this._commonDataService.showLoader(false), 150);
      });

    this._route.data.subscribe((data) => {
      if (data.typeForm == 'new') {        
        this.isCreate = true;
      }
      else {
        this.isCreate = false;
        this._route.params.subscribe((res) => {
          this._documentService.getOne(res.id)
            .subscribe((res: any) => {
              this._document = res;
              this.documentForm.patchValue({
                name: this._document.nombre,
                state: this._document.idEtapa,
                required: this._document.obligatorio
              });
              setTimeout(_ => this._commonDataService.showLoader(false), 150);
            });
        });
      }
    });

  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  modelCreate() {
    return this.fb.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      required : [false, Validators.required]
    });
  }

 

  onSubmit() {
    
    if (this.documentForm.valid) {
      setTimeout(_ => this._commonDataService.showLoader(true), 50);
      this._document.nombre = this.name.value;
      this._document.idEtapa = this.state.value;
      this._document.obligatorio = this.required.value;
      
      if (this.isCreate) {

        this._documentService.add(this._document)
          .subscribe(() => {
            this._router.navigate(['home/documents']);
            setTimeout(_ => this._commonDataService.showLoader(false), 150);
          });
      }
      else {
        this._documentService.update(this._document)
          .subscribe(() => {
            this._router.navigate(['home/documents']);
            setTimeout(_ => this._commonDataService.showLoader(false), 150);
          });
      }
    }
  }

}
