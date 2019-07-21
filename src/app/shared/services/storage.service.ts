import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  public set(key: string, value: string): Promise<void> {
    return this.storage.set(key, value);
  }

  public get(key: string): Promise<string> {
    return this.storage.get(key);
  }

  public remove(key: string): Promise<void> {
    return this.storage.remove(key);
  }
}
