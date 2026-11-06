import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { SettingsService } from './services/settings.service';

// 3.6: registramos aquí todos los iconos que usa la app
import { addIcons } from 'ionicons';
import {
  trash, create, settingsOutline, addCircle, flash, calendar, shield,
  star, moon, personCircle, save
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private settingsService: SettingsService) {
    addIcons({
      trash, create, settingsOutline, addCircle, flash, calendar, shield,
      star, moon, personCircle, save
    });
  }

  async ngOnInit() {
    await this.cargarPreferencias();
  }

  // 4.12: aplicamos el modo oscuro guardado nada más abrir la app
  async cargarPreferencias() {
    const modoOscuro = await this.settingsService.get('modo_oscuro');
    if (modoOscuro) {
      document.body.classList.add('dark');
    }
  }
}
