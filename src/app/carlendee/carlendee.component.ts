import { DatePipe } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {Router} from '@angular/router';

declare const L
@Component({
  selector: 'app-carlendee',
  templateUrl: './carlendee.component.html',
  styleUrls: ['./carlendee.component.css']
})
export class CarlendeeComponent implements OnInit {

  constructor(private http:HttpClient,private datePipe: DatePipe,private router:Router) {} 
  latitude:any;
  longitude:any;
  radius:number;
  availableFrom:Date
  availableTo:Date
  availableFromTime:string
  availableToTime:string
  formattedFromDate: string;
  formattedToDate: string;
  selectedAmPmFrom:string;
  selectedAmPmTo:string;
  vehiclesAround: VehiclesAround[] =[]
  userReservations:UserReservations[]=[]
  zoom:13;
  center:google.maps.LatLngLiteral ={lat:24,lng:12};
  bounds:google.maps.LatLngBoundsLiteral={
    east:10,
    north:10,
    west:-10,
    south:-10
  }
  idToken = localStorage.getItem('idToken');
  headers = new HttpHeaders({
    'Authorization': "Bearer "+this.idToken
    });

  ngOnInit(): void {
    this.http.get('http://34.122.10.135/api/schedule/find/myreservations',{headers : this.headers})
    .subscribe((data: any) => {
      console.log(data);
    // alert(data.userVehicles.length)
     console.log(data.userReservations)
       let userReservations1=data.userReservations;
      let reserved: UserReservations[] =[]
      for(let i=0;i<userReservations1.length;i++)
       {
          reserved.push({
             'price':userReservations1[i].reservationPrice,
             'status':userReservations1[i].reservationStatus,
             'startdate':userReservations1[i].startDate,
             'enddate':userReservations1[i].endDate
          
          
     })
  }
   this.userReservations = reserved
    
   
  })
}
  onRadius(radius:number)
  {
    this.radius=radius;
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
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);

       this.latitude=position.coords.latitude;
       this.longitude=position.coords.longitude;
       
     
    });
  }
  findVehicles(){
    this.formattedFromDate = this.datePipe.transform(this.availableFrom, 'MM/dd/yyyy');
  // this.formattedFromDate=this.formattedFromDate.replace(/-/g, ':')
  this.formattedToDate = this.datePipe.transform(this.availableTo,'MM/dd/yyyy')
  // console.log(this.formattedDate)
  let fromTime =this.formattedFromDate+":"+this.availableFromTime+":"+this.selectedAmPmFrom
  let toTime=this.formattedToDate+":"+this.availableToTime+":"+this.selectedAmPmTo
  console.log("From time",fromTime)
  console.log("To Time",toTime)
  let postUrl:string ='http://34.122.10.135/api/schedule/find/find-vehicles'
  let Body ={
    "radius": this.radius,
    "latitude": this.latitude,
    "longitude": this.longitude,
    "startDate": fromTime,
    "endDate": toTime
    

  }
  this.http.post(postUrl,Body,{headers: this.headers})
  .subscribe((data:any) =>{
    console.log(data.vehicles);
    console.log(data.vehicles.length);
    let vehiclesAround1=data.vehicles;
    let vehiclesA:VehiclesAround[]=[]
    for(let i=0;i<vehiclesAround1.length;i++){
        vehiclesA.push({
          'listingid' : vehiclesAround1[i]._id,
          'availablefrom': vehiclesAround1[i].availableFrom,
          'availableto': vehiclesAround1[i].availableTill,
          'listedon': vehiclesAround1[i].listedOn,
          'price':vehiclesAround1[i].listingPrice,
          'latitude':vehiclesAround1[i].vehicleLocation.coordinates[0],
          'longitude':vehiclesAround1[i].vehicleLocation.coordinates[1]


        })

    }
    this.vehiclesAround=vehiclesA

    })
  }

reserveVehicle(index:number){
  let formattedstartDate=this.datePipe.transform(this.vehiclesAround[index].availablefrom,'MM/dd/yyyy:h:mm:a') 
  let formattedendDate=this.datePipe.transform(this.vehiclesAround[index].availableto, 'MM/dd/yyyy:h:mm:a')
  console.log(formattedstartDate)
  console.log(formattedendDate)
  let postUrl: string =  'http://34.122.10.135/api/schedule/find/reserve'
    let Body = {
    "listingId": this.vehiclesAround[index].listingid,
    "startDate": formattedstartDate,
    "endDate": formattedendDate
  
    }
    this.http.post(postUrl,Body,{headers : this.headers})
    .subscribe((data: any) => {
      console.log(data)
      alert("Reservation of vehicle successful");
    })
   this.vehiclesAround=[]


}
signout(){
  this.router.navigate(['/Login'])
}
calllender(){
  this.router.navigate(["carlender"])
}
}




class VehiclesAround{
   listingid:any;
   availablefrom:string;
   availableto:string;
   listedon:string;
   price:number;
   latitude:any;
   longitude:any

}
class UserReservations{
  price:number;
  status:string;
  startdate:string;
  enddate:string;
}