

## Diagnóstico

Dois problemas relacionados ao **tamanho das fotos em base64**:

### Problema 1: Fotos não salvam (versão web no celular)
O `localStorage` do navegador tem limite de **~5-10MB**. Fotos modernas de celular em base64 ocupam **2-5MB cada**. Com várias fotos, o `setItem` falha silenciosamente (ou lança `QuotaExceededError`), mas as informações de texto continuam salvando porque cabem no limite.

Atualmente em `storage.ts` (linha 27-29) o erro é apenas logado no console, então o usuário não percebe que ultrapassou a cota.

### Problema 2: App fica lento conforme adiciona fotos
Cada foto base64 grande está sendo:
- Armazenada inteira no estado React
- Re-serializada (`JSON.stringify`) a cada mudança via `useEffect` em `useInspection.ts`
- Re-renderizada em cada card

Com 10-20 fotos de 3MB, o `JSON.stringify` processa **30-60MB de string** a cada clique.

---

## Solução: Compressão + Migração para IndexedDB

### Parte 1: Comprimir fotos antes de salvar

Em `PhotoCapture.tsx`, antes de chamar `onAdd`, redimensionar a imagem via `<canvas>`:
- Largura máxima: **1280px** (mantém proporção)
- Qualidade JPEG: **0.7**
- Resultado típico: **3MB → 150-300KB** (10-20x menor)

Qualidade ainda excelente para documentação técnica de inspeção.

### Parte 2: Trocar localStorage por IndexedDB

`localStorage` tem limite duro de ~5MB. **IndexedDB** suporta centenas de MB e é assíncrono (não bloqueia UI).

Atualizar `src/lib/storage.ts`:
- **Web**: usar `idb-keyval` (wrapper minúsculo de IndexedDB)
- **Nativo**: continua com `@capacitor/preferences`
- API pública continua igual (`getItem`, `setItem`, `removeItem`)

### Parte 3: Debounce do salvamento

Em `useInspection.ts`, o `useEffect` que salva dispara a cada caractere digitado. Adicionar **debounce de 500ms** para reduzir o número de serializações pesadas.

### Parte 4: Migração automática

Ao iniciar, ler do `localStorage` antigo (se existir), gravar no IndexedDB e limpar o `localStorage`. Sem perda de dados.

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `package.json` | Adicionar `idb-keyval` |
| `src/lib/storage.ts` | Trocar localStorage por IndexedDB no caminho web + migração |
| `src/lib/imageCompression.ts` (NOVO) | Função `compressImage(file): Promise<string>` via canvas |
| `src/components/inspection/PhotoCapture.tsx` | Chamar `compressImage` antes de `onAdd` |
| `src/hooks/useInspection.ts` | Debounce do `setItem` |

---

## Resultado Esperado

- Fotos de 3MB → ~200KB cada
- Capacidade efetiva: **centenas de fotos** sem travar
- App permanece fluido durante toda a inspeção
- Sem perda dos dados já salvos (migração automática)
- Funciona igual no navegador do celular e no app nativo

