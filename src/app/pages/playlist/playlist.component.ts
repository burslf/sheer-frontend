import { ContextService } from 'src/app/services/context.service';
import { APIService } from 'src/app/API.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

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
  constructor(private api:APIService, private router: Router, private spotify:SpotifyService,  private http: HttpClient) { }
  
  ngOnInit(): void {
    if(!history.state.trackArray) {
      this.router.navigate(['/'])
    }else {
      if(this.spotify.bearer.getValue().length > 0) {
        history.state.trackArray.forEach((t:any) => {
          this.tracks.push({
              artist: t.artist,
              image: t.image,
              title: t.title,
              preview: 'fe'
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

  closeLyrics() {
    this.openedTrack.artist = '',
    this.openedTrack.title = '',
    this.openedTrack.lyrics = ''
  }
}
