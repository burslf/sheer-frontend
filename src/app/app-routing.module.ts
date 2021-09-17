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
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthGuardService } from './services/auth-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'earners', component: EarnersComponent, canActivate: [AuthGuardService] },
      { path: 'new-earner', component: NewEarnerComponent, canActivate: [AuthGuardService] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
      { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuardService] },
      { path: 'playlist/:id', component: PlaylistComponent, canActivate: [AuthGuardService] },
      { path: 'authCloseAPI', component: AuthCloseAPIComponent },
      { path: 'auth-login', component: AuthLoginComponent },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
