import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { ServicesbycategoryComponent } from './Pages/servicesbycategory/servicesbycategory.component';
import { ServiceDetailComponent } from './Pages/service-detail/service-detail.component';
import { LoginComponent } from './Pages/login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'services/:id', component: ServicesbycategoryComponent},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'serviceDetail/:id', component: ServiceDetailComponent},
    {path: 'login', component: LoginComponent}
];
