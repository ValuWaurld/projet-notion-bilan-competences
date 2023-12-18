import 'phaser';

export class MoralChoiceScene extends Phaser.Scene {
    moralChoices: string[];

    constructor() {
        super({ key: 'MoralChoiceScene' });
        this.moralChoices = [];
    }
    
    create() {
        // Ajouter des scénarios moraux ici
        // Par exemple, un scénario différent peut être choisi aléatoirement ou basé sur les réponses précédentes
        this.add.text(100, 50, 'Scénario moral: [Insérez un scénario ici]', { color: '#000', fontSize: '20px' });
    
        // Ajouter des choix pour le scénario
        // ...
    }
    
    handleChoice(choice: string) {
        this.moralChoices.push(choice);
        console.log(`Choix effectué: ${choice}`);
        // Gérer le passage à la scène suivante ou à un autre scénario moral
    }
}
