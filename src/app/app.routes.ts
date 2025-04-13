import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ServicesbycategoryComponent } from './Pages/servicesbycategory/servicesbycategory.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'services/:id', component: ServicesbycategoryComponent},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'contactUs', component: ContactUsComponent}
];
