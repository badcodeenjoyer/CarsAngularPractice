import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Observable} from "rxjs";



export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(aId: number): Observable<OwnerEntity>;
  createOwner(
    aId:number,
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;
  editOwner(aid:number,aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<OwnerEntity>;
}
export interface CarEntity{
  id:number
  LicensePlateNumber:string;
  ManufacturerName:string;
  ModelName:string;
  YearOfManufacture:number;
}
export interface  OwnerEntity{
  id:number
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Cars: CarEntity[];
}
@Injectable({
  providedIn: 'root'
})
export class MainServiceService implements InMemoryDbService{

  constructor() { }

  createDb(){
     return {
       owners: <OwnerEntity[]>[
         {id:11,FirstName:'Родион',LastName:'Броваров',MiddleName:'Александрович',Cars:[
           {id:11,LicensePlateNumber:'AI8484CE',ManufacturerName:'Ferrari',ModelName:'LaFerrari',YearOfManufacture:2020},
             {id:12,LicensePlateNumber:'AA1337BB',ManufacturerName:'Toyota',ModelName:'Supra A80',YearOfManufacture:2000}
           ]},
         {id:12,FirstName:'Петр',LastName:'Перваков',MiddleName:'Георгиевич',Cars:[
             {id:11,LicensePlateNumber:'AB7657BC',ManufacturerName:'Lada',ModelName:'Kalina',YearOfManufacture:2004}
           ]},
         {id:13,FirstName:'Яна',LastName:'Цист',MiddleName:'Адольфовна',Cars:[
             {id:11,LicensePlateNumber:'KK1488KC',ManufacturerName:'Audi',ModelName:'RS7',YearOfManufacture:2020}
           ]}
       ],

     }
  }
  genId<T extends OwnerEntity | CarEntity>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }


}
