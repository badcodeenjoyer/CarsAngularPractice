import {Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { OwnerEntity} from "../services/main-service.service";
import {CarOwnersServiceService} from "../services/car-owners-service.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators"


@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})


export class CarFormComponent implements OnInit,AfterViewInit  {

  message: string = 'Загрузка';
  ownerForm:FormGroup=this.ownerTable()
  // @ts-ignore
  carTable:FormGroup;
  touchedRows: any;
  // @ts-ignore
  control: FormArray;
  //cars:CarEntity[]=[];
  // @ts-ignore
  id:number;
  // @ts-ignore
  owner:OwnerEntity={}
  //owner:OwnerEntity ={}
  // @ts-ignore
  status:string;
  day:Date=new Date()
  // @ts-ignore

  constructor(private fb:FormBuilder,private router:Router,private service : CarOwnersServiceService,private route:ActivatedRoute,private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.route.params.subscribe(query => {
      this.status=query['status']; this.id=query['id'];
    })
    this.touchedRows = [];
     this.carTable = this.fb.group({
       tableRows: this.fb.array( [])
     });
    this.control = this.carTable.get('tableRows') as FormArray;
    if (this.status!==undefined) {
      this.getCars();
    }
    else this.addRow();

  }
  get getFormControls() {
    return this.carTable.get('tableRows') as FormArray;
  }
  submitAddForm() {
    this.getData();
    this.service.createOwner(this.owner.id,this.owner.LastName,this.owner.FirstName,this.owner.MiddleName,this.owner.Cars).subscribe()
    this.back();
  }
  submitEditForm() {
    this.getData();
    this.service.editOwner(this.id,this.owner).subscribe()
    this.back();
  }
  addRow() {
    const control = this.carTable.get('tableRows') as FormArray;
    control.push(this.initForm());
  }
  deleteRow(index: number) {
    const control =  this.carTable.get('tableRows') as FormArray;
    control.removeAt(index);
    this.owner.Cars[index]=this.owner.Cars[index-1]
  }
  initForm(){
  return this.fb.group({
    LicensePlateNumber: ['', [Validators.required , Validators.pattern(/^[A-Z]{2}[0-9]{4}[A-Z]{2}$/) ,RxwebValidators.unique()]],
    ManufacturerName: ['', Validators.required],
    ModelName: ['', [Validators.required]],
    YearOfManufacture: ['', [Validators.required , Validators.min(1990) ,Validators.max(this.day.getFullYear())]],
  });
  }
  ownerTable(){

     return this.fb.group({
      firstName:['', [Validators.required ]],
      lastName:['', Validators.required],
      middleName:['', Validators.required],
    })
  }
  back(){
    this.router.navigate(['']).then()
  }
  getCars(){
    return this.service.getOwnerById(this.id).subscribe(data=>{this.owner=data;
    for (let i = 0 ; i<this.owner.Cars.length;i++){
      this.addRow();
      this.control.get(i.toString())?.patchValue({
        LicensePlateNumber: this.owner.Cars[i].LicensePlateNumber ,
        ManufacturerName:this.owner.Cars[i].ManufacturerName ,
        ModelName: this.owner.Cars[i].ModelName,
        YearOfManufacture:this.owner.Cars[i].YearOfManufacture
      })
    }
    })
  }
  getData(){
    this.owner.FirstName= this.ownerForm.get('firstName')?.value;this.owner.LastName= this.ownerForm.get('lastName')?.value;this.owner.MiddleName= this.ownerForm.get('middleName')?.value;this.owner.Cars=this.carTable.get('tableRows')?.value;
  }

  ngAfterViewInit() {
    this.message = 'Загружено успешно'
    this.cdr.detectChanges();
  }

}
