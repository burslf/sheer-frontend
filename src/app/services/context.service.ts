import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setMobile(value: boolean) {
    this.isMobile.next(value);
  }
}
