import 'phaser';
import { BaseScene } from './BaseScene';

export class GameScene extends BaseScene {
    
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // ... Code existant pour afficher les textes des CV
        let cvSprite1 = this.add.sprite(100, 200, 'cv1').setInteractive();
        cvSprite1.on('pointerdown', () => {
            // Afficher les détails du CV 1
        });

        let cvSprite2 = this.add.sprite(300, 200, 'cv2').setInteractive();
        cvSprite2.on('pointerdown', () => {
            // Afficher les détails du CV 2
        });

        // Afficher les CV
        this.add.text(100, 150, 'CV de Personne 1', { color: '#000', fontSize: '20px' });
        this.add.text(100, 300, 'CV de Personne 2', { color: '#000', fontSize: '20px' });
    
        // Ajouter un bouton pour passer à l'entretien
        let startButton = this.add.text(400, 500, 'Commencer l\'entretien', { color: '#0f0', fontSize: '24px' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.startInterview());
    }
    
    startInterview() {
        // Passer des données aux scènes suivantes, comme les CVs ou les réponses sélectionnées
        const interviewData = {
            cv1: 'Informations CV 1',
            cv2: 'Informations CV 2'
        };
        this.scene.start('InterviewScene', interviewData);
    }
    
}