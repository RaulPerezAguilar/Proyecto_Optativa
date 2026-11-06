// Contenido de: src/app/home/home.page.ts

import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonButton, IonIcon, IonList, IonListHeader, IonItem, IonLabel, IonInput,
  IonSelect, IonSelectOption, IonCard, IonCardHeader, IonSkeletonText, IonAvatar,
  AlertController, ToastController, AnimationController
} from '@ionic/angular';

import { Bando, BANDOS, Personaje } from '../interfaces/personaje';
import { PersonajesService } from '../services/personajes.service';
import { SettingsService } from '../services/settings.service';
import { PersonajeCardComponent } from '../components/personaje-card/personaje-card.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonButton, IonIcon, IonList, IonListHeader, IonItem, IonLabel, IonInput,
    IonSelect, IonSelectOption, IonCard, IonCardHeader, IonSkeletonText, IonAvatar,
    PersonajeCardComponent, HeaderComponent
  ],
})
export class HomePage implements OnInit {

  personajes: Personaje[] = [];
  nombreUsuario = '';
  cargando = true;       // Mientras es true se ven los skeletons

  // Campos del formulario enlazados con [(ngModel)]
  nuevoNombre = '';
  nuevoAlias = '';
  nuevoPoder = '';
  nuevoBando: Bando = 'Vengadores';
  bandos = BANDOS;

  // Referencia a la rejilla para animarla
  @ViewChild('rejilla', { read: ElementRef }) rejilla?: ElementRef;

  constructor(
    private personajesService: PersonajesService,
    private settingsService: SettingsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private animationCtrl: AnimationController,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Simulamos una carga de 2 segundos para enseñar los skeletons
    setTimeout(() => {
      this.cargando = false;
      this.cdr.markForCheck();
      setTimeout(() => this.animarEntrada(), 50);
    }, 2000);
  }

  // Ionic llama a este método cada vez que se vuelve a esta página
  // (por ejemplo, después de borrar un personaje o cambiar el nombre en Ajustes)
  async ionViewWillEnter() {
    this.cargarPersonajes();
    this.nombreUsuario = (await this.settingsService.get('nombre_usuario')) || '';
    this.cdr.markForCheck();
  }

  cargarPersonajes() {
    this.personajes = this.personajesService.getPersonajes();
  }

  get totalFavoritos(): number {
    return this.personajes.filter(p => p.favorito).length;
  }

  cambiarFavorito(id: number) {
    this.personajesService.alternarFavorito(id);
    this.cargarPersonajes();
  }

  // Botón Guardar: primero pide confirmación con un ion-alert
  async guardarPersonaje() {
    if (!this.nuevoNombre.trim()) {
      await this.mostrarToast('Escribe al menos el nombre del personaje', 'warning');
      return;
    }

    const alerta = await this.alertCtrl.create({
      header: 'Reclutar personaje',
      message: `¿Quieres añadir a ${this.nuevoNombre} al bando ${this.nuevoBando}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aceptar', handler: () => this.confirmarGuardado() },
      ],
    });
    await alerta.present();
  }

  // Solo se ejecuta si el usuario pulsa "Aceptar"
  private async confirmarGuardado() {
    this.personajesService.agregarPersonaje(this.nuevoNombre, this.nuevoAlias, this.nuevoBando, this.nuevoPoder);
    const nombre = this.nuevoNombre;

    this.nuevoNombre = '';
    this.nuevoAlias = '';
    this.nuevoPoder = '';
    this.nuevoBando = 'Vengadores';
    this.cargarPersonajes();
    this.cdr.markForCheck();

    await this.mostrarToast(`${nombre} se ha unido a la batalla`, 'success');
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  // AnimationController: la rejilla entra con fundido y deslizamiento
  private animarEntrada() {
    if (!this.rejilla) {
      return;
    }
    this.animationCtrl
      .create()
      .addElement(this.rejilla.nativeElement)
      .duration(700)
      .easing('ease-out')
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(30px)', 'translateY(0)')
      .play();
  }
}
