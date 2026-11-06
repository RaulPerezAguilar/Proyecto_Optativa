import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { SettingsService } from './services/settings.service';
import { addIcons } from 'ionicons';
import { trash, create } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private settingsService: SettingsService) {}

  addIcons() {
    addIcons({
      trash,
      create
    });
  }

  async ngOnInit() {
    this.addIcons();
    await this.cargarPreferencias();
  }

  async cargarPreferencias() {
    const modoOscuro = await this.settingsService.get('modo_oscuro');
    if (modoOscuro) {
      document.body.classList.add('dark');
    }
  }
}