import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { APIService } from '../API.service';

const SPOTIFY_API = 'https://api.spotify.com/v1/';
const redirectUri = environment.api!;

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  bearer: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get headers() {
    return {
      Authorization: this.bearer.getValue(),
    };
  }

  constructor(private api: APIService, private http: HttpClient) {}

  getUserInfos() {
    return this.http.get(SPOTIFY_API + 'me', { 
      headers: this.headers 
    });
  }

  getPlaylists() {
    return this.http.get(SPOTIFY_API + 'me/playlists', {
      headers: this.headers,
    });
  }

  getPlaylistById(id: string) {
    return this.http.get<any>(SPOTIFY_API + 'playlists/' + id, {
      headers: this.headers,
    });
  }

  setBearerAuth(token: string) {
    this.bearer.next(token);
  }
}
