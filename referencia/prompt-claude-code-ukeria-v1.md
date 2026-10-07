# Prompt para Claude Code (VS Code) — Ukêria Produções, Site V1

Copie o bloco abaixo e cole no chat do Claude Code dentro do VS Code, na raiz do repositório do projeto.

---

```
Você vai construir a V1 do site da Ukêria Produções. Antes de qualquer decisão visual, leia por completo o arquivo `/referencia/UKERIA - BRANDBOOK.md` e siga-o como checklist de compliance da marca (não use a ferramenta Skill, pois a skill `ukeria-brand-compliance` não está instalada). Esse arquivo contém o checklist oficial de compliance (cores, tipografia, uso do logotipo, elementos gráficos, padrão de aplicações, tom de voz e checklist rápido de revisão) extraído do brandbook oficial. Nenhuma decisão de cor, fonte, ícone ou layout deve contrariar esse checklist sem justificativa explícita registrada. Nas referências abaixo, "checklist de compliance" significa esse arquivo.

Trabalhe em 3 fases sequenciais. Não pule para a fase seguinte sem entregar o artefato da fase anterior. Ao final de cada fase, pare, resuma o que foi encontrado/decidido e só prossiga após eu confirmar (ou, se eu tiver pedido para rodar tudo de uma vez, prossiga e sinalize claramente a transição de fase no output).

---

## FASE 1 — Mapeamento da referência de marca

Fontes a inventariar, todas dentro de `/referencia`:
- `/referencia/UKERIA - BRANDBOOK.pdf` — documento oficial completo (estratégia, universo verbal, universo visual).
- `/referencia/ELEMENTOS/*` — arquivos de elementos gráficos de assinatura.
- `/referencia/LOGOTIPO/*` — variações do logotipo.
- `/referencia/TIPOGRAFIA/*` — espécimes/arquivos de fonte.

Passos:
1. Leia o PDF do brandbook por completo (texto + inspeção visual das páginas de sistema visual — logotipo, cores, tipografia, elementos). Use `/referencia/UKERIA - BRANDBOOK.md` como checklist de conferência, não como substituto da leitura — o PDF é a fonte de verdade; o `.md` é o resumo operacional. Registre qualquer divergência entre os dois.
2. Abra e catalogue cada arquivo de `/referencia/ELEMENTOS/*`, `/referencia/LOGOTIPO/*` e `/referencia/TIPOGRAFIA/*`. Para cada arquivo, identifique: o que ele é (ex.: "logotipo principal, versão Preto Ukêria sobre Bege 01"), formato, e se há metadados relevantes (fonte vetorial vs. raster, se tem fundo transparente, peso de fonte, etc.).
3. Cruze os arquivos encontrados com as regras do brandbook: aponte explicitamente qualquer arquivo que pareça contradizer o brandbook (ex.: um logotipo em cor proibida, uma fonte que não é Unbounded/Quatera/Raleway) e qualquer regra do brandbook para a qual você NÃO encontrou um arquivo correspondente em `/referencia` (gap de asset).
4. Gere dois artefatos, ambos em `/referencia`:
   - **`brand-map.json`** — estrutura de dados machine-readable com: paleta de cores (nome, hex, rgb, cmyk, uso sugerido), tipografia (papel de cada fonte + caminho do arquivo/espécime correspondente em `/referencia/TIPOGRAFIA`), logotipo (lista de variações com caminho do arquivo, cor de fundo permitida, uso indicado), elementos gráficos (cada um dos motivos oficiais com caminho do(s) arquivo(s) de referência em `/referencia/ELEMENTOS` e descrição de como aplicar).
   - **`brand-map.md`** — a mesma informação em formato descritivo e legível, organizada por seção (Logotipo / Cores / Tipografia / Elementos Gráficos / Tom de Voz), servindo de referência rápida para humanos revisarem.
5. Ao final da Fase 1, apresente um resumo: quantos arquivos foram catalogados, quais regras do brandbook têm asset correspondente, quais não têm, e qualquer inconsistência encontrada entre arquivos e documento.

---

## FASE 2 — Avaliação do site atual e dos assets existentes

1. Verifique se já existe algum código de site neste repositório (HTML/React/Next/outro). Se existir, leia a estrutura completa: seções, componentes, estilos, paleta e tipografia atualmente em uso.
2. Se não houver site no repositório, procure por qualquer asset de referência estrutural disponível (arquivos de design, exports, imagens de layout) em `/referencia` ou em outras pastas do projeto, e trate como referência de estrutura/seções — não de identidade visual (identidade visual vem exclusivamente do `brand-map` da Fase 1).
3. Produza um resumo curto (pode ser direto na conversa, sem necessidade de arquivo) com:
   - Lista de seções/páginas existentes (ex.: Hero, Manifesto, Origem do Nome, Ancestralidade Terena, Serviços, Serviços Avulsos, Portfólio, Cases, Clientes, Feedbacks, Contato).
   - Stack técnica identificada (framework, build tool, CSS approach).
   - Pontos de divergência já visíveis entre o que existe e o `brand-map.json`/`brand-map.md` da Fase 1 (cores, fontes, ícones).
4. Esse mapeamento é só avaliação — não altere nada ainda nesta fase.

---

## FASE 3 — Adequação do site à V1 final

1. Leia `/referencia/UKERIA - CONSIDERAÇÕES SITE.pdf` por completo — esse documento traz requisitos/observações específicas para esta versão do site que ainda não foram consideradas.
2. Usando como insumos: `brand-map.json` + `brand-map.md` (Fase 1), a avaliação estrutural (Fase 2), as considerações do PDF (este passo) e o checklist de `/referencia/UKERIA - BRANDBOOK.md`, adeque o site existente (ou construa, se não existir) à V1 final:
   - Tipografia: aplicar Unbounded Bold (logotipo), Quatera Italic (destaques de título) e Raleway (subtítulo/corpo), usando os arquivos de `/referencia/TIPOGRAFIA` quando aplicável (self-host local em vez de depender de CDN, se os arquivos de fonte estiverem disponíveis).
   - Cores: usar exclusivamente os hex do `brand-map.json`, nunca aproximações.
   - Logotipo: usar os arquivos reais de `/referencia/LOGOTIPO`, respeitando as combinações de cor permitidas (nunca laranja/amarelo/verde no logotipo).
   - Elementos gráficos: usar os motivos oficiais (vidro desfocado, degrade focado, linhas e perspectiva) com base nos arquivos de `/referencia/ELEMENTOS`, substituindo qualquer ícone/motivo inventado anteriormente que não corresponda ao sistema oficial.
   - Estrutura de seções: manter o que fizer sentido da Fase 2, ajustando conforme as considerações do PDF desta fase.
3. Ao final, rode uma autorrevisão usando o checklist de compliance de `/referencia/UKERIA - BRANDBOOK.md` (seção "Checklist rápido de revisão" e demais seções) item a item e reporte o resultado (o que passou, o que foi ajustado, o que ficou pendente de decisão humana).
4. Not alterar nada relacionado a preços, textos de serviços ou dados de clientes sem sinalizar — isso é conteúdo, não compliance visual, e deve ser tratado à parte se aparecer nas considerações do PDF.

---

Regra geral para as 3 fases: sempre que uma decisão de design não estiver coberta pelo brandbook (PDF e `.md`) ou pelos arquivos de `/referencia`, pare e pergunte em vez de inventar — documentar a lacuna é preferível a assumir.
```
