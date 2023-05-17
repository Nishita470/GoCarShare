import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carlender',
  templateUrl: './carlender.component.html',
  styleUrls: ['./carlender.component.css']
})
export class CarlenderComponent implements OnInit {
  carColor: string = ''
  carInventoryId: string = ''
  listingPrice:number
  availableFrom:Date
  availableTo:Date
  availableFromTime:string
  availableToTime:string
  isRegisterButtonClicked: boolean = false
  isHostButtonClicked:boolean = false
  selectedModelIndex:number=-1
  selectedCarIndex: number = -1
  searchInput:string;
  carsRefinedByBodyStyle: CarRefinedByBodyStyle[] = []
  userVehicles: UserVehicles[] = []
  latitude:any
  longitude:any
  formattedFromDate: string;
  formattedToDate: string;
  selectedAmPmFrom:string;
  selectedAmPmTo:string;
  constructor(private http: HttpClient,private datePipe: DatePipe,private router: Router) {
    
   }
   baseurl="http://34.122.10.135:80/api/auth/search?q=";
   url:any;
   idToken = localStorage.getItem('idToken');
   headers = new HttpHeaders({
  'Authorization': "Bearer "+this.idToken
  });
  
  
   
  ngOnInit(): void {
    this.http.get('http://34.122.10.135:80/api/user/vehicle/vehicle',{headers : this.headers})
    .subscribe((data: any) => {
    // alert(data.userVehicles.length)
      console.log(data.userVehicles)
      let userVehicles1=data.userVehicles;
      let vehicles: UserVehicles[] =[]
      for(let i=0;i<userVehicles1.length;i++)
      {
        vehicles.push({
          'bodyStyle': userVehicles1[i].bodyStyle,
          'color': userVehicles1[i].color,
          'make': userVehicles1[i].make,
          'registeredOn': userVehicles1[i].registeredOn,
          'year':userVehicles1[i].year,
          'vehicleid':userVehicles1[i]._id
          
          
      })
  }
  this.userVehicles = vehicles
  console.log("vehicles array:",vehicles)
  console.log("userVehicles array",userVehicles1)
})
    
  }


  showDropdown = false;
  carList: any[] = [];
  onChangeCarColor(carColor: string){
    this.carColor = carColor
  }
  onsearchInput(searchInput:string){
    this.searchInput =searchInput
  }

  onChangeCarInventoryId(carInventoryId: string){
    this.carInventoryId = carInventoryId
  }
  onListingPrice(listingPrice:number)
  {
    this.listingPrice = listingPrice
  }
  onAvailableFrom(availableFrom:Date)
  {
    this.availableFrom=availableFrom
  }
  onAvailableTo(availableTo:Date)
  {
    this.availableTo=availableTo
  }
  onAvailableFromTime(availableFromTime:string)
  {
    this.availableFromTime=availableFromTime
  }
  onAvailableToTime(avialableToTime:string)
  {
    this.availableToTime =avialableToTime
  }

  getLocation(){
    if(!navigator.geolocation){
      console.log("loc not supported");
    }
    navigator.geolocation.getCurrentPosition((position) =>{
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;
      
    });
  }
  submitRegistration(index: number){
    console.log(this.carsRefinedByBodyStyle[index])
    console.log(this.carColor)
    console.log(this.carInventoryId)
    let postUrl: string =  'http://34.122.10.135:80/api/user/vehicle/register'
    let Body = {
    "make": this.carsRefinedByBodyStyle[index].make,
    "model": this.carsRefinedByBodyStyle[index].model,
    "year": this.carsRefinedByBodyStyle[index].year,
    "color": this.carColor,
    "inventoryId": '',
    "bodyStyle": this.carsRefinedByBodyStyle[index].body_styles
    }
    this.http.post(postUrl,Body,{headers : this.headers})
    .subscribe((data: any) => {
      console.log(data)
      alert("Registration of vehicle successful");
    })
   this.carsRefinedByBodyStyle=[]
   this.router.navigate(['/carlender'])
   
    
  }
submitHost(index: number)
{
  this.formattedFromDate = this.datePipe.transform(this.availableFrom, 'MM/dd/yyyy');
  // this.formattedFromDate=this.formattedFromDate.replace(/-/g, ':')
  this.formattedToDate = this.datePipe.transform(this.availableTo,'MM/dd/yyyy')
  // console.log(this.formattedDate)
  let fromTime =this.formattedFromDate+":"+this.availableFromTime+":"+this.selectedAmPmFrom
  let toTime=this.formattedToDate+":"+this.availableToTime+":"+this.selectedAmPmTo
  console.log("From time",fromTime)
  console.log("To Time",toTime)
  let postUrl:string ='http://34.122.10.135/api/schedule/list/list-vehicle'
  let Body ={
    "vehicleId": this.userVehicles[index].vehicleid,
    "vehicleLocation": {
        "coordinates": [
            this.latitude,
            this.longitude
        ]
    },
    "listingPrice": this.listingPrice,
    "availableFrom": fromTime,
    "availableTill": toTime

  }
  this.http.post(postUrl,Body,{headers: this.headers})
  .subscribe((data:any) =>{
    console.log(data)
  })
}

  register(index: number){
    this.isRegisterButtonClicked = true
    this.selectedCarIndex = index
  }
  host(index:number){
    this.isHostButtonClicked=true
    this.selectedModelIndex=index
  }

  searchCars(){
    const carList=[]
     this.url=this.baseurl + this.searchInput;
   // alert(this.url);
    //alert(this.idToken)
    this.http.get(this.url,{headers : this.headers})
    .subscribe((data: any) => {
    console.log(data);
    let carResults: Car[] = data.cars
    console.log(carResults)
    let refined : CarRefinedByBodyStyle[] = []
    for(let i=0; i< carResults.length; i++)
    {
      for(let j=0; j<carResults[i].body_styles.length; j++)
      {
        refined.push({
          'body_styles' : carResults[i].body_styles[j],
          'make' : carResults[i].make,
          'model' : carResults[i].model,
          'model_id' : carResults[i].model_id,
          'year' : carResults[i].year})
      }
    }
    console.log(refined)
    this.carsRefinedByBodyStyle = refined
    // const select=data
    carList.push(data.cars[0])//Hemanth
    //alert(typeof(carList[0]))
    //alert(carList[0]) //Hemanth
    this.carList = carList[0]; //Hemanth
    console.log(this.carList) //Hemanth
    this.showDropdown = true;  //Hemanth
    console.log(this.carList[0].make)
})

   
    // cars= new FormControl('');

    
    // ListofCars: carList[0]

}
Signout(){
  this.router.navigate(['/Login'])
}
calllendee(){
  this.router.navigate(['/carlendee'])
}
    
}

class Car{
  body_styles : string[]
  make : string
  model: string
  model_id: string
  year: number
}

class CarRefinedByBodyStyle{
  body_styles : string
  make : string
  model: string
  model_id: string
  year: number
}

class UserVehicles{
  bodyStyle: string
  color: string
  make: string
  registeredOn: string
  year:number
  vehicleid:string
}