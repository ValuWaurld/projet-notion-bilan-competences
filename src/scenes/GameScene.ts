import 'phaser';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
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