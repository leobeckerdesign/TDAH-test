# Teste de TDAH · ASRS-18

Página interativa para autoavaliação de sintomas de TDAH em adultos usando a escala
**ASRS-18 (ASRS-v1.1)**, desenvolvida com a Organização Mundial da Saúde (OMS).

O teste roda inteiramente no navegador, é **mobile-first** e **não salva nada** — as
respostas e o resultado existem apenas durante a sessão.

**No ar (GitHub Pages):** https://leobeckerdesign.github.io/TDAH-test/

Existem duas formas de rodar este projeto:

- **Versão single-file** — [`docs/index.html`](docs/index.html): a página inteira (HTML + CSS + JS)
  em um único arquivo, sem build. É a que o GitHub Pages publica. Basta abrir o arquivo em
  qualquer navegador.
- **Versão Vite/React** — o código-fonte em [`src/`](src), para desenvolvimento e build.

### Ativar o GitHub Pages (link público)

Em **Settings → Pages** do repositório, escolha **Source: _Deploy from a branch_**, branch
**`main`** e pasta **`/docs`**. Em ~1 minuto o teste fica público em
`https://leobeckerdesign.github.io/TDAH-test/`.

## Metodologia

O questionário tem 18 perguntas, respondidas em uma escala de frequência de 5 níveis
(_Nunca · Quase nunca · De vez em quando · Quase sempre · Sempre_), sobre os sintomas nos
últimos 6 meses.

- **Parte A (perguntas 1–6)** — a triagem validada. Cada pergunta tem uma faixa
  "sombreada" (as frequências mais altas). A regra oficial: **4 ou mais marcações na área
  sombreada** indicam sintomas altamente compatíveis com TDAH, recomendando investigação
  profissional.
  - Perguntas 1–3 são sombreadas a partir de _"De vez em quando"_.
  - Perguntas 4–6 são sombreadas a partir de _"Quase sempre"_.
- **Parte B (perguntas 7–18)** — complementar. Não há pontuação mínima; as marcações
  sombreadas servem como informação qualitativa de apoio.

O limiar de 4+ na Parte A é o método clássico do Harvard NCS/OMS, com sensibilidade de
68,7% e especificidade de 99,5% no estudo de validação. A lógica de pontuação fica em
[`src/scoring.ts`](src/scoring.ts) e os dados das perguntas em [`src/data.ts`](src/data.ts).

> ⚠️ Este teste **não faz diagnóstico**. A ASRS-18 avalia apenas o critério A. O diagnóstico
> de TDAH exige avaliação clínica completa por um profissional (psiquiatra, neurologista).

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- CSS puro (sem dependências de UI), mobile-first

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # saída estática em dist/
```

## Fontes

- Adult ADHD Self-Report Scale (ASRS-v1.1) — Harvard NCS / OMS:
  <https://www.hcp.med.harvard.edu/ncs/ftpdir/adhd/18Q_ASRS_English.pdf>
- Associação Brasileira do Déficit de Atenção: <https://tdah.org.br>
