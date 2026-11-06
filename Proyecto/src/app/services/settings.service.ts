import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private storageListo: Promise<Storage>;

  constructor(private storage: Storage) {
    this.storageListo = this.storage.create();
  }

  async set(clave: string, valor: any) {
    const s = await this.storageListo;
    return s.set(clave, valor);
  }

  async get(clave: string) {
    const s = await this.storageListo;
    return s.get(clave); // devuelve null si no existe
  }
}