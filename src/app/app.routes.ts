import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'contactUs', component: ContactUsComponent}
];
