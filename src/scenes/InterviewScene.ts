import 'phaser';

export class InterviewScene extends Phaser.Scene {
    currentQuestionIndex: number;
    questions: { text: string; responses: string[]; }[];
    cvData: any;
    interviewResponses: any;
    constructor() {
        super({ key: 'InterviewScene' });
        this.interviewResponses = [];
        this.currentQuestionIndex = 0;
        this.questions = [
            { text: "Pourquoi voulez-vous ce travail?", responses: ["Réponse A", "Réponse B"] },
            // Ajoutez plus de questions ici
        ];
    }
    
    create(data: any) {
        // Ajouter des avatars pour les personnes interrogées
        let avatar1 = this.add.sprite(100, 100, 'avatar1');
        let avatar2 = this.add.sprite(300, 100, 'avatar2');
        this.showQuestion();
        this.cvData = data;
        this.showQuestion();
    }
    
    showQuestion() {
        let question = this.questions[this.currentQuestionIndex];
        this.add.text(100, 50, question.text, { color: '#000', fontSize: '20px' });
    
        // Afficher les réponses
        question.responses.forEach((response, index) => {
            this.add.text(100, 100 + index * 50, response, { color: '#0f0', fontSize: '18px' })
                .setInteractive()
                .on('pointerdown', () => this.handleResponse(response));
        });
    }
    
    handleResponse(response: string) {
        this.interviewResponses.push(response);
        console.log(`Réponse choisie: ${response}`);
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.clearQuestion();
            this.showQuestion(); // Afficher la prochaine question
        } else {
            this.scene.start('MoralChoiceScene', { cvData: this.cvData, interviewResponses: this.interviewResponses });
        }
    }
    
    clearQuestion() {
        this.children.removeAll(); // Effacer la question et les réponses actuelles
    }
}
