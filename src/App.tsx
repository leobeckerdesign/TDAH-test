import { useMemo, useState } from 'react';
import { OPTIONS, QUESTIONS } from './data';
import { score, isShaded, type Answers } from './scoring';

type Screen = 'intro' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setScreen('intro');
  };

  return (
    <main className="app">
      {screen === 'intro' && <Intro onStart={() => setScreen('quiz')} />}
      {screen === 'quiz' && (
        <Quiz
          answers={answers}
          index={index}
          setIndex={setIndex}
          onAnswer={(n, opt) => setAnswers((prev) => ({ ...prev, [n]: opt }))}
          onFinish={() => setScreen('result')}
        />
      )}
      {screen === 'result' && <ResultView answers={answers} onRestart={restart} />}
    </main>
  );
}

/* ---------------------------------------------------------------- Intro --- */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="card intro">
      <span className="eyebrow">Autoavaliação · Adultos</span>
      <h1>Teste de TDAH</h1>
      <p className="subtitle">
        Escala ASRS-18 (ASRS-v1.1), desenvolvida com a Organização Mundial da Saúde (OMS).
      </p>

      <p>
        São 18 perguntas sobre a frequência de sintomas nos últimos 6 meses. Leva cerca de
        5 minutos. O resultado aparece na hora e <strong>não é salvo</strong> — fica apenas
        nesta sessão.
      </p>

      <div className="note">
        <strong>Como funciona</strong>
        <p>
          A <em>Parte A</em> (6 perguntas) é a triagem principal: 4 ou mais respostas na faixa
          de maior frequência indicam sintomas altamente compatíveis com TDAH. A <em>Parte B</em>
          {' '}(12 perguntas) complementa a avaliação.
        </p>
      </div>

      <div className="disclaimer">
        Este teste é apenas um ponto de partida. Ele <strong>não faz diagnóstico</strong>. O
        diagnóstico correto de TDAH só pode ser feito por um profissional de saúde
        (psiquiatra, neurologista) por meio de uma avaliação completa.
      </div>

      <button className="btn primary" onClick={onStart}>
        Iniciar teste
      </button>
    </section>
  );
}

/* ----------------------------------------------------------------- Quiz --- */

function Quiz({
  answers,
  index,
  setIndex,
  onAnswer,
  onFinish,
}: {
  answers: Answers;
  index: number;
  setIndex: (i: number) => void;
  onAnswer: (n: number, opt: number) => void;
  onFinish: () => void;
}) {
  const q = QUESTIONS[index];
  const total = QUESTIONS.length;
  const current = answers[q.n];
  const isLast = index === total - 1;

  const select = (opt: number) => {
    onAnswer(q.n, opt);
    // avança automaticamente após um instante para dar retorno visual
    window.setTimeout(() => {
      if (isLast) onFinish();
      else setIndex(index + 1);
    }, 180);
  };

  return (
    <section className="card quiz">
      <header className="quiz-head">
        <div className="progress">
          <div className="progress-bar" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="quiz-meta">
          <span className={`badge ${q.part === 'A' ? 'badge-a' : 'badge-b'}`}>Parte {q.part}</span>
          <span className="counter">
            {index + 1} <span className="muted">de {total}</span>
          </span>
        </div>
      </header>

      <p className="prompt">Com que frequência isso acontece com você?</p>
      <h2 className="question">{q.text}</h2>

      <div className="options">
        {OPTIONS.map((label, i) => (
          <button
            key={i}
            className={`option ${current === i ? 'selected' : ''}`}
            onClick={() => select(i)}
          >
            <span className="dot" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      <div className="quiz-nav">
        <button className="btn ghost" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Voltar
        </button>
        {current !== undefined && !isLast && (
          <button className="btn ghost" onClick={() => setIndex(index + 1)}>
            Avançar
          </button>
        )}
        {current !== undefined && isLast && (
          <button className="btn primary small" onClick={onFinish}>
            Ver resultado
          </button>
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Result --- */

function ResultView({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const result = useMemo(() => score(answers), [answers]);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <section className="card result">
      <span className="eyebrow">Resultado</span>

      <div className={`verdict ${result.positiveScreen ? 'pos' : 'neg'}`}>
        <div className="verdict-score">
          {result.partAShaded}
          <span className="verdict-den">/6</span>
        </div>
        <div className="verdict-text">
          <strong>
            {result.positiveScreen
              ? 'Sintomas altamente compatíveis com TDAH'
              : 'Sintomas menos consistentes com TDAH'}
          </strong>
          <span>
            {result.partAShaded} de 6 respostas da Parte A na faixa de maior frequência
            {result.positiveScreen ? ' (limiar: 4 ou mais).' : ' (limiar para triagem positiva: 4 ou mais).'}
          </span>
        </div>
      </div>

      <p className="result-lead">
        {result.positiveScreen ? (
          <>
            Suas respostas na Parte A são <strong>altamente compatíveis</strong> com um quadro de
            TDAH em adultos. É recomendável procurar um profissional de saúde para uma
            investigação mais precisa.
          </>
        ) : (
          <>
            Suas respostas na Parte A ficaram <strong>abaixo do limiar</strong> de triagem. Isso
            não descarta TDAH — se os sintomas afetam seu dia a dia, vale conversar com um
            profissional.
          </>
        )}
      </p>

      <div className="stats">
        <div className="stat">
          <span className="stat-num">{result.partAShaded}<span className="stat-den">/6</span></span>
          <span className="stat-label">Parte A · triagem</span>
        </div>
        <div className="stat">
          <span className="stat-num">{result.partBShaded}<span className="stat-den">/12</span></span>
          <span className="stat-label">Parte B · complementar</span>
        </div>
        <div className="stat">
          <span className="stat-num">{result.totalShaded}<span className="stat-den">/18</span></span>
          <span className="stat-label">Total sombreado</span>
        </div>
      </div>

      <p className="note-b">
        A Parte B não tem pontuação mínima — ela dá informações mais detalhadas para apoiar a
        avaliação, com atenção especial às marcações na faixa de maior frequência.
      </p>

      <button className="btn ghost full" onClick={() => setShowDetail((v) => !v)}>
        {showDetail ? 'Ocultar respostas' : 'Ver minhas respostas'}
      </button>

      {showDetail && (
        <ul className="detail">
          {QUESTIONS.map((q) => {
            const a = answers[q.n];
            const shaded = a !== undefined && isShaded(q.n, a);
            return (
              <li key={q.n} className={shaded ? 'shaded' : ''}>
                <div className="detail-top">
                  <span className="detail-n">
                    {q.n}. <span className="detail-part">Parte {q.part}</span>
                  </span>
                  <span className="detail-ans">
                    {a !== undefined ? OPTIONS[a] : '—'}
                    {shaded && <span className="mark" title="Faixa de maior frequência">●</span>}
                  </span>
                </div>
                <p className="detail-q">{q.text}</p>
              </li>
            );
          })}
        </ul>
      )}

      <div className="disclaimer">
        Resultado meramente informativo. A ASRS-18 avalia apenas o critério A do diagnóstico.
        Um diagnóstico de TDAH exige avaliação clínica completa por um profissional
        especializado. Se você está em sofrimento, procure ajuda.
      </div>

      <button className="btn primary" onClick={onRestart}>
        Refazer teste
      </button>

      <p className="credits">
        Fonte: Adult ADHD Self-Report Scale (ASRS-v1.1), OMS / Harvard NCS · adaptação
        brasileira (tdah.org.br).
      </p>
    </section>
  );
}
