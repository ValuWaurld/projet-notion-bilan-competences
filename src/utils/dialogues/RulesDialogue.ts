import { narratorSpeaker } from "../Speakers";
import Dialogue from "../structures/Dialogue";
import DialogueChoice from "../structures/DialogueChoice";
import DialogueElement from "../structures/DialogueElement";
import DialoguePerson from "../structures/DialoguePerson";

const rulesDialogues = [
    "Très bien. Voici les règles du jeu :",
    "Le but est de trouver quelle personne correspond à la description donnée.",
    "Pour se faire, vous disposez en bas à gauche et à droite les CV des candidats.",
    "Si vous voulez voir le CV d'un candidat, il vous suffit de passer votre souris dessus.",
    "À la fin de la partie, vous pourrez choisir le candidat qui vous semble le plus approprié.",
];

export function getRulesDialogue() {
    return new Dialogue()
        .addElements(
            ...rulesDialogues.map((rule: string) => {
                return new DialogueElement()
                    .setPeople(
                        new DialoguePerson()
                            .setSpeaker(narratorSpeaker)
                            .setSpeech(rule)
                    );
            })
        );
}