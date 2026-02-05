
# Plano: Corrigir Descrições Completas dos Itens de Inspeção

## Problema Identificado

Analisando os PDFs enviados, identifiquei que as descrições no código atual estao **incompletas**. O PDF de recebimento mostra que cada item deve ter:

1. **Descrição tecnica** entre parenteses
2. **Referencia ao protocolo MHC2/EOX** com instrucoes detalhadas

### Exemplo - Item 1.1 Quadro de forca:

| Codigo Atual | PDF Completo |
|--------------|--------------|
| Fusiveis; Disjuntores; IDR; Cabeamento; Aterramento; Organizacao; Kit fechadura e/ou ferrolho | (Fusiveis; Disjuntores; IDR; Cabeamento; Aterramento; Organizacao; Kit fechadura e/ou ferrolho) ********** Item 1.2 do PROTOCOLO MHC2 e EOX: Verificar as condicoes da energia do empreendimento |

---

## Solucao em 2 Partes

### Parte 1: Interface - Remover descricao do cabecalho

No arquivo `src/components/inspection/InspectionItemCard.tsx`, remover a linha 43 que mostra a descricao truncada no cabecalho.

**Antes (card fechado):**
```text
[1.1]  Quadro de forca                    [v]
       Fusiveis; Disjuntores; IDR...      <-- REMOVER
       [Pendente]
```

**Depois (card fechado):**
```text
[1.1]  Quadro de forca                    [v]
       [Pendente]
```

---

### Parte 2: Dados - Atualizar descricoes completas

No arquivo `src/types/inspection.ts`, atualizar o campo `description` de cada item com o texto completo do PDF, incluindo:
- Descricao tecnica entre parenteses
- Referencia ao protocolo quando aplicavel
- Normas NBR quando mencionadas

---

## Detalhes Tecnicos

### Alteracao 1: InspectionItemCard.tsx

| Aspecto | Valor |
|---------|-------|
| Arquivo | `src/components/inspection/InspectionItemCard.tsx` |
| Acao | Remover linha 43 |
| Codigo a remover | `<p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>` |

### Alteracao 2: inspection.ts

Atualizar descricoes de todos os itens das 10 secoes:

**Secao 1.0 - Casa de Maquina (11 itens):**
- 1.1: Adicionar referencia ao Item 1.2 do PROTOCOLO MHC2 e EOX
- 1.2: Adicionar Item 5.3 do PROTOCOLO MHC2
- 1.4: Adicionar PROTOCOLO EOX Item 3.1
- 1.6: Adicionar referencias aos Items 2.1-2.7, 4.1-4.3, 11.0 do PROTOCOLO MHC2
- 1.7: Adicionar Item 3.1 do PROTOCOLO MHC2
- 1.11: Adicionar Pontos 5.1, 5.2 do PROTOCOLO MHC2 e Item 3.3 do PROTOCOLO EOX

**Secao 2.0 - Topo da Cabina (12 itens):**
- 2.1: Adicionar Item 6.4 do PROTOCOLO MHC2 e PROTOCOLO EOX items 4.1, 4.2
- 2.2: Adicionar Item 6.3 do PROTOCOLO MHC2
- 2.4: Adicionar Item 6.5 do PROTOCOLO MHC2
- 2.7: Adicionar Item 6.2 do PROTOCOLO MHC2
- 2.12: Adicionar Ponto 6.4 do PROTOCOLO MHC2

**Secao 3.0 - Caixa de Corrida (11 itens):**
- 3.1: Adicionar Item 10.3 do PROTOCOLO MHC2
- 3.5: Adicionar Item 7.1 do PROTOCOLO MHC2
- 3.6: Adicionar referencia NBR 16858-1:2021 item 6.3.2
- 3.11: Adicionar Item 7.3 do PROTOCOLO MHC2

**Secao 5.0 - Poco (9 itens):**
- 5.2: Adicionar Items 8.2, 8.3, 8.4 do PROTOCOLO MHC2
- 5.7: Adicionar Item 8.1 do PROTOCOLO MHC2

**Secao 6.0 - Embaixo da Cabina (8 itens):**
- 6.3: Adicionar Item 9.3 do PROTOCOLO MHC2
- 6.5: Adicionar Item 9.2 do PROTOCOLO MHC2
- 6.8: Adicionar Item 9.1 do PROTOCOLO MHC2

**Secao 7.0 - Pavimento (5 itens):**
- 7.1: Adicionar Item 10.3 do PROTOCOLO MHC2
- 7.2: Adicionar Items 10.1, 10.2 do PROTOCOLO MHC2

**Secao 9.0 - Testes de Comissionamento (19 itens):**
- Adicionar referencias NBR 16858-1:2021 em todos os itens de teste
- 9.7: Adicionar Item 2.4 do PROTOCOLO MHC2

**Secao 10.0 - CTC (1 item):**
- 10.1: Adicionar Item 6.1 do PROTOCOLO MHC2

---

## Resultado Final

Quando o usuario expandir um card de inspecao, vera:

```text
+---------------------------------------------------------+
| [1.1]  Quadro de forca                           [^]    |
|        [Pendente]                                       |
+---------------------------------------------------------+
|  Descricao                                              |
|  (Fusiveis; Disjuntores; IDR; Cabeamento;               |
|  Aterramento; Organizacao; Kit fechadura e/ou           |
|  ferrolho)                                              |
|                                                         |
|  ********** Item 1.2 do PROTOCOLO MHC2 e EOX:           |
|  Verificar as condicoes da energia do empreendimento    |
+---------------------------------------------------------+
```

---

## Arquivos a Modificar

| Arquivo | Tipo de Alteracao |
|---------|-------------------|
| `src/components/inspection/InspectionItemCard.tsx` | Remover 1 linha |
| `src/types/inspection.ts` | Atualizar ~80 descricoes |
