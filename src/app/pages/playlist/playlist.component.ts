import { ContextService } from 'src/app/services/context.service';
import { APIService } from 'src/app/API.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const SPOTIFY_API = 'https://api.spotify.com/v1/'

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist:any = {
    image: history.state.image,
    name: history.state.name
  }
  tracks:any = []
  headers:any = {'Authorization' : ''}
  accessToken: string | null = null
  openedTrack:any = {
    artist: '',
    title: '',
    lyrics: []
  }
  isLyricsLoading:any = {
    artist: '',
    title: '',
    status: false
  }
  constructor(private api:APIService, private router: Router, private context:ContextService,  private http: HttpClient) { }
  
  ngOnInit(): void {
    this.context.spotifyAccessToken.subscribe(r => this.accessToken = r)
    if(!history.state.tracks) {
      this.router.navigate(['/'])
    }else {
      if(this.accessToken) {
        this.headers.Authorization = `Bearer ${this.accessToken}` 
        history.state.tracks.forEach((t:any) => {
          this.http.get(SPOTIFY_API + 'tracks/' + t.id, {headers: this.headers})
          .subscribe((r:any) => {
            this.tracks.push({
              artist: r.artists[0].name,
              image: r.album.images[2].url,
              title: r.name,
              preview: r.preview_url
            })
          })
        })
      }
    }
  }
  
  showLyrics(artist:string, title:string) {
    this.isLyricsLoading.artist = artist
    this.isLyricsLoading.title = title
    this.isLyricsLoading.status = true
    this.api.GetLyrics(artist, title)
    .then(r => {
      this.isLyricsLoading.artist = ''
      this.isLyricsLoading.title = ''
      const lyricsArray = r.lyrics.split('\n')
      this.openedTrack.artist = artist,
      this.openedTrack.title = title,
      this.openedTrack.lyrics = lyricsArray
    })
    .catch(e => console.log(e))
  }
}
