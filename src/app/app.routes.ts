import { Routes } from '@angular/router';
import { AdmindashboardComponent } from '../Pages/User/admindashboard/admindashboard.component';
import { LoginComponent } from '../Pages/User/login/login.component';
import { LogoutComponent } from '../Pages/User/logout/logout.component';
import { RegisterComponent } from '../Pages/User/register/register.component';
import { UserdashboardComponent } from '../Pages/User/userdashboard/userdashboard.component';
import { GetAllComponent } from '../Pages/Flight/get-all/get-all.component';
import { EditFlightComponent } from '../Pages/Flight/edit-flight/edit-flight.component';
import { AddFlightComponent } from '../Pages/Flight/add-flight/add-flight.component';


export const routes: Routes = [
    {path: 'user-dashboard',component:UserdashboardComponent,
    children:[
        {path:'get-all-flights',component:GetAllComponent},
       // {path:'get-flight-by-id',component:G},
       
        {path:'edit-flight',component:EditFlightComponent},
        { path: 'logout', component: LogoutComponent }
        ]},
    {path:'admin-dashboard',component:AdmindashboardComponent,
    children:[
        {path:'add-flight',component:AddFlightComponent},
      
        {path:'edit-flight/:id',component:EditFlightComponent},
        {path:'get-all-books',component:GetAllComponent},
        //{path:'get-book-by-id',component:GetBookByIdComponent},
        
        { path: 'logout', component:LogoutComponent }
    ]},
    {path:'',component:RegisterComponent},
    {path:'login',component:LoginComponent},
];
