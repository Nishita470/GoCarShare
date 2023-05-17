import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ApiserviceService } from './apiservice.service';
import { HttpClientModule } from '@angular/common/http';
//import { CarrentalComponent } from './carrental/carrental.component';
// import { CarpoolComponent } from './carpool/carpool.component';
// import { CarlenderComponent } from './carlender/carlender.component';
// import { CarlendeeComponent } from './carlendee/carlendee.component';
// import { CarDropdownComponent } from './car-dropdown/car-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { CarrentalComponent } from './carrental/carrental.component';
import { CarpoolComponent } from './carpool/carpool.component';
import { CarlenderComponent } from './carlender/carlender.component';
import { CarlendeeComponent } from './carlendee/carlendee.component';
import { CarDropdownComponent } from './car-dropdown/car-dropdown.component';
import { AgmCoreModule } from '@agm/core';
import { MainComponent } from './main/main.component';
// import {GoogleMapsModule} from '@angular/google-maps'



@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    HomepageComponent,
    CarrentalComponent,
    CarrentalComponent,
    CarpoolComponent,
    CarlenderComponent,
    CarlendeeComponent,
    CarDropdownComponent,
    MainComponent,
    // CarpoolComponent,
    // CarlenderComponent,
    // CarlendeeComponent,
    // CarDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({
        apiKey:"AIzaSyAgyu6OyCQcnfBwizc9vbZ8zUF_ks1NR40"
    }

    ),
    // GoogleMapsModule
    
    
   
   
  ],
  providers: [ ApiserviceService ,
  DatePipe],
  bootstrap: [AppComponent,
               CarlenderComponent]
})
export class AppModule { }
