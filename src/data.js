import cardCuriosidade from './assets/card-curiosidade.png';
import cardProposito from './assets/card-proposito.png';
import cardAcao from './assets/card-acao.png';
import cardRealizacao from './assets/card-realizacao.png';
import cardReinvencao from './assets/card-reinvencao.png';

export const categories = {
  curiosidade: {
    id: 'curiosidade',
    label: 'CURIOSIDADE',
    color: '#246CA0', // Azul profundo
    image: cardCuriosidade,
    questions: [
      "O que desperta seus sentidos e atenção hoje?",
      "Em que momentos você se percebe observando algo com encantamento?",
      "De que forma o ambiente à sua volta influencia sua vontade de aprender?"
    ]
  },
  proposito: {
    id: 'proposito',
    label: 'PROPÓSITO',
    color: '#F89D42', // Laranja quente
    image: cardProposito,
    questions: [
      "O que faz sua vida ter sentido hoje?",
      "Qual legado você deseja deixar?",
      "O que orienta suas escolhas neste momento da vida?"
    ]
  },
  acao: {
    id: 'acao',
    label: 'AÇÃO',
    color: '#E74930', // Vermelho vibrante
    image: cardAcao,
    questions: [
      "O que você está disposto a fazer diferente hoje?",
      "Que pequeno passo você pode dar agora em direção ao que importa?",
      "O que te impede de agir e como pode superar isso?"
    ]
  },
  realizacao: {
    id: 'realizacao',
    label: 'REALIZAÇÃO',
    color: '#056D41', // Verde profundo
    image: cardRealizacao,
    questions: [
      "Quais conquistas recentes você reconhece como fruto do seu próprio esforço?",
      "De que forma você celebra suas vitórias, mesmo as pequenas?",
      "Quais aprendizados mais te orgulham na sua trajetória até aqui?"
    ]
  },
  reinvencao: {
    id: 'reinvencao',
    label: 'REINVENÇÃO',
    color: '#903B91', // Roxo reflexivo
    image: cardReinvencao,
    questions: [
      "O que você está aprendendo a deixar ir para abrir espaço para o novo?",
      "Como você reconstrói sua identidade quando algo importante muda?",
      "Que partes de você estão prontas para emergir agora?"
    ]
  }
};

export const quotes = [
  {
    text: "Quem tem um porquê enfrenta qualquer como.",
    author: "Viktor Frankl"
  },
  {
    text: "A motivação é a energia interna que dá direção, intensidade e persistência ao comportamento.",
    author: "Johnmarshall Reeve"
  }
];
