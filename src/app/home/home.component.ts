import { Component, OnInit } from '@angular/core';
import {CarOwnersServiceService} from "../services/car-owners-service.service";

import {OwnerEntity} from "../services/main-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private  service:CarOwnersServiceService ,) {

  }

  owners:OwnerEntity[]=[];

  ngOnInit(): void {
    this.service.getOwners().subscribe(data=>{this.owners=data});

  }

  delete(id:number){
    this.service.deleteOwner(id).subscribe();
    this.service.getOwners().subscribe(data=>{this.owners=data});
  }





}
