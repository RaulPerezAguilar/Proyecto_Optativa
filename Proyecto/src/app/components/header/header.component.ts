// Contenido de: src/app/components/header/header.component.ts
// Componente de cabecera reutilizable (Mejora 2 del reto 2.6)

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonToolbar, IonTitle, IonButtons, IonButton, IonBackButton, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonToolbar, IonTitle, IonButtons, IonButton, IonBackButton, IonIcon],
})
export class HeaderComponent {
  @Input() titulo = '';
  @Input() subtitulo = '';
  @Input() mostrarAtras = false;    // Muestra el ion-back-button
  @Input() mostrarAjustes = false;  // Muestra el engranaje que lleva a /ajustes
}
