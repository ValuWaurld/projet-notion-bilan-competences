import 'phaser';

export class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    create(data: { cvData: any; interviewResponses: any; }) {
        this.add.text(100, 100, 'Fin de l\'entretien', { color: '#000', fontSize: '24px' });
    
        // Utiliser data.cvData et data.interviewResponses pour déterminer le métier suggéré
        let suggestedJob = this.determineJob(data.cvData, data.interviewResponses);
        this.add.text(100, 150, `Métier suggéré: ${suggestedJob}`, { color: '#000', fontSize: '20px' });
    }
    
    determineJob(cvData: any, interviewResponses: any) {
        // Logique pour déterminer le métier suggéré
        return 'Développeur'; // Exemple de métier
    }
}