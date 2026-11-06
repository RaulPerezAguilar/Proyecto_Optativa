// Contenido de: src/app/components/personaje-card/personaje-card.component.ts
// Componente hijo: muestra un personaje en forma de tarjeta.

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonCheckbox, IonButton, IonBadge, IonIcon
} from '@ionic/angular';
import { Personaje } from '../../interfaces/personaje';

@Component({
  selector: 'app-personaje-card',
  templateUrl: './personaje-card.component.html',
  styleUrls: ['./personaje-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonCheckbox, IonButton, IonBadge, IonIcon
  ],
})
export class PersonajeCardComponent {

  // Mejora 4 (reto 2.6): el dato puede no llegar, por eso admite undefined
  @Input() personaje: Personaje | undefined;

  // Avisamos al padre (HomePage) cuando el usuario marca/desmarca favorito
  @Output() favoritoCambiado = new EventEmitter<number>();

  cambiarFavorito() {
    if (this.personaje) {
      this.favoritoCambiado.emit(this.personaje.id);
    }
  }
}
