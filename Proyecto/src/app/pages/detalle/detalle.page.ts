// Contenido de: src/app/pages/detalle/detalle.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonImg, IonBadge, IonList, IonItem, IonLabel, IonIcon, IonButton,
  IonGrid, IonRow, IonCol, AlertController, ToastController
} from '@ionic/angular';

import { Personaje } from '../../interfaces/personaje';
import { PersonajesService } from '../../services/personajes.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule, HeaderComponent,
    IonHeader, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonImg, IonBadge, IonList, IonItem, IonLabel, IonIcon, IonButton,
    IonGrid, IonRow, IonCol
  ],
})
export class DetallePage implements OnInit {

  personaje: Personaje | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personajesService: PersonajesService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    // Leemos el :id de la URL (llega como texto, lo pasamos a número)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personaje = this.personajesService.getPersonajePorId(id);

    // Mejora 5: si el id no existe, volvemos a Home con un aviso
    if (!this.personaje) {
      this.mostrarToast('Elemento no encontrado', 'danger');
      this.router.navigate(['/home']);
    }
  }

  alternarFavorito() {
    if (this.personaje) {
      this.personajesService.alternarFavorito(this.personaje.id);
    }
  }

  // Mejora 4: confirmamos antes de borrar
  async confirmarEliminar() {
    if (!this.personaje) {
      return;
    }

    const alerta = await this.alertCtrl.create({
      header: 'Eliminar personaje',
      message: `¿Seguro que quieres eliminar a ${this.personaje.nombre}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.eliminar() },
      ],
    });
    await alerta.present();
  }

  // Mejora 2: borrar y volver a /home
  private async eliminar() {
    if (!this.personaje) {
      return;
    }
    const nombre = this.personaje.nombre;
    this.personajesService.eliminarPersonaje(this.personaje.id);
    await this.mostrarToast(`${nombre} ha caído ante Doom`, 'medium');
    this.router.navigate(['/home']);
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
}
