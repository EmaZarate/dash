import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsideRoutingModule } from './inside-routing.module';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar'
import { HeaderComponent } from '../starter/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { SidebarComponent } from '../starter/sidebar/sidebar.component';
import { FooterComponent } from '../starter/footer/footer.component';
import { InsideRoutingComponent } from './inside-routing.component';
import { ProjectComponent } from '../components/project/project.component';
import { DetailComponent } from '../components/project/detail/detail.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown'
import { SliderModule } from 'primeng/slider';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonDataService } from '../services/common-data.service';
import { CreateComponent } from '../components/project/create/create.component';
import { ProjectHeaderComponent } from '../components/project/edit/project-header/project-header.component';
import { ProjectRolesComponent } from '../components/project/edit/project-roles/project-roles.component';
import { ProjectObjetivosComponent } from '../components/project/edit/project-objetivos/project-objetivos.component';
import { ProjectStatesComponent } from '../components/project/edit/project-states/project-states.component';
import { ProjectRisksComponent } from '../components/project/edit/project-risks/project-risks.component';
import { ProjectTeamComponent } from '../components/project/edit/project-team/project-team.component';
import { ProjectUnitsComponent } from '../components/project/edit/project-units/project-units.component';
import { ProjectAreasAfectadasComponent } from '../components/project/edit/project-areas-afectadas/project-areas-afectadas.component';
import { ProjectProveedoresComponent } from '../components/project/edit/project-proveedores/project-proveedores.component';
import { ProjectDocumentosComponent } from '../components/project/edit/project-documentos/project-documentos.component';
import { EditComponent } from '../components/project/edit/edit.component';
import { EditTabsComponent } from '../components/project/edit/project-states/edit-tabs/edit-tabs.component';
import { ProjectActivitiesComponent } from '../components/project/edit/project-activities/project-activities.component';
import { FieldErrorDisplayComponent } from '../components/field-error-display/field-error-display.component';
import { ProviderComponent } from '../components/provider/provider.component';
import { CreateEditProviderComponent } from '../components/provider/create-edit-provider/create-edit-provider.component';
import { DocumentComponent } from '../components/document/document.component';
import { CreateEditDocumentComponent } from '../components/document/create-edit-document/create-edit-document.component';
import { RolComponent } from '../components/rol/rol.component';
import { CreateEditRolComponent } from '../components/rol/create-edit-rol/create-edit-rol.component';

@NgModule({
  imports: [
    CommonModule,
    InsideRoutingModule,
    MalihuScrollbarModule,
    ReactiveFormsModule,
    TableModule,
    SliderModule,
    FormsModule,
    DropdownModule,
    MalihuScrollbarModule.forRoot(),
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
  ],
  declarations: [
    InsideRoutingComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    DetailComponent,
    ProjectComponent,
    CreateComponent,
    EditComponent,
    ProjectHeaderComponent,
    ProjectRolesComponent,
    ProjectObjetivosComponent,
    ProjectStatesComponent,
    ProjectRisksComponent,
    ProjectTeamComponent,
    ProjectUnitsComponent,
    ProjectAreasAfectadasComponent,
    ProjectProveedoresComponent,
    ProjectDocumentosComponent,
    ProjectActivitiesComponent,
    EditTabsComponent,
    FieldErrorDisplayComponent,
    ProviderComponent,
    CreateEditProviderComponent,
    DocumentComponent,
    CreateEditDocumentComponent,
    RolComponent,
    CreateEditRolComponent
  ],
  providers:[
    CommonDataService
  ]
})
export class InsideModule { }
