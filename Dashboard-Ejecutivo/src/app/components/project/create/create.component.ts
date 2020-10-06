import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private _projectService: ProjectService,
    private _router: Router
    ) { }

  ngOnInit() {
  }

  createProject(){
    this.isLoading = true;
    this._projectService.addProject()
      .subscribe((res) => {
        this._router.navigate(['/home/edit',res]);
        this.isLoading = false;
      })
  }

}
