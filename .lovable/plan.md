

# Plano: README.md Personalizado (Sem TK)

## Resumo

Criar um arquivo README.md profissional e personalizado para o aplicativo "Inspeção de Elevadores", substituindo o conteúdo genérico atual por documentação técnica completa, **sem nenhuma referência à marca TK**.

Também será necessário remover as referências a "TK" em outros arquivos do projeto.

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `README.md` | Substituição completa por documentação personalizada |
| `capacitor.config.ts` | Alterar `appName` de "Inspeção Elevadores TK" para "Inspeção de Elevadores" |
| `src/types/inspection.ts` | Alterar valor padrão de `origin` de "tkE - Brasil" para "Brasil" |

---

## Estrutura do Novo README.md

### 1. Cabeçalho
- Ícone e nome do projeto
- Descrição curta

### 2. Sobre o Projeto
- Aplicativo mobile para inspeção técnica de elevadores
- Baseado nas normas NBR 16858 / EN-81
- Checklist completo com 93 itens em 10 seções

### 3. Funcionalidades
- Checklist organizado por seções
- Captura de fotos para não conformidades
- Geração de PDFs (Relatório Completo e Pendências)
- Observações do cliente
- Estatísticas em tempo real
- Interface mobile-first

### 4. Seções de Inspeção
1. Casa de Máquina (11 itens)
2. Topo da Cabina (12 itens)
3. Caixa de Corrida (11 itens)
4. Contrapeso (7 itens)
5. Poço (9 itens)
6. Embaixo da Cabina (8 itens)
7. Pavimento (5 itens)
8. Cabina Interna (7 itens)
9. Testes de Comissionamento (19 itens)
10. Aplicação de CTC (1 item)

### 5. Tecnologias
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Capacitor (Android)
- jsPDF

### 6. Instalação e Execução

```text
Pré-requisitos: Node.js 18+

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 7. Build para Android (APK)

```text
# Adicionar plataforma Android
npx cap add android

# Compilar o projeto
npm run build

# Sincronizar com Android
npx cap sync android

# Abrir no Android Studio
npx cap open android
```

### 8. Estrutura de Pastas

```text
src/
├── components/
│   ├── inspection/    # Componentes da inspeção
│   └── ui/            # Componentes shadcn/ui
├── hooks/             # Hooks customizados
├── pages/             # Páginas da aplicação
├── types/             # Tipos TypeScript
└── utils/             # Utilitários (PDF, etc)
```

### 9. Licença
- MIT (padrão)

---

## Detalhes Técnicos

### Alteração no capacitor.config.ts
```typescript
// De:
appName: 'Inspeção Elevadores TK'

// Para:
appName: 'Inspeção de Elevadores'
```

### Alteração no src/types/inspection.ts
```typescript
// De:
origin: 'tkE - Brasil'

// Para:
origin: 'Brasil'
```

---

## Idioma
Toda a documentação será escrita em português (pt-BR), mantendo consistência com o restante do aplicativo.

