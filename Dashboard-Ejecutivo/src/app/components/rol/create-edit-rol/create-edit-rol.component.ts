import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from '../../../services/common-data.service';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-create-edit-rol',
  templateUrl: './create-edit-rol.component.html',
  styleUrls: ['./create-edit-rol.component.css']
})
export class CreateEditRolComponent implements OnInit {

  roleForm: FormGroup;

  get description() { return this.roleForm.get('description'); }

  isCreate: boolean;
  public _role: any = { descripcion: "", idRol: 0 };

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    public _commonDataService: CommonDataService,
    private _roleService: RolService,
    private fb: FormBuilder) { }

  ngOnInit() {

    setTimeout(_ => this._commonDataService.showLoader(true), 50);

    this.roleForm = this.modelCreate();


    this._route.data.subscribe((data) => {
      if (data.typeForm == 'new') {
        this.isCreate = true;
        setTimeout(_ => this._commonDataService.showLoader(false), 150);
      }
      else {
        this.isCreate = false;
        this._route.params.subscribe((res) => {
          this._roleService.getOne(res.id)
            .subscribe((res: any) => {
              this._role = res;
              this.description.patchValue(this._role.descripcion);
              setTimeout(_ => this._commonDataService.showLoader(false), 150);
            });
        });
      }
    });

  }

  modelCreate() {
    return this.fb.group({
      description: ['', Validators.required]
    });
  }


  onSubmit() {
    debugger
    if (this.roleForm.valid) {
      setTimeout(_ => this._commonDataService.showLoader(true), 50);
      this._role.descripcion = this.description.value;
      if (this.isCreate) {

        this._roleService.add(this._role)
          .subscribe(() => {
            this._router.navigate(['home/roles']);
            setTimeout(_ => this._commonDataService.showLoader(false), 150);
          });
      }
      else {
        this._roleService.update(this._role)
          .subscribe(() => {
            this._router.navigate(['home/roles']);
            setTimeout(_ => this._commonDataService.showLoader(false), 150);
          });
      }
    }
  }
}
