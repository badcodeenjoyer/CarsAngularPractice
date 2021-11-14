import { Injectable } from '@angular/core';
import {ICarOwnersService , CarEntity,OwnerEntity} from "./main-service.service";
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CarOwnersServiceService implements ICarOwnersService{

  // @ts-ignore
  owner:OwnerEntity;
  constructor(private  http:HttpClient) { }

  createOwner( aId:number, aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    this.owner={id:aId,LastName:aLastName,FirstName:aFirstName,MiddleName:aMiddleName,Cars:aCars};
    return this.http.post<OwnerEntity>('/api/owners/',this.owner);
  }

  deleteOwner(aOwnerId: number): Observable<OwnerEntity> {

    return this.http.delete<OwnerEntity>('/api/owners/'+aOwnerId) ;
  }

  editOwner(aId:number,aOwner: OwnerEntity): Observable<OwnerEntity> {

    return this.http.put<OwnerEntity>('/api/owners/'+aId,aOwner)
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>('/api/owners/'+aId);
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>('/api/owners/');
  }


}
