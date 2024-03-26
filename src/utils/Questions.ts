import Dialogue from "./structures/Dialogue";
import {KhaledEmotions, ValentinEmotions} from "../scenes/TitleScene";

export interface Answer {
  value: string;
  correct: boolean;
  khaledResponse: string;
  khaledEmotion: KhaledEmotions;
  valentinResponse: string;
  valentinEmotion: ValentinEmotions;
}

export interface AnswerWithDialogue extends Answer {
  dialogue: Dialogue;
  gameSceneName: string;
}

export interface Question {
  question: string;
  answers: Answer[];
  khaledEmotion: KhaledEmotions;
  valentinEmotion: ValentinEmotions;
}

export const questions: Question[] = [
  {
    question: "Qui est plus enclin à travailler en équipe ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: true,
        khaledResponse: "Absolument, je trouve que le travail d'équipe est essentiel pour réussir dans notre domaine. J'aime collaborer et échanger des idées avec mes collègues.",
        khaledEmotion: "wink",
        valentinResponse: "Hmm, pas vraiment mon truc. Je suis plus efficace quand je peux me concentrer seul sur une tâche.",
        valentinEmotion: "happy"
      },
      {
        value: "Valentin",
        correct: false,
        khaledResponse: "Ah non, moi je suis tout à fait partant pour travailler en équipe. C'est enrichissant et ça permet d'avancer plus vite !",
        khaledEmotion: "sad",
        valentinResponse: "Travailler en équipe peut être utile dans certains cas, mais je préfère généralement travailler de manière autonome.",
        valentinEmotion: "sweat"
      }
    ]
  },
  {
    question: "Qui est le plus passionné par les dernières avancées technologiques ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: false,
        khaledResponse: "Pas vraiment, je suis plutôt pragmatique. Tant que ça fonctionne et que ça répond aux besoins, je ne suis pas obsédé par les dernières nouveautés technologiques.",
        khaledEmotion: "sad",
        valentinResponse: "C'est clair, Khaled est plus terre-à-terre que moi sur ce sujet. Moi, j'aime explorer toutes les possibilités offertes par les nouvelles technologies.",
        valentinEmotion: "sweat"
      },
      {
        value: "Valentin",
        correct: true,
        khaledResponse: "Oui, Valentin est vraiment à fond dans les nouvelles technologies. Moi, tant que ça marche et que ça fait le job, ça me va !",
        khaledEmotion: "wink",
        valentinResponse: "Ah ça, c'est moi sans aucun doute ! Je suis toujours à l'affût des dernières innovations, c'est ce qui me motive dans ce métier.",
        valentinEmotion: "happy"
      }
    ]
  },
  {
    question: "Qui est plus ponctuel et déteste être en retard ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: true,
        khaledResponse: "Exactement, je considère que le temps des autres est précieux. Être en retard, c'est manquer de respect envers les autres et compromettre la productivité.",
        khaledEmotion: "wink",
        valentinResponse: "Oui, Khaled est vraiment rigoureux là-dessus. Moi, je suis un peu plus... flexible sur les horaires.",
        valentinEmotion: "happy"
      },
      {
        value: "Valentin",
        correct: false,
        khaledResponse: "Ah non, moi je suis toujours en avance. Être ponctuel, c'est primordial dans notre métier, ça montre qu'on est sérieux et fiable.",
        khaledEmotion: "sad",
        valentinResponse: "Eh bien, ce n'est pas moi c'est sûr ! Je suis plus du genre à arriver pile à l'heure, voire légèrement en retard.",
        valentinEmotion: "sweat"
      }
    ]
  },
  {
    question: "Qui déteste rédiger de longs documents ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: false,
        khaledResponse: "Pas du tout, j'ai aucun problème à rédiger de la documentation si c'est nécessaire. Mais Valentin, lui, évite ça comme la peste !",
        khaledEmotion: "sad",
        valentinResponse: "C'est vrai, Khaled est beaucoup plus à l'aise que moi pour ce genre de tâches. Moi, je préfère me concentrer sur le développement.",
        valentinEmotion: "sweat"
      },
      {
        value: "Valentin",
        correct: true,
        khaledResponse: "Oui, Valentin déteste ça. Moi, ça ne me dérange pas tant que ça, mais bon, je préfère quand même coder !",
        khaledEmotion: "wink",
        valentinResponse: "Ah ça, c'est clairement moi ! Je préfère de loin coder plutôt que passer des heures à écrire de la documentation.",
        valentinEmotion: "happy"
      }
    ]
  },
  {
    question: "Qui est le moins tolérant envers ceux qui ne font pas leur part du travail ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: true,
        khaledResponse: "Oh ça, c'est moi à 100% ! Rien ne m'agace plus que de devoir compenser le manque d'implication de certains. On est une équipe, tout le monde doit contribuer !",
        khaledEmotion: "wink",
        valentinResponse: "Effectivement, Khaled a du mal à supporter ça. Pour ma part, je suis un peu plus patient, mais bon, il y a des limites !",
        valentinEmotion: "happy"
      },
      {
        value: "Valentin",
        correct: false,
        khaledResponse: "Pas du tout, moi ça m'agace vraiment quand je vois des gens ne rien faire alors que tout le monde bosse. Valentin est plus tolérant que moi sur ce point.",
        khaledEmotion: "sad",
        valentinResponse: "Hmm, ce n'est pas vraiment mon genre de m'énerver contre les autres. Khaled, lui, est beaucoup plus direct là-dessus.",
        valentinEmotion: "sweat"
      }
    ]
  },
  {
    question: "Qui est le plus à l'aise avec les concepts mathématiques complexes ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: false,
        khaledResponse: "Pas vraiment, les maths complexes, ce n'est pas mon truc. Valentin, par contre, il excelle là-dedans.",
        khaledEmotion: "sad",
        valentinResponse: "Effectivement, Khaled préfère se concentrer sur d'autres aspects du développement. Les maths, c'est plutôt mon domaine de prédilection.",
        valentinEmotion: "sweat"
      },
      {
        value: "Valentin",
        correct: true,
        khaledResponse: "Oui, Valentin est vraiment fort en maths. Moi, je me débrouille, mais ce n'est pas mon point fort.",
        khaledEmotion: "wink",
        valentinResponse: "Oh ça, c'est moi ! Les maths, c'est un peu ma passion. J'adore résoudre des problèmes complexes et optimiser des algorithmes.",
        valentinEmotion: "happy"
      }
    ]
  },
  {
    question: "Qui préfère sortir et discuter après le travail ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: true,
        khaledResponse: "Ah ça, c'est moi tout craché ! Rien de tel qu'un bon moment de détente entre collègues pour décompresser et renforcer les liens.",
        khaledEmotion: "wink",
        valentinResponse: "Oui, Khaled est toujours partant pour ça. Moi, je préfère parfois rentrer chez moi et me détendre tranquillement.",
        valentinEmotion: "happy"
      },
      {
        value: "Valentin",
        correct: false,
        khaledResponse: "Ah non, c'est moi qui adore sortir et discuter après le boulot. Valentin est plutôt du genre à préférer sa tranquillité.",
        khaledEmotion: "sad",
        valentinResponse: "Ce n'est pas vraiment mon truc de sortir après le travail. Khaled, lui, est beaucoup plus sociable sur ce point.",
        valentinEmotion: "sweat"
      }
    ]
  },
  {
    question: "Qui accorde plus d'importance à une bonne nuit de sommeil ?",
    khaledEmotion: "smirk",
    valentinEmotion: "hesitate",
    answers: [
      {
        value: "Khaled",
        correct: false,
        khaledResponse: "Pas vraiment, je suis prêt à sacrifier quelques heures de sommeil pour avancer sur un projet si nécessaire. Valentin, lui, est beaucoup plus strict sur ça.",
        khaledEmotion: "sad",
        valentinResponse: "C'est vrai, Khaled peut parfois être un peu trop déterminé à travailler tard. Moi, je pense qu'une bonne nuit de sommeil est primordiale pour être efficace le lendemain.",
        valentinEmotion: "sweat"
      },
      {
        value: "Valentin",
        correct: true,
        khaledResponse: "Oui, Valentin est vraiment sérieux là-dessus. Moi, je peux parfois sacrifier un peu de sommeil pour finir un projet, mais je sais que c'est important.",
        khaledEmotion: "wink",
        valentinResponse: "Oh ça, c'est clairement moi ! Une bonne nuit de sommeil, c'est essentiel pour être performant au travail. Je ne plaisante pas avec ça !",
        valentinEmotion: "happy"
      }
    ]
  }
]