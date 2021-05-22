import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectCreateComponent } from './create/project-create.component';


const routes: Routes = [
    {
        path: '', component: ProjectComponent,
        children: [
            { path: '', redirectTo: 'projects', pathMatch: 'full' },
            { path: 'projects', component: ProjectComponent },
            { path: 'projectcreate', component:ProjectCreateComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }
