import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { AuthService as RoleGuard } from '../services/auth.service';
import { InsideRoutingComponent } from './inside-routing.component';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from '../components/project/detail/detail.component';
import { EditComponent } from '../components/project/edit/edit.component';
import { ProviderComponent } from '../components/provider/provider.component';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditProviderComponent } from '../components/provider/create-edit-provider/create-edit-provider.component';
import { DocumentComponent } from '../components/document/document.component';
import { CreateEditDocumentComponent } from '../components/document/create-edit-document/create-edit-document.component';
import { RolComponent } from '../components/rol/rol.component';
import { CreateEditRolComponent } from '../components/rol/create-edit-rol/create-edit-rol.component';

const insideRoutes: Routes = [
  {
    path: 'home',
    component: InsideRoutingComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      {
        path: 'index',
        component: HomeComponent,
      },
      {
        path: 'providers',
        data: {
          roles: ['admin', 'user']
        },
        component: ProviderComponent
      },
      {
        path: 'providers/new',
        data: {
          typeForm: 'new',
          roles: ['admin', 'user']
        },
        component: CreateEditProviderComponent
      },
      {
        path: 'providers/edit/:id',
        data: {
          typeForm: 'edit',
          roles: ['admin', 'user']
        },
        component: CreateEditProviderComponent
      },      
      {
        path: 'documents',
        data: {
          roles: ['admin', 'user']
        },
        component: DocumentComponent
      },
      {
        path: 'documents/new',
        data: {
          typeForm: 'new',
          roles: ['admin', 'user']
        },
        component: CreateEditDocumentComponent
      },
      {
        path: 'documents/edit/:id',
        data: {
          typeForm: 'edit',
          roles: ['admin', 'user']
        },
        component: CreateEditDocumentComponent
      },
      {
        path: 'roles',
        data: {
          roles: ['admin', 'user']
        },
        component: RolComponent
      },
      {
        path: 'roles/new',
        data: {
          typeForm: 'new',
          roles: ['admin', 'user']
        },
        component: CreateEditRolComponent
      },
      {
        path: 'roles/edit/:id',
        data: {
          typeForm: 'edit',
          roles: ['admin', 'user']
        },
        component: CreateEditRolComponent
      },
      {
        path: 'detail/:id',
        data: {
          roles: ['admin', 'user']
        },
        component: DetailComponent
      },
      {
        path: 'edit/:id',
        data: {
          roles: ['admin', 'user']
        },
        component: EditComponent
      },
      {
        path: '**',
        redirectTo: 'index'
      },
     
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxChartsModule,
    ChartsModule,
    RouterModule.forChild(insideRoutes)
  ],
  exports: [
    RouterModule,
    NgbModule,
    NgxChartsModule,
    ChartsModule,
  ]
})
export class InsideRoutingModule { }
