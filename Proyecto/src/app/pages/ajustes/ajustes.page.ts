import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonToggle, IonButtons, IonBackButton } from '@ionic/angular';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton,
    IonList, IonListHeader, IonItem, IonLabel, IonToggle,
    FormsModule
  ]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false;

  constructor(private settingsService: SettingsService) { }

  async ngOnInit() {
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    this.aplicarTema(this.modoOscuro);
  }

  async cambiarModoOscuro() {
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    this.aplicarTema(this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    document.body.classList.toggle('dark', esOscuro);
  }
}