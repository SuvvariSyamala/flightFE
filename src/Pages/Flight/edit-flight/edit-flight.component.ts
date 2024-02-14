import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../models/flight';

@Component({
  selector: 'app-edit-flight',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './edit-flight.component.html',
  styleUrl: './edit-flight.component.css'
})
export class EditFlightComponent 
{
  flightNumber: number = 0;
  flight: Flight = new  Flight(); // Initialize flight here
  errMsg: string = '';
  isflightExist = true;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Route parameter fid is assigned to FlightNumber
    this.activateRoute.params.subscribe((p) => {
      this.flightNumber = p['fid'];
      this.search();
    });
  }

  search() {
    this.http
      .get<Flight>('http://localhost:5129/api/Book/GetBookById/' + this.flightNumber, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.flight = response;
          this.isflightExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid Flight Number';
          this.isflightExist = false;
        }
      });
  }

  edit() {
    this.http
      .put('http://localhost:5005/api/Flight/UpdateFlight', this.flight, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/admin-dashboard/getallflights');
      });
  }
}
