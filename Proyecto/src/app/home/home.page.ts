import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

import { Videojuegos } from '../interfaces/videojuegos';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonButton, IonButtons, IonIcon,
    TaskItemComponent, CommonModule, FormsModule, RouterLink
  ],
})
export class HomePage {

  listaDeTareas: Videojuegos[] = [
    { id: 1, nombre: "Marvel Spider-man 2", genero: "Accion", plataforma: "PS5", completado: false },
    { id: 2, nombre: "The last of us Part II", genero: "Accion", plataforma: "PS5/PS4", completado: true },
    { id: 3, nombre: "Uncharted 4", genero: "Accion", plataforma: "PS4", completado: true }
  ];

  constructor() {
    addIcons({ settingsOutline });
  }
}