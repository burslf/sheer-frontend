import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APIService } from 'src/app/API.service';
import { ContextService } from 'src/app/services/context.service';

const SPOTIFY_API = 'https://api.spotify.com/v1/'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'app-home' },
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  code: string | null = this.cookie.get('code');
  accessToken: string | null = null
  spotifyConnect!: boolean;
  interval:any;
  playlists!:[any]
  user!:any
  headers:any = {'Authorization' : ''}
  constructor(private api: APIService, private cookie: CookieService, private context: ContextService, private http: HttpClient) {}

  ngOnInit(): void {
    this.context.spotifyConnect.subscribe(r => this.spotifyConnect = r)
    this.context.spotifyAccessToken.subscribe(r => this.accessToken = r)
    if(this.accessToken) {
      this.headers.Authorization = `Bearer ${this.accessToken}` 
      this.fetchData()
      
    }
  }

  connectSpotify() {
    this.api
      .GetSpotifyAuth()
      .then((r) => {
        window.open(r.auth_endpoint, 'newwindow', 'width=300,height=400');
        this.interval = setInterval(() => {
          console.log('entered')
          const token = this.cookie.get('access_token')
          if(token) {
            this.context.setSpotify(true, token)
            this.headers.Authorization = `Bearer ${token}`
            this.fetchData()
            clearInterval(this.interval)
          }
        }, 300)
      })
      .catch((e) => console.log(e));
  }

  showContext() {
    console.log(this.accessToken)
    console.log(this.spotifyConnect)
  }

  goToPlaylist(id: string) {
    this.http.get<any>(SPOTIFY_API + 'playlists/' + id, {headers: this.headers})
    .subscribe(r => {
      console.log(r.tracks.items)
    })
  }

  fetchData() {
    this.http.get(SPOTIFY_API + 'me', {headers: this.headers})
    .subscribe(r => {
      console.log(r)
      this.user = r
    })
    this.http.get<any>(SPOTIFY_API + 'me/playlists', {headers: this.headers})
    .subscribe(r => {
      console.log(r.items)
      this.playlists = r.items
    })
  }
}
