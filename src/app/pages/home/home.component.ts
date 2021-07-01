import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APIService } from 'src/app/API.service';
import { ContextService } from 'src/app/services/context.service';
import { environment } from '../../../environments/environment';
import { SpotifyService } from 'src/app/services/spotify.service';

const SPOTIFY_API = 'https://api.spotify.com/v1/';
const redirectUri = environment.api!;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'app-home' },
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  code: string | null = this.cookie.get('code');
  accessToken: string | null = null;
  spotifyConnect!: boolean;
  interval: any;
  playlists!: any[];
  user!: any;
  headers: any = { Authorization: '' };
  constructor(
    private api: APIService,
    private spotify: SpotifyService,
    private router: Router,
    private cookie: CookieService,
    private context: ContextService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.context.spotifyConnect.subscribe((r) => (this.spotifyConnect = r));
    this.context.spotifyAccessToken.subscribe((r) => (this.accessToken = r));
    if (this.accessToken) {
      this.spotify.setBearerAuth(`Bearer ${this.accessToken}`);
      this.fetchData();
    }
  }

  connectSpotify() {
    this.api
      .GetSpotifyAuth(redirectUri)
      .then((r) => {
        window.open(r.auth_endpoint, 'newwindow', 'width=300,height=400');
        this.interval = setInterval(() => {
          console.log('entered');
          const token = this.cookie.get('access_token');
          if (token) {
            this.context.setSpotify(true, token);
            this.headers.Authorization = `Bearer ${token}`;
            this.fetchData();
            clearInterval(this.interval);
          }
        }, 300);
      })
      .catch((e) => console.log(e));
  }

  showContext() {
    console.log(this.accessToken);
    console.log(this.spotifyConnect);
  }

  fetchData() {
    this.spotify.getUserInfos().subscribe((u) => {
      this.user = u;
    });

    this.spotify.getPlaylists().subscribe((p: any) => {
      this.playlists = p.items;
    });
  }

  getSongsFromPlaylist(id: string, name: string, image: string) {
    this.spotify.getPlaylistById(id).subscribe((r) => {
      const trackArray = this.getTracksArray(r.tracks.items)
      console.log(trackArray)
      this.router.navigate(['playlist/' + id], {
        state: { trackArray, name, image },
      });
    });
  }

  getTracksArray(trackInPlaylist: []) {
    const tracks: any[] = [];
    trackInPlaylist.forEach((t: any) => {
      if (t.track.artists.length > 0) {
        tracks.push({
          id: t.track.id,
          artist: t.track.artists[0].name,
          title: t.track.name,
        });
      }
    })
    return tracks
  }
}
