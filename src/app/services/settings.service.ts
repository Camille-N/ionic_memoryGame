import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Valeurs par défaut des paramètres d'affichage
  settings = {
    numberOfCards: 6,
    delay: 1000,
    colNumber: 3
  }


  // Taille d'affichage en fonction du nombre de colonnes
  getColumnSize(){
    return 12/this.settings.colNumber;
  }

  constructor() { }
}
