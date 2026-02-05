

# Plano: Adicionar Opções Separadas para Câmera e Galeria

## Problema Identificado

O comportamento de `<input type="file" accept="image/*">` varia entre dispositivos:
- **Com `capture="environment"`**: Abre apenas a câmera (problema anterior)
- **Sem `capture`**: O comportamento depende do navegador/dispositivo - alguns mostram escolha, outros vão direto para galeria

Como o comportamento nativo não é consistente entre dispositivos, a solução é criar **dois botões separados**: um para câmera e outro para galeria.

---

## Solução Proposta

Criar dois inputs separados e dois botões distintos:

1. **Botão "Tirar Foto"** → Input com `capture="environment"` (abre câmera)
2. **Botão "Galeria"** → Input sem `capture` (abre galeria de fotos)

---

## Alterações no Código

### Arquivo: `src/components/inspection/PhotoCapture.tsx`

```text
Mudanças:
├── Adicionar segundo useRef para o input da galeria
├── Criar input separado para câmera (com capture="environment")
├── Criar input separado para galeria (sem capture)
├── Substituir botão único por dois botões lado a lado
│   ├── Botão câmera (ícone Camera)
│   └── Botão galeria (ícone Image)
└── Manter mesma lógica de handleFileChange para ambos
```

### Estrutura Visual dos Botões

```text
┌─────────────────────────────────────────┐
│  ┌─────────────┐    ┌─────────────┐     │
│  │   📷        │    │   🖼️        │     │
│  │  Câmera     │    │  Galeria    │     │
│  └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────┘
```

---

## Detalhes Técnicos

### Inputs Ocultos
```tsx
// Input para câmera
<input
  ref={cameraInputRef}
  type="file"
  accept="image/*"
  capture="environment"
  onChange={handleFileChange}
  className="hidden"
/>

// Input para galeria
<input
  ref={galleryInputRef}
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="hidden"
/>
```

### Botões Separados
- Dois botões com `flex-1` para dividir o espaço igualmente
- Cada botão aciona seu respectivo input
- Mantém o estilo visual atual (outline, border-dashed)

---

## Benefícios

- Funciona consistentemente em Android e iOS
- Usuário tem controle total sobre a origem da foto
- Interface clara e intuitiva
- Resolve o problema de comportamento inconsistente entre navegadores

