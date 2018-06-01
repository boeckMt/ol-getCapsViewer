import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

interface IAppStore {
  alert: any;
  loading: boolean;
  caps: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private store: BehaviorSubject<IAppStore>;
  public store$: Observable<IAppStore>;
  constructor() {
    this.store = new BehaviorSubject<IAppStore>({
      loading: false,
      alert: false,
      caps: null
    })
    this.store$ = this.store.asObservable();
  }

  publishToStore(data: IAppStore) {
    this.store.next((data));
  }
  getStoreData() {
    return this.store.getValue();
  }
}

