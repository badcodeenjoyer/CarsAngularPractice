import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import {AppComponent} from "./app.component";
import {CarFormComponent} from "./car-form/car-form.component";
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'carForm',component:CarFormComponent},
  {path:'carForm/:id',component:CarFormComponent},
  {path:'carForm/:id/:status',component:CarFormComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
