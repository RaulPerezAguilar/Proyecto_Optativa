// Contenido de: src/app/services/personajes.service.ts
// UT4: los datos ya no viven en HomePage, sino en este servicio compartido.

import { Injectable } from '@angular/core';
import { Bando, Personaje } from '../interfaces/personaje';

@Injectable({ providedIn: 'root' })
export class PersonajesService {

  // Privado: nadie puede modificar el array directamente, solo con los métodos públicos
  private personajes: Personaje[] = [
    {
      id: 1,
      nombre: 'Doctor Doom',
      alias: 'Victor von Doom',
      bando: 'Villanos',
      poder: 'Genio científico y hechicería',
      descripcion: 'Monarca de Latveria. Une una inteligencia científica fuera de lo común con las artes místicas y una armadura casi indestructible. Quiere imponer su propio orden al mundo, cueste lo que cueste.',
      imagen: 'assets/personajes/doom.svg',
      favorito: true,
      esVillano: true,
      primeraAparicion: new Date(1962, 6, 1),
    },
    {
      id: 2,
      nombre: 'Thor',
      alias: 'Dios del Trueno',
      bando: 'Asgard',
      poder: 'Control de las tormentas y fuerza divina',
      descripcion: 'Príncipe de Asgard y uno de los Vengadores originales. Domina el rayo y el trueno, y su fuerza lo sitúa entre los seres más poderosos del universo Marvel.',
      imagen: 'assets/personajes/thor.svg',
      favorito: true,
      esVillano: false,
      primeraAparicion: new Date(1962, 7, 1),
    },
    {
      id: 3,
      nombre: 'Capitán América',
      alias: 'Sam Wilson',
      bando: 'Vengadores',
      poder: 'Escudo de vibranio y alas de combate',
      descripcion: 'Antiguo Halcón, hereda el escudo y el título de Capitán América. Piloto experto y líder nato, combina vuelo táctico con el escudo más famoso del mundo.',
      imagen: 'assets/personajes/capitan-america.svg',
      favorito: false,
      esVillano: false,
      primeraAparicion: new Date(1969, 8, 1),
    },
    {
      id: 4,
      nombre: 'Loki',
      alias: 'Dios del Engaño',
      bando: 'Asgard',
      poder: 'Magia, ilusiones y cambio de forma',
      descripcion: 'Hermano adoptivo de Thor. Maestro de las ilusiones y la manipulación, es tan capaz de salvar el día como de traicionar a todos. Un aliado en el que nunca se puede confiar del todo.',
      imagen: 'assets/personajes/loki.svg',
      favorito: false,
      esVillano: false,
      primeraAparicion: new Date(1962, 9, 1),
    },
    {
      id: 5,
      nombre: 'Soldado de Invierno',
      alias: 'Bucky Barnes',
      bando: 'Vengadores',
      poder: 'Brazo biónico y entrenamiento de élite',
      descripcion: 'Compañero de armas del primer Capitán América. Tras décadas como asesino, lucha por redimirse con su brazo biónico y su puntería legendaria.',
      imagen: 'assets/personajes/soldado-invierno.svg',
      favorito: false,
      esVillano: false,
      primeraAparicion: new Date(1941, 2, 1),
    },
    {
      id: 6,
      nombre: 'Mister Fantástico',
      alias: 'Reed Richards',
      bando: 'Cuatro Fantásticos',
      poder: 'Elasticidad e intelecto científico',
      descripcion: 'Líder de los Cuatro Fantásticos y eterno rival de Doom. Puede estirar su cuerpo a voluntad, aunque su mayor arma es su mente.',
      imagen: 'assets/personajes/mister-fantastico.svg',
      favorito: false,
      esVillano: false,
      primeraAparicion: new Date(1961, 10, 1),
    },
    {
      id: 7,
      nombre: 'La Cosa',
      alias: 'Ben Grimm',
      bando: 'Cuatro Fantásticos',
      poder: 'Fuerza descomunal y piel de roca',
      descripcion: 'El músculo de los Cuatro Fantásticos. Su cuerpo de piedra aguanta casi cualquier golpe, y su humor aguanta casi cualquier situación. ¡Es la hora de la tortura!',
      imagen: 'assets/personajes/la-cosa.svg',
      favorito: true,
      esVillano: false,
      primeraAparicion: new Date(1961, 10, 1),
    },
    {
      id: 8,
      nombre: 'Ant-Man',
      alias: 'Scott Lang',
      bando: 'Vengadores',
      poder: 'Cambio de tamaño con partículas Pym',
      descripcion: 'Ladrón reformado que encoge hasta el tamaño de una hormiga o crece como un gigante. Experto en colarse donde nadie más puede.',
      imagen: 'assets/personajes/ant-man.svg',
      favorito: false,
      esVillano: false,
      primeraAparicion: new Date(1979, 2, 1),
    },
    {
      id: 9,
      nombre: 'Shang-Chi',
      alias: 'Maestro del Kung Fu',
      bando: 'Vengadores',
      poder: 'Artes marciales de nivel maestro',
      descripcion: 'Considerado el mejor artista marcial del universo Marvel. Su disciplina y su velocidad le permiten plantar cara a rivales con superpoderes.',
      imagen: 'assets/personajes/shang-chi.svg',
      favorito: false,
      esVillano: false,
      primeraAparicion: new Date(1973, 11, 1),
    },
  ];

  /** Devuelve una copia del array para proteger el original */
  getPersonajes(): Personaje[] {
    return [...this.personajes];
  }

  /** Busca un personaje por su id (devuelve undefined si no existe) */
  getPersonajePorId(id: number): Personaje | undefined {
    return this.personajes.find(p => p.id === id);
  }

  /** Crea un personaje nuevo y lo pone al principio de la lista */
  agregarPersonaje(nombre: string, alias: string, bando: Bando, poder: string): void {
    if (!nombre.trim()) {
      return;
    }

    const nuevo: Personaje = {
      id: Date.now(),
      nombre: nombre.trim(),
      alias: alias.trim() || 'Identidad desconocida',
      bando,
      poder: poder.trim() || 'Por descubrir',
      descripcion: 'Personaje reclutado por ti para la batalla contra Doom.',
      imagen: 'assets/personajes/desconocido.svg',
      favorito: false,
      esVillano: bando === 'Villanos',
      primeraAparicion: new Date(),
    };

    this.personajes.unshift(nuevo);
  }

  /** Marca o desmarca un personaje como favorito */
  alternarFavorito(id: number): void {
    const personaje = this.getPersonajePorId(id);
    if (personaje) {
      personaje.favorito = !personaje.favorito;
    }
  }

  /** Elimina un personaje por su id */
  eliminarPersonaje(id: number): void {
    this.personajes = this.personajes.filter(p => p.id !== id);
  }
}
