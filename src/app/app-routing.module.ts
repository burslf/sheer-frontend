import { PlaylistComponent } from './pages/playlist/playlist.component';
import { AuthCloseAPIComponent } from './pages/auth-close-api/auth-close-api.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEarnerComponent } from './pages/new-earner/new-earner.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { EarnersComponent } from './pages/earners/earners.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'earners', component: EarnersComponent },
      { path: 'new-earner', component: NewEarnerComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'playlist/:id', component: PlaylistComponent },
      { path: 'authCloseAPI', component: AuthCloseAPIComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
