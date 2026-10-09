// Contenido de: src/app/home/home.page.ts

// Imports básicos de Angular y Ionic
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';

// Imports de nuestra aplicación
import { Videojuegos } from '../interfaces/videojuegos'; // Nuestra interfaz de datos
import { TaskItemComponent } from '../components/task-item/task-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // Al ser un componente standalone, debemos importar aquí todo lo que usemos en la plantilla
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, // Componentes de Ionic
    TaskItemComponent, // Nuestro componente hijo
    CommonModule // El módulo para las directivas
  ],
})
export class HomePage {

  // Esta es la lista de datos que mostraremos en la vista.
  // Es un array de objetos que deben cumplir la estructura de la interfaz 'Tarea'.
  listaDeTareas: Videojuegos[] = [
    { id: 1, nombre: "Marvel Spider-man 2", genero: "Accion", plataforma: "PS5", completado: false },
    { id: 2, nombre: "The last of us Part II", genero: "Accion", plataforma: "PS5/PS4", completado: true },
    { id: 3, nombre: "Uncharted 4", genero: "Accion", plataforma: "PS4", completado: true }
  ];

  constructor() {}
}
