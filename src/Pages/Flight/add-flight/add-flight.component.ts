import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Flight } from '../../../models/flight';


@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent 
{
  flight: Flight = new Flight(); 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router)
  {
    this.flight=new Flight();
  }
  addflight() {
    console.log(this.flight);
    const userRole = localStorage.getItem("userRole") ?? "Guest";
    this.flight.userId = parseInt(localStorage.getItem("userId")??"0");
    //this.flight.PublishedDate = new Date();
    this.http
    .post('http://localhost:5005/api/Flight/AddFlight', this.flight,this.httpOptions 
      )
    .subscribe((response) => {
      console.log(response);
    });
  }
}
