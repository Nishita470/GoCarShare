import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']

})

// class service{

// }

export class LoginSignupComponent implements OnInit {
  public getJsonValue: any;
  public postJsonValue:any;
  constructor(private router: Router
     , private Apiservice: ApiserviceService,
     private http: HttpClient
    ) {

  }

  email: string;
  password: string;
  name:string;
  emailsignin:string;
  passwordsignin:string;
  jsonvalue:any;
  baseurl="http://34.122.10.135:80/api/auth/user/signIn?";
  url:string;
  idToken:any;

  ngOnInit(): void {
    document.querySelector('.img-btn')?.addEventListener('click', () => {
      document.querySelector('.cont')?.classList.toggle('s-signup');
      
     

    });
    
  }


  geturl(): string {
    return `http://authserver-z742wpzi3q-ue.a.run.app/api/auth/user/test`;
    
  }
  onKeySigninEmail($event:any)
  {
    this.emailsignin = $event.target.value;
    console.log(this.emailsignin)
  }
  onKeySigninPassword($event:any)
  {
    this.passwordsignin=$event.target.value;
    console.log(this.passwordsignin)
  }

  onKeyEmail($event: any){
    this.email = $event.target.value;
    console.log(this.email);
  
  }
  onKeyName($event:any){
    this.name=$event.target.value;
    console.log(this.name);
  }

  onKeyPassword($event: any){
    this.password = $event.target.value;
  }


  submit(){
    // alert(this.emailsignin);
    // alert(this.passwordsignin);
    this.url=this.baseurl + "emailId=" + this.emailsignin + "&password=" +this.passwordsignin;
    // alert(this.url);
    this.http.get(this.url)
  .subscribe((response) => {
    console.log(response);
    this.jsonvalue=response;
    this.idToken=this.jsonvalue.idToken;
    localStorage.setItem('idToken', this.idToken);
    this.router.navigate(["carrental"]);
   
  });
}


  signup(){
    const headerdict={
      contentType : 'application/json'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(
        headerdict
      ), 
    };
    // const header= new HttpHeaders({
    //   contentType : 'application/json'
    // })
    var  body = {
      "displayName" : "Hemanth",
      "emailId": "he"+new Date().getTime()+"@gmail.com",
      "password": "1234567"

    }

   
    
      fetch('http://34.122.10.135:80/api/auth/user/signUp', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body:
              JSON.stringify({
                  emailId: this.email,
                  password: this.password,
                  displayName: this.name
              })
      })
          .then(response => response.json())
          .then(data =>{
            console.log(data)
            alert("User successfully signed up!,You can now sign in ")
          } 
          )
          .catch(error => console.error(error));

    // this.http.post(this.baseUrl+'/api/auth/user/signUp',body,requestOptions).subscribe((data) => {
    // console.log(data)
    }
    
   
    

  }


  

