import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataService } from '../../../services/common-data.service';
import { ProviderService } from '../../../services/provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-provider',
  templateUrl: './create-edit-provider.component.html',
  styleUrls: ['./create-edit-provider.component.css']
})
export class CreateEditProviderComponent implements OnInit {

  providerForm: FormGroup;

  get name() { return this.providerForm.get('name'); }  
  
  isCreate: boolean;
  public _provider:any = { nombre: "", idProveedor: 0 };

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    public _commonDataService: CommonDataService,
    private _providerService: ProviderService,
    private fb: FormBuilder) { }

  ngOnInit() {
    
    setTimeout(_ => this._commonDataService.showLoader(true), 50);

    this.providerForm = this.modelCreate();


    this._route.data.subscribe((data) => {
      if (data.typeForm == 'new') {
        this.isCreate = true;
        setTimeout(_ => this._commonDataService.showLoader(false), 150);
      }
      else {
        this.isCreate = false;
        this._route.params.subscribe((res) => {
          this._providerService.getOne(res.id)
            .subscribe((res: any) => {
              this._provider = res;
              this.name.patchValue(this._provider.nombre);              
              setTimeout(_ => this._commonDataService.showLoader(false), 150);
            });
        });
      }
    });

  }

  modelCreate() {
    return this.fb.group({
      name: ['', Validators.required]
    });
  }


  onSubmit() {
    debugger
    if (this.providerForm.valid) {
      setTimeout(_ => this._commonDataService.showLoader(true), 50);
      this._provider.nombre = this.name.value;      
      if (this.isCreate) {

        this._providerService.add(this._provider)
          .subscribe(() => {            
            this._router.navigate(['home/providers']);
            setTimeout(_ => this._commonDataService.showLoader(false), 150);
          });
      }
      else
      {
        this._providerService.update(this._provider)
          .subscribe(() => {            
            this._router.navigate(['home/providers']);
            setTimeout(_ => this._commonDataService.showLoader(false), 150);
          });
      }
    }
  }


}
