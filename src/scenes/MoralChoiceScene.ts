import 'phaser';
import { BaseScene } from './BaseScene';

export class MoralChoiceScene extends BaseScene {
    
    moralChoices: string[] | undefined;
    moralScenarios: { question: string; choices: string[]; }[];

    constructor() {
        super({ key: 'MoralChoiceScene' });
        this.moralScenarios = [
            {
                question: "Vous êtes en train de marcher dans la rue et vous voyez un homme qui semble avoir besoin d'aide. Que faites-vous?",
                choices: ["L'aider", "Ne pas l'aider"]
            },
            {
                question: "Vous avez vu un ami voler un objet dans un magasin. Que faites-vous?",
                choices: ["Le dénoncer", "Ne pas le dénoncer"]
            },
            // Ajoutez plus de scénarios ici
        ];
    }
    
    create() {
        // Sélectionner un scénario basé sur la logique de votre choix
        let selectedScenario = this.moralScenarios[0];
        this.add.text(100, 50, selectedScenario.question, { color: '#000', fontSize: '20px' });
    
        // Afficher les choix pour le scénario
        selectedScenario.choices.forEach((choice, index) => {
            this.add.text(100, 100 + index * 50, choice, { color: '#0f0', fontSize: '18px' })
                .setInteractive()
                .on('pointerdown', () => this.handleChoice(choice));
        });
    }
    
    handleChoice(choice: string) {
        if (!this.moralChoices) {
            this.moralChoices = [];
        }
        this.moralChoices.push(choice);
        console.log(`Choix effectué: ${choice}`);
        // Gérer le passage à la scène suivante ou à un autre scénario moral
        if (choice === 'L\'aider') {
            // Afficher une réaction positive ou un commentaire
        } else {
            // Afficher une réaction négative ou un commentaire
        }
    }
}
