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
      "O que desperta seus sentidos e atenção hoje (sons, imagens, cheiros ou lugares) que fazem você se sentir vivo(a)?",
      "Em que momentos você se percebe observando algo com encantamento, como se fosse a primeira vez?",
      "De que forma o ambiente à sua volta influencia sua vontade de aprender e descobrir coisas novas?",
      "Você sente que sua curiosidade aumenta quando está em um ambiente seguro e acolhedor, ou no desafio por algo novo?",
      "O que te enche de energia e entusiasmo ao descobrir ou compreender algo novo, mesmo em pequenas coisas do dia a dia?"
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
      "O que orienta suas escolhas neste momento da vida?",
      "Quais são as causas, ideias ou pessoas que despertam o seu melhor?",
      "O que dá sentido aos seus dias quando o entusiasmo diminui?"
    ]
  },
  acao: {
    id: 'acao',
    label: 'AÇÃO',
    color: '#E74930', // Vermelho vibrante
    image: cardAcao,
    questions: [
      "O que ainda te faz levantar da cadeira e agir, mesmo quando está cansado(a)?",
      "O que te impede de dizer “agora é minha vez”?",
      "O que você tem adiado por medo de mudar a própria rotina?",
      "O que te move hoje: necessidade, propósito ou prazer?",
      "O que te dá energia e vontade de agir neste momento da vida?"
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
      "Quais aprendizados mais te orgulham na sua trajetória até aqui?",
      "O que te faz sentir que está evoluindo como pessoa nesta fase da vida?",
      "Como você pode reconhecer e validar suas conquistas, sem depender do olhar externo?"
    ]
  },
  reinvencao: {
    id: 'reinvencao',
    label: 'REINVENÇÃO',
    color: '#903B91', // Roxo reflexivo
    image: cardReinvencao,
    questions: [
      "De que forma suas conquistas e experiências anteriores podem servir de base para novos começos?",
      "Quais mudanças internas ou externas têm te convidado a se reinventar?",
      "O que significa, para você, “recomeçar com novos significados”?",
      "Que valores ou propósitos permanecem como bússola, mesmo quando tudo muda?",
      "O que você precisa deixar ir para abrir espaço para o novo?"
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
  },
  {
    text: "A vida não é uma sequência de perdas, mas uma sucessão de possibilidades para novas integrações.",
    author: "Erik Erikson"
  },
  {
    text: "O que um homem pode ser, ele deve ser. Essa necessidade de autorrealização é a base da motivação humana.",
    author: "Abraham Maslow"
  },
  {
    text: "O reconhecimento interno das próprias conquistas gera satisfação genuína e realização pessoal.",
    author: "Albert Bandura"
  }
];
