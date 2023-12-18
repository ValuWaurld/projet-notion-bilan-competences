import 'phaser';

export class MoralChoiceScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MoralChoiceScene' });
    }

    create() {
        this.add.text(100, 50, 'Scénario moral: Si vous voyez un collègue commettre une petite erreur sans conséquence, que faites-vous?', { color: '#000', fontSize: '20px' });

        // Ajouter des choix
        this.add.text(100, 100, 'Choix A: L\'ignorer', { color: '#0f0', fontSize: '18px' })
            .setInteractive()
            .on('pointerdown', () => this.handleChoice('A'));

        this.add.text(100, 150, 'Choix B: Le signaler au supérieur', { color: '#0f0', fontSize: '18px' })
            .setInteractive()
            .on('pointerdown', () => this.handleChoice('B'));
    }

    handleChoice(choice: string) {
        // Traiter le choix ici
        console.log(`Choix effectué: ${choice}`);
        // Passer à la scène suivante
        this.scene.start('EndScene');
    }
}
