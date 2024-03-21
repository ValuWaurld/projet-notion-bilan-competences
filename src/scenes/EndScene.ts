import 'phaser';
import { BaseScene } from './BaseScene';

export class EndScene extends BaseScene {
    
    constructor() {
        super({ key: 'EndScene' });
    }

    determineJob(cvData: any, interviewResponses: any, moralChoices: any) {
        // Logique pour analyser les réponses et les choix moraux
        // Par exemple, si certaines réponses ou choix moraux correspondent à un métier spécifique, suggérez ce métier
        // Cette partie nécessite une logique personnalisée en fonction de vos critères de sélection de métier
        return 'Métier suggéré en fonction de l\'analyse'; // Exemple
    }    
    
    create(data: { cvData: any; interviewResponses: any; moralChoices: any; }) {
        let suggestedJob = this.determineJob(data.cvData, data.interviewResponses, data.moralChoices);
        this.add.text(100, 150, `Métier suggéré: ${suggestedJob}`, { color: '#000', fontSize: '20px' });
        let jobImage = this.add.sprite(200, 200, 'jobImage');
    }
}