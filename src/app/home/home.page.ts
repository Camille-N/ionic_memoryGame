import { SettingsService } from './../services/settings.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {


  // Initialisation des variables
  cardDeck = [];
  numberOfCards = 2;
  cardColumnSize = 4;
  timeToHide = 1000;
  isCardDisplayed = false;
  previousCard = null;
  foundPairs = 0;



  constructor(private settingsService: SettingsService) {
    // Initialisation du jeu
    this.generateDeck();
    this.shuffleCards();
  }

  ionViewDidEnter() {
    // Prise en compte des paramètres définis par l'utilisateur
    this.numberOfCards = this.settingsService.settings.numberOfCards;
    this.timeToHide = this.settingsService.settings.delay;
    this.cardColumnSize = this.settingsService.getColumnSize();

    // Nouvelle initialisation du jeu après modification des paramètres
    this.generateDeck();
    this.shuffleCards();
  }


  // Générer une liste de paires de cartes
  generateDeck() {
    // Effacer les cartes précédentes lorsque le jeu est régénéré
    this.cardDeck = [];

    for (let i = 0; i < this.numberOfCards; i++) {
      this.cardDeck.push({ image: i + '.png', revealed: false });
      this.cardDeck.push({ image: i + '.png', revealed: false });
    }
  }

  // Mélanger les cartes
  shuffleCards() {

    for (let pos in this.cardDeck) {
      // Stocker la carte en cours pour l'affecter ensuite à la nouvelle position
      let currentCard = this.cardDeck[pos];

      // Position aléatoire au sein du jeu de carte
      let randomPos = Math.floor(Math.random() * this.cardDeck.length);

      // Permuter la position
      this.cardDeck[pos] = this.cardDeck[randomPos];
      this.cardDeck[randomPos] = currentCard;

    }
  }



  pickCard(card) {

    if (!this.isCardDisplayed) {

      // Affichage de la carte
      card.revealed = true;
      this.isCardDisplayed = true;

      // Comparaison de la carte en cours avec la carte précédente
      // Si les deux cartes correspondent
      if (this.previousCard && this.previousCard.image === card.image) {
        // Afficher la carte précédente
        this.previousCard.revealed = true;
        this.isCardDisplayed = false;
        // Incrémentation du compteur
        this.foundPairs++;
      } else {
        // Masquer la carte après un certain délai
        setTimeout(() => {
          card.revealed = false;
          this.isCardDisplayed = false;
          this.previousCard = card;
        }, this.timeToHide);

      }
    }
  }

  // Réinitialisation du jeu
  playAgain() {
    this.foundPairs = 0;
    this.previousCard = null;
    this.shuffleCards();
    // Masquer l'ensemble des cartes
    this.cardDeck.map(
      (currentCard) => { currentCard.revealed = false; }
    );
  }
}
