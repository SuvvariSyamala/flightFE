import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../models/flight';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './get-all.component.html',
  styleUrl: './get-all.component.css'
})
export class GetAllComponent
{
  flights:Flight[]=[];
  flightNumber?:number;
  airlineName?:string='';
  Role?:string;
  isEligible: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router)
  {}
    ngOnInit(): void {
    this.getallflights();
    this.Role = localStorage.getItem('Role') ?? "Guest";
    this.isEligible = this.Role == "Admin" ?? false

    }
  
  getallflights(){
    this.http.get<Flight[]>('http://localhost:5005/api/Flight/GetAllFlights',this.httpOptions).subscribe((response) =>{
      this.flights=response;
      console.log(this.flights);
       this.router.navigate(['/adminDashboard/getallflights'], { skipLocationChange: true });
      // this.router.navigate(['/userDashboard/getallbooks'], { skipLocationChange: true });
  
  
    });
  }
  searchFlightByName() {
    this.http.get<Flight[]>(`http://localhost:5005/api/Flight/GetFlightByName?search=${this.airlineName }`)
      .subscribe(
        (response) => {
          if (response.length > 0) {
            this.flights = response;
          } else {
            alert('No flights found for the given airlineName.');
          }
        },
        (error) => {
          console.error('Error fetching posts:', error);
          alert('No results');
        }
      );
  }
  
  delete(flightNumber:any) {
   this.flightNumber=flightNumber;
    this.http
      .delete('http://localhost:5005/api/Flight/DeleteFlight/' + this.flightNumber,this.httpOptions)
     
        .subscribe((response) => {
          console.log(response);
          this.getallflights();
          this.router.navigate(['/adminDashboard/get-all-flights'], { skipLocationChange: true });
          location.reload();

  
        });
  }
  
  edit(flightNumber: any) {
    this.router.navigateByUrl('/admin-dashboard/edit-flight/' + flightNumber);
  }
  view(flightNumber: any) {
    this.router.navigateByUrl('/admin-dashboard/get-flight-by-id/' + flightNumber);
  }

}
