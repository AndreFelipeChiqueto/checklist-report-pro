 # 📋 Inspeção de Elevadores
 
 Aplicativo mobile para inspeção e auditoria técnica de elevadores, baseado nas normas **NBR 16858 / EN-81**.
 
 ---
 
 ## 📖 Sobre o Projeto
 
 Este aplicativo foi desenvolvido para facilitar o processo de inspeção técnica de elevadores, oferecendo:
 
 - **Checklist completo** com 93 itens de verificação organizados em 10 seções
 - **Captura de fotos** para documentar não conformidades
 - **Geração de relatórios PDF** (Completo e Pendências)
 - **Estatísticas em tempo real** do progresso da inspeção
 - **Interface mobile-first** otimizada para uso em campo
 
 ---
 
 ## ✅ Seções de Inspeção
 
 | Seção | Descrição | Itens |
 |-------|-----------|-------|
 | 1.0 | Casa de Máquina | 11 |
 | 2.0 | Topo da Cabina | 12 |
 | 3.0 | Caixa de Corrida | 11 |
 | 4.0 | Contrapeso | 7 |
 | 5.0 | Poço | 9 |
 | 6.0 | Embaixo da Cabina | 8 |
 | 7.0 | Pavimento | 5 |
 | 8.0 | Cabina Interna | 7 |
 | 9.0 | Testes de Comissionamento | 19 |
 | 10.0 | Aplicação de CTC | 1 |
 
 **Total: 93 itens de verificação**
 
 ---
 
 ## 🚀 Funcionalidades
 
 - ✅ Checklist interativo com status (Conforme, Não Conforme, N/A, Pendente)
 - 📸 Captura de fotos com câmera do dispositivo
 - 💬 Comentários e observações por item
 - 📊 Estatísticas de progresso em tempo real
 - 📄 Geração de PDF - Relatório Completo
 - 📄 Geração de PDF - Apenas Pendências
 - 📝 Observações do cliente
 - 📋 Informações gerais da inspeção
 
 ---
 
 ## 🛠️ Tecnologias
 
 - **React 18** + **TypeScript**
 - **Vite** - Build tool
 - **Tailwind CSS** + **shadcn/ui** - Estilização
 - **Capacitor** - Build para Android (APK)
 - **jsPDF** - Geração de relatórios PDF
 
 ---
 
 ## 💻 Instalação e Execução Local
 
 **Pré-requisitos:** Node.js 18+
 
 ```bash
 # Clonar o repositório
 git clone <URL_DO_REPOSITORIO>
 
 # Entrar na pasta do projeto
 cd <NOME_DO_PROJETO>
 
 # Instalar dependências
 npm install
 
 # Iniciar servidor de desenvolvimento
 npm run dev
 ```
 
 O aplicativo estará disponível em `http://localhost:5173`
 
 ---
 
 ## 📱 Build para Android (APK)
 
 ```bash
 # Adicionar plataforma Android (primeira vez)
 npx cap add android
 
 # Compilar o projeto
 npm run build
 
 # Sincronizar com Android
 npx cap sync android
 
 # Abrir no Android Studio
 npx cap open android
 ```
 
 No Android Studio, selecione **Build > Build Bundle(s) / APK(s) > Build APK(s)** para gerar o arquivo APK.
 
 ---
 
 ## 📁 Estrutura de Pastas
 
 ```
 src/
 ├── components/
 │   ├── inspection/    # Componentes da inspeção
 │   │   ├── GeneralInfoForm.tsx
 │   │   ├── InspectionItemCard.tsx
 │   │   ├── SectionCard.tsx
 │   │   ├── PhotoCapture.tsx
 │   │   ├── PDFExportButtons.tsx
 │   │   └── ...
 │   └── ui/            # Componentes shadcn/ui
 ├── hooks/
 │   └── useInspection.ts  # Hook principal
 ├── pages/
 │   └── Index.tsx      # Página principal
 ├── types/
 │   └── inspection.ts  # Tipos TypeScript
 └── utils/
     └── pdfGenerator.ts # Geração de PDFs
 ```
 
 ---
 
 ## 📄 Licença
 
 Este projeto está sob a licença MIT.
