

# Plano: Adicionar Descrição Completa no Card Expandido

## Problema Identificado

Quando o usuário expande um item de inspeção, a descrição completa não é exibida. No cabeçalho do card, a descrição aparece com `line-clamp-2` (truncada em 2 linhas), mas na área expandida falta a descrição detalhada igual ao PDF.

Por exemplo, o item "1.1 - Quadro de força" tem a descrição:
> "Fusíveis; Disjuntores; IDR; Cabeamento; Aterramento; Organização; Kit fechadura e/ou ferrolho"

Esta descrição completa aparece no PDF, mas não é visível quando o card é expandido na interface.

---

## Solução

Adicionar a descrição completa na área expandida do card, logo abaixo do título da seção expandida e antes do seletor de status.

---

## Alteração

### Arquivo: `src/components/inspection/InspectionItemCard.tsx`

Adicionar um bloco de descrição completa dentro da área expandida:

```text
{isExpanded && (
  <div className="px-4 pb-4 space-y-4 animate-fade-in">
    
    ┌─────────────────────────────────────────────────┐
    │  NOVO: Descrição Completa                       │
    │  ────────────────────────────────────────────── │
    │  Texto: {item.description}                      │
    │  Estilo: bg-muted/50 p-3 rounded-lg            │
    │  Texto: text-sm text-muted-foreground          │
    └─────────────────────────────────────────────────┘
    
    <div className="border-t pt-4">
      <label>Status</label>
      <StatusSelector ... />
    </div>
    
    ... resto do conteúdo
  </div>
)}
```

### Estrutura Visual Final

```text
┌─────────────────────────────────────────────────────────┐
│ [1.1]  Quadro de força                           [▼]   │
│        Fusíveis; Disjuntores; IDR...  (truncado)       │
│        [Pendente]                                       │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │ 📋 Descrição Completa                             │  │
│  │ Fusíveis; Disjuntores; IDR; Cabeamento;           │  │
│  │ Aterramento; Organização; Kit fechadura           │  │
│  │ e/ou ferrolho                                     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Status                                                 │
│  [Conforme] [Não Conforme] [N/A] [Pendente]            │
│                                                         │
│  Foto (se não conforme)                                │
│  [Câmera] [Galeria]                                    │
│                                                         │
│  Comentário                                            │
│  [textarea]                                            │
└─────────────────────────────────────────────────────────┘
```

---

## Detalhes Técnicos

Código a ser adicionado após `<div className="px-4 pb-4 space-y-4 animate-fade-in">`:

```tsx
<div className="bg-muted/50 p-3 rounded-lg">
  <p className="text-sm font-medium text-foreground mb-1">Descrição</p>
  <p className="text-sm text-muted-foreground">{item.description}</p>
</div>
```

| Aspecto | Valor |
|---------|-------|
| Arquivo | `src/components/inspection/InspectionItemCard.tsx` |
| Linha de inserção | Após linha 54 |
| Componentes novos | Nenhum (apenas div e p) |

