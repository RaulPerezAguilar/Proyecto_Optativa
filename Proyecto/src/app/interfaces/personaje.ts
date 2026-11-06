// Contenido de: src/app/interfaces/personaje.ts

// Bandos posibles de un personaje (se usan también en el ion-select del formulario)
export type Bando = 'Vengadores' | 'Asgard' | 'Cuatro Fantásticos' | 'Villanos';

export const BANDOS: Bando[] = ['Vengadores', 'Asgard', 'Cuatro Fantásticos', 'Villanos'];

export interface Personaje {
  id: number;
  nombre: string;            // Nombre del personaje (Thor, Doctor Doom...)
  alias: string;             // Identidad o apodo (Dios del Trueno, Sam Wilson...)
  bando: Bando;
  poder: string;             // Habilidad principal
  descripcion: string;
  imagen: string;            // Ruta a la imagen dentro de src/assets
  favorito: boolean;         // Lo marca el usuario con el checkbox
  esVillano: boolean;        // Estilos dinámicos: cambia colores y bordes de la tarjeta
  primeraAparicion: Date;    // Se formatea con el DatePipe
}
