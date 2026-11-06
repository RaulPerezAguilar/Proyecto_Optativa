// Contenido de: src/app/pages/ajustes/ajustes.page.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonItem,
  IonLabel, IonToggle, IonInput, IonButton, IonIcon, ToastController
} from '@ionic/angular';

import { SettingsService } from '../../services/settings.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    FormsModule, HeaderComponent,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonListHeader, IonItem, IonLabel, IonToggle, IonInput, IonButton, IonIcon
  ]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private settingsService: SettingsService,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    // Cargamos los valores guardados (null la primera vez)
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.nombreUsuario = await this.settingsService.get('nombre_usuario') || '';
    this.aplicarTema(this.modoOscuro);
    this.cdr.markForCheck();
  }

  async cambiarModoOscuro() {
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    this.aplicarTema(this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    // Añadimos o quitamos la clase 'dark' del body (ver theme/variables.scss)
    document.body.classList.toggle('dark', esOscuro);
  }

  // Mejora 1 (reto 4.13): guardar el nombre para el saludo de Home
  async guardarNombre() {
    await this.settingsService.set('nombre_usuario', this.nombreUsuario.trim());

    const toast = await this.toastCtrl.create({
      message: this.nombreUsuario.trim()
        ? `Nombre guardado. ¡Bienvenido, ${this.nombreUsuario.trim()}!`
        : 'Nombre borrado',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
