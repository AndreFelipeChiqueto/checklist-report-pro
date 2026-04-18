

# Plano: Corrigir Persistência ao Fechar App + Múltiplas Fotos por Item

## Problema 1: Dados Perdidos ao Fechar App

### Causa Raiz
O `capacitor.config.ts` (linhas 7-10) usa `server.url` apontando para o sandbox do Lovable. Isso faz o app Android carregar o site **remoto** dentro do WebView, o que é ótimo para hot-reload em desenvolvimento, **mas o `localStorage` fica vinculado ao domínio remoto e ao WebView do app**.

Quando o usuário **fecha completamente** o app (não só minimiza):
- O Android pode limpar o cache do WebView
- O contexto de armazenamento do WebView é destruído
- O `localStorage` do site remoto é perdido

Quando apenas **minimiza**, o WebView mantém o estado em memória, então parece funcionar.

### Solução
Usar **Capacitor Preferences** (armazenamento nativo persistente do dispositivo) em vez de apenas `localStorage`. Isso grava os dados no armazenamento nativo do Android/iOS, sobrevivendo a fechamentos do app, atualizações e reinícios do dispositivo.

Estratégia híbrida:
- **Web (navegador)**: continua usando `localStorage`
- **App nativo (Capacitor)**: usa `@capacitor/preferences`
- Detecção automática via `Capacitor.isNativePlatform()`

---

## Problema 2: Apenas 1 Foto por Item

### Causa Raiz
- `InspectionItem` (linha 10 de `types/inspection.ts`) tem `photoUrl?: string` — apenas uma string, não um array.
- `PhotoCapture.tsx` substitui a foto existente a cada nova captura.

### Solução
1. Alterar tipo: `photoUrl?: string` → `photoUrls?: string[]`
2. Refatorar `PhotoCapture.tsx` para:
   - Mostrar grade com todas as fotos
   - Botões "Câmera" e "Galeria" sempre visíveis (mesmo com fotos já adicionadas)
   - Botão X individual em cada foto para remover
3. Atualizar `useInspection.ts`:
   - `updateItemPhoto` → `addItemPhoto` e `removeItemPhoto` (por índice)
4. Atualizar `InspectionItemCard.tsx` para usar a nova API
5. Atualizar `pdfGenerator.ts` para incluir todas as fotos no PDF
6. Migração de dados antigos: ao carregar do storage, converter `photoUrl` (string) para `photoUrls` (array com 1 item)

---

## Detalhes Técnicos

### Arquivo 1: `package.json` (instalar)
- Adicionar `@capacitor/preferences`

### Arquivo 2: `src/lib/storage.ts` (NOVO)
Wrapper assíncrono que escolhe entre localStorage (web) e Preferences (nativo).
```ts
- getItem(key): Promise<string | null>
- setItem(key, value): Promise<void>
- removeItem(key): Promise<void>
```

### Arquivo 3: `src/hooks/useInspection.ts`
- Carregar dados de forma assíncrona no mount via `useEffect` (não no `useState` initializer)
- Salvar via wrapper assíncrono
- Migrar `photoUrl` antigo para `photoUrls[]` ao carregar
- Trocar `updateItemPhoto` por `addItemPhoto(sectionId, itemId, url)` e `removeItemPhoto(sectionId, itemId, index)`

### Arquivo 4: `src/types/inspection.ts`
- Linha 10: `photoUrl?: string` → `photoUrls?: string[]`

### Arquivo 5: `src/components/inspection/PhotoCapture.tsx`
Refatorar para suportar múltiplas fotos:
```text
+----------------------------------+
| [foto1 X] [foto2 X] [foto3 X]   |  ← grade
+----------------------------------+
| [Camera]  [Galeria]              |  ← sempre visíveis
+----------------------------------+
```
Nova interface:
- `photoUrls: string[]`
- `onAdd: (url) => void`
- `onRemove: (index) => void`

### Arquivo 6: `src/components/inspection/InspectionItemCard.tsx`
Atualizar props para `onPhotoAdd` e `onPhotoRemove`.

### Arquivo 7: `src/utils/pdfGenerator.ts`
Iterar sobre `item.photoUrls` para incluir todas no PDF.

---

## Resultado Esperado

- **Fechar e reabrir o app**: dados preservados via armazenamento nativo
- **Atualizar página no navegador**: dados preservados via localStorage
- **Reiniciar inspeção**: limpa tudo (ambos os armazenamentos)
- **Fotos**: pode anexar várias fotos por item, mistura câmera + galeria, remover individualmente

---

## Observação Importante

Após implementação, o usuário precisará:
1. Fazer `git pull` no projeto
2. Rodar `npm install` (para instalar `@capacitor/preferences`)
3. Rodar `npx cap sync android`
4. Reconstruir o APK

