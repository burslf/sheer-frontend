import { ContextService } from 'src/app/services/context.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewEarnerComponent } from './pages/new-earner/new-earner.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavService } from './services/sidenav.service';
import { EarnersComponent } from './pages/earners/earners.component';
import { AuthCloseAPIComponent } from './pages/auth-close-api/auth-close-api.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthGuardService } from './services/auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    SidenavComponent,
    ToolbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NewEarnerComponent,
    ProfileComponent,
    EarnersComponent,
    AuthCloseAPIComponent,
    PlaylistComponent,
    PlaylistsComponent,
    AuthLoginComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AmplifyUIAngularModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [SidenavService, ContextService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
