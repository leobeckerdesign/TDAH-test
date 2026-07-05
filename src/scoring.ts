import { QUESTIONS } from './data';

export type Answers = Record<number, number>; // { questionNumber: optionIndex }

export interface Result {
  /** Todas as 18 perguntas foram respondidas? */
  complete: boolean;
  /** Nº de marcações na área sombreada da Parte A (0 a 6). */
  partAShaded: number;
  /** Nº de marcações na área sombreada da Parte B (0 a 12). */
  partBShaded: number;
  /** Total de marcações sombreadas (0 a 18). */
  totalShaded: number;
  /** Triagem positiva: 4 ou mais marcações sombreadas na Parte A. */
  positiveScreen: boolean;
  /** Soma bruta das respostas (0 a 72), informativo. */
  rawSum: number;
}

/** Uma resposta cai na área sombreada quando seu índice >= limiar da pergunta. */
export function isShaded(questionNumber: number, optionIndex: number): boolean {
  const q = QUESTIONS.find((q) => q.n === questionNumber);
  if (!q) return false;
  return optionIndex >= q.shadedFrom;
}

export function score(answers: Answers): Result {
  let partAShaded = 0;
  let partBShaded = 0;
  let rawSum = 0;

  for (const q of QUESTIONS) {
    const a = answers[q.n];
    if (a === undefined) continue;
    rawSum += a;
    if (a >= q.shadedFrom) {
      if (q.part === 'A') partAShaded += 1;
      else partBShaded += 1;
    }
  }

  const answered = Object.keys(answers).length;

  return {
    complete: answered === QUESTIONS.length,
    partAShaded,
    partBShaded,
    totalShaded: partAShaded + partBShaded,
    positiveScreen: partAShaded >= 4,
    rawSum,
  };
}
