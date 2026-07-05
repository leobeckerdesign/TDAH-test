// ASRS-18 (ASRS-v1.1) — Escala de Autoavaliação de TDAH em Adultos
// Conteúdo e metodologia conforme o questionário oficial (OMS / Harvard NCS / tdah.org.br).

// Escala de frequência (5 opções). O índice é usado para o cálculo da pontuação.
export const OPTIONS = [
  'Nunca',
  'Quase nunca',
  'De vez em quando',
  'Quase sempre',
  'Sempre',
] as const;

export interface Question {
  /** Número da pergunta (1 a 18). */
  n: number;
  /** Parte do questionário: 'A' (triagem) ou 'B' (complementar). */
  part: 'A' | 'B';
  /** Texto da pergunta. */
  text: string;
  /**
   * Índice mínimo da opção que cai na "área sombreada" (mais escura).
   * Marcações a partir deste índice contam como sintoma sombreado.
   * Perguntas 1-3,10,13-16,18 sombreiam a partir de "De vez em quando" (índice 2).
   * Perguntas 4-9,11-12,17 sombreiam a partir de "Quase sempre" (índice 3).
   */
  shadedFrom: 2 | 3;
}

export const QUESTIONS: Question[] = [
  // ---- Parte A (triagem — as 6 perguntas mais importantes) ----
  {
    n: 1,
    part: 'A',
    shadedFrom: 2,
    text: 'Com que frequência você deixa um projeto pela metade depois de já ter feito as partes mais difíceis?',
  },
  {
    n: 2,
    part: 'A',
    shadedFrom: 2,
    text: 'Com que frequência você tem dificuldade para fazer um trabalho que exige organização?',
  },
  {
    n: 3,
    part: 'A',
    shadedFrom: 2,
    text: 'Com que frequência você tem dificuldade para lembrar de compromissos ou obrigações?',
  },
  {
    n: 4,
    part: 'A',
    shadedFrom: 3,
    text: 'Quando você precisa fazer algo que exige muita concentração, com que frequência você evita ou adia o início?',
  },
  {
    n: 5,
    part: 'A',
    shadedFrom: 3,
    text: 'Com que frequência você fica se mexendo na cadeira ou balançando as mãos ou os pés quando precisa ficar sentado(a) por muito tempo?',
  },
  {
    n: 6,
    part: 'A',
    shadedFrom: 3,
    text: 'Com que frequência você se sente ativo(a) demais e necessitando fazer coisas, como se estivesse com um motor ligado?',
  },

  // ---- Parte B (complementar — as 12 perguntas de apoio) ----
  {
    n: 7,
    part: 'B',
    shadedFrom: 3,
    text: 'Com que frequência você comete erros bobos por falta de atenção quando tem de trabalhar num projeto chato ou difícil?',
  },
  {
    n: 8,
    part: 'B',
    shadedFrom: 3,
    text: 'Com que frequência você tem dificuldade para manter a atenção quando está fazendo um trabalho chato ou repetitivo?',
  },
  {
    n: 9,
    part: 'B',
    shadedFrom: 3,
    text: 'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?',
  },
  {
    n: 10,
    part: 'B',
    shadedFrom: 2,
    text: 'Com que frequência você coloca as coisas fora do lugar ou tem dificuldade de encontrar as coisas em casa ou no trabalho?',
  },
  {
    n: 11,
    part: 'B',
    shadedFrom: 3,
    text: 'Com que frequência você se distrai com atividades ou barulho a sua volta?',
  },
  {
    n: 12,
    part: 'B',
    shadedFrom: 3,
    text: 'Com que frequência você se sente inquieto(a) ou agitado(a)?',
  },
  {
    n: 13,
    part: 'B',
    shadedFrom: 2,
    text: 'Com que frequência você tem dificuldade para sossegar e relaxar quando tem tempo livre para você?',
  },
  {
    n: 14,
    part: 'B',
    shadedFrom: 2,
    text: 'Com que frequência você se pega falando demais em situações sociais?',
  },
  {
    n: 15,
    part: 'B',
    shadedFrom: 2,
    text: 'Com que frequência você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado(a)?',
  },
  {
    n: 16,
    part: 'B',
    shadedFrom: 2,
    text: 'Quando você está conversando, com que frequência você se pega terminando as frases das pessoas antes delas?',
  },
  {
    n: 17,
    part: 'B',
    shadedFrom: 3,
    text: 'Com que frequência você tem dificuldade para esperar nas situações onde cada um tem a sua vez?',
  },
  {
    n: 18,
    part: 'B',
    shadedFrom: 2,
    text: 'Com que frequência você interrompe os outros quando eles estão ocupados?',
  },
];
