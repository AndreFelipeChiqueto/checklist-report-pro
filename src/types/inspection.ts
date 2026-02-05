export type ItemStatus = 'conforme' | 'nao_conforme' | 'nao_aplicavel' | 'pendente';

export interface InspectionItem {
  id: string;
  code: string;
  title: string;
  description: string;
  status: ItemStatus;
  comment: string;
  photoUrl?: string;
}

export interface InspectionSection {
  id: string;
  code: string;
  title: string;
  items: InspectionItem[];
}

export interface GeneralInfo {
  elevatorNumber: string;
  inspectionType: string;
  date: string;
  branch: string;
  sector: string;
  auditor: string;
  client: string;
  address: string;
  speed: string;
  stops: string;
  capacityKg: string;
  capacityPassengers: string;
  commandModel: string;
  origin: string;
  supervisor: string;
  adjuster: string;
  finalAuditResponsible: string;
  assemblerName: string;
  subcontractor: string;
}

export interface InspectionData {
  id: string;
  generalInfo: GeneralInfo;
  sections: InspectionSection[];
  clientObservations: string[];
  finalObservations: string;
  createdAt: string;
  updatedAt: string;
}

export const defaultGeneralInfo: GeneralInfo = {
  elevatorNumber: '',
  inspectionType: 'Auditoria Final',
  date: new Date().toISOString().split('T')[0],
  branch: '',
  sector: 'INSTALAÇÃO',
  auditor: '',
  client: '',
  address: '',
  speed: '',
  stops: '',
  capacityKg: '',
  capacityPassengers: '',
  commandModel: '',
   origin: 'Brasil',
  supervisor: '',
  adjuster: '',
  finalAuditResponsible: '',
  assemblerName: '',
  subcontractor: '',
};

export const inspectionSections: InspectionSection[] = [
  {
    id: 'section-1',
    code: '1.0',
    title: 'Casa de Máquina',
    items: [
      { id: '1.1', code: '1.1', title: 'Quadro de força', description: 'Fusíveis; Disjuntores; IDR; Cabeamento; Aterramento; Organização; Kit fechadura e/ou ferrolho', status: 'pendente', comment: '' },
      { id: '1.2', code: '1.2', title: 'Base/Máquina de Tração', description: 'Nível; Prumo; Fixação; Amortecedores; Proteção da polia; Anti-pulo; Verificação do PTC; conexões e aterramento', status: 'pendente', comment: '' },
      { id: '1.3', code: '1.3', title: 'Pesador de carga', description: 'Funcionamento; Fixação; Base; Ajuste', status: 'pendente', comment: '' },
      { id: '1.4', code: '1.4', title: 'Regulador de Velocidade', description: 'Fixação; Alinhamento; Nível; Aterramento; Proteção', status: 'pendente', comment: '' },
      { id: '1.5', code: '1.5', title: 'Auto Trafo (Transformador)', description: 'Fixação; terminais; proteção; aterramento', status: 'pendente', comment: '' },
      { id: '1.6', code: '1.6', title: 'Quadro de Comando', description: 'Fixação; Conexões; Fusíveis; Aterramento; Configuração; Organização; DIGITAL EOX', status: 'pendente', comment: '' },
      { id: '1.7', code: '1.7', title: 'Resgate manual/automático', description: 'Fixação; Conexões; Funcionamento; Verificação do volante e alavancas', status: 'pendente', comment: '' },
      { id: '1.8', code: '1.8', title: 'Regenerativo', description: 'Fixação; disjuntores; botões de inspeção; botão de emergência; Ligações; Fusíveis; Aterramentos; Configurações; Organização', status: 'pendente', comment: '' },
      { id: '1.9', code: '1.9', title: 'Sistema de Tração', description: 'Fixação; Alinhamento; Distorcimento; Equalização; ANTI-PULO; Lubrificação', status: 'pendente', comment: '' },
      { id: '1.10', code: '1.10', title: 'Suspensão/Tirantes cabina e Contrapeso', description: 'Fixação; Porca; contra-porcas; cupilhas; clips', status: 'pendente', comment: '' },
      { id: '1.11', code: '1.11', title: 'Condição geral da casa de máquinas', description: 'Organização; pintura; fechamento de buracos na laje; luz de emergência; limpeza; ventilação; extintores; normalização', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-2',
    code: '2.0',
    title: 'Topo da Cabina',
    items: [
      { id: '2.1', code: '2.1', title: 'Caixa de plugação', description: 'Fixação; Conexões; Aterramento; Funcionamento; DIGITAL EOX', status: 'pendente', comment: '' },
      { id: '2.2', code: '2.2', title: 'Estrutura e Painéis de fechamento do teto', description: 'Fixação; alinhamento', status: 'pendente', comment: '' },
      { id: '2.3', code: '2.3', title: 'Pesador de Carga', description: 'Fixação; ajuste; funcionamento', status: 'pendente', comment: '' },
      { id: '2.4', code: '2.4', title: 'Operador de Porta', description: 'Fixação; ajuste; rampa articulada; nivelamento; funcionamento', status: 'pendente', comment: '' },
      { id: '2.5', code: '2.5', title: 'Polia de desvio em cima da cabina', description: 'Fixação; Proteção; anti-pulo; lubrificação', status: 'pendente', comment: '' },
      { id: '2.6', code: '2.6', title: 'Aparelho de Segurança', description: 'Ajuste; Contato; funcionamento', status: 'pendente', comment: '' },
      { id: '2.7', code: '2.7', title: 'Chave Eletrônica e Sensor de nivelamento', description: 'Fixação; ajuste; funcionamento', status: 'pendente', comment: '' },
      { id: '2.8', code: '2.8', title: 'Corrediças superiores', description: 'Fixação; Ajuste; Pinagem; distorcimento', status: 'pendente', comment: '' },
      { id: '2.9', code: '2.9', title: 'Tirantes e suspensão', description: 'Fixação; Ajuste; Posicionamento', status: 'pendente', comment: '' },
      { id: '2.10', code: '2.10', title: 'Guarda Corpo', description: 'Fixação e posicionamento', status: 'pendente', comment: '' },
      { id: '2.11', code: '2.11', title: 'Rampa de Limites', description: 'Fixação; prumo e alinhamento', status: 'pendente', comment: '' },
      { id: '2.12', code: '2.12', title: 'Condições gerais em cima da cabina', description: 'Limpeza; organização; aterramento', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-3',
    code: '3.0',
    title: 'Caixa de Corrida',
    items: [
      { id: '3.1', code: '3.1', title: 'Portas de Pavimento', description: 'Ajuste; fixação; dispositivo da porta; saia/proteção; fechadura mecânica da porta; aterramento', status: 'pendente', comment: '' },
      { id: '3.2', code: '3.2', title: 'Suporte de guias', description: 'Fixação; posição; tornillos; distorção', status: 'pendente', comment: '' },
      { id: '3.3', code: '3.3', title: 'Guias', description: 'Fixação; lubrificação; emendas; aterramento; EGC; EGCP', status: 'pendente', comment: '' },
      { id: '3.4', code: '3.4', title: 'Cabo de Manobra', description: 'Fixação; distorcimento; proteções', status: 'pendente', comment: '' },
      { id: '3.5', code: '3.5', title: 'Canaletas e cableado', description: 'Fixação; Separação; Acabamento', status: 'pendente', comment: '' },
      { id: '3.6', code: '3.6', title: 'Placas e imãs de Paradas', description: 'Fixação; posicionamento', status: 'pendente', comment: '' },
      { id: '3.7', code: '3.7', title: 'Limites Parada e Final', description: 'Subida/Descida - Fixação; Posição; Funcionamento', status: 'pendente', comment: '' },
      { id: '3.8', code: '3.8', title: 'Limites de redução', description: 'Mecânico e/ou magnético - Fixação; Posição; Funcionamento', status: 'pendente', comment: '' },
      { id: '3.9', code: '3.9', title: 'Porta de Inspeção', description: 'Instalação; Contato de segurança; Abertura; fechamento; Aterramento do contato elétrico', status: 'pendente', comment: '' },
      { id: '3.10', code: '3.10', title: 'Medidas superiores de última altura', description: 'Medidas HA; HB; HC; posição; proteção', status: 'pendente', comment: '' },
      { id: '3.11', code: '3.11', title: 'Condição geral da caixa de corrida', description: 'Iluminação; Limpeza; Proteções; Aterramento', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-4',
    code: '4.0',
    title: 'Contrapeso',
    items: [
      { id: '4.1', code: '4.1', title: 'Corrediças Superiores e Inferiores', description: 'Fixação; ajuste; distorcimento; pinagem', status: 'pendente', comment: '' },
      { id: '4.2', code: '4.2', title: 'Polia de desvio', description: 'Fixação; Lubrificação; Anti-pulo; distorcimento; proteção', status: 'pendente', comment: '' },
      { id: '4.3', code: '4.3', title: 'Tirantes e suspensão', description: 'Fixação; porcas; contra-porcas; cupilhas', status: 'pendente', comment: '' },
      { id: '4.4', code: '4.4', title: 'Estrutura do contrapeso', description: 'Fixação; alinhamento; porcas; contraporcas; pedras; varão', status: 'pendente', comment: '' },
      { id: '4.5', code: '4.5', title: 'Sistema de compensação embaixo do contrapeso', description: 'Pontos de fixação 1 e 2; posicionamento; porcas; contraporcas', status: 'pendente', comment: '' },
      { id: '4.6', code: '4.6', title: 'Aparelho de Segurança', description: 'Fixação; posicionamento; ajuste; funcionamento', status: 'pendente', comment: '' },
      { id: '4.7', code: '4.7', title: 'Condições gerais do contrapeso', description: 'Organização; Limpeza', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-5',
    code: '5.0',
    title: 'Poço',
    items: [
      { id: '5.1', code: '5.1', title: 'Escada; pintura; geral fundo do poço', description: 'Área de segurança e limpeza', status: 'pendente', comment: '' },
      { id: '5.2', code: '5.2', title: 'Conjunto de caixa de inspeção e botão STOP', description: 'Fixação; posição; funcionamento', status: 'pendente', comment: '' },
      { id: '5.3', code: '5.3', title: 'Mola; Buffer ou Amortecedor hidráulico', description: 'Fixação; Posição; Prumo; Nível do óleo; contato; aterramento; LCAB e LCP', status: 'pendente', comment: '' },
      { id: '5.4', code: '5.4', title: 'Polia Tensora do regulador', description: 'Cabina e/ou contrapeso - Fixação; Aterramento; Altura; Funcionamento e Contato Elétrico', status: 'pendente', comment: '' },
      { id: '5.5', code: '5.5', title: 'Suportes da corrente de compensação', description: 'Fixação; Posição', status: 'pendente', comment: '' },
      { id: '5.6', code: '5.6', title: 'Guias e Polia dos cabos de compensação', description: 'Fixação; prumo; aterramento; funcionamento contato', status: 'pendente', comment: '' },
      { id: '5.7', code: '5.7', title: 'Guias e pé de guias de cabina e contrapeso', description: 'Fixação; aterramento de todas as guias; medidas', status: 'pendente', comment: '' },
      { id: '5.8', code: '5.8', title: 'Proteção do Contrapeso', description: 'Instalação e fixação', status: 'pendente', comment: '' },
      { id: '5.9', code: '5.9', title: 'Instalação do cabo de emergência da porta do 1º pavimento', description: 'Instalação e fixação', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-6',
    code: '6.0',
    title: 'Embaixo da Cabina',
    items: [
      { id: '6.1', code: '6.1', title: 'Cornija', description: 'Fixação; Posicionamento', status: 'pendente', comment: '' },
      { id: '6.2', code: '6.2', title: 'Corrediças embaixo da cabina', description: 'Fixação; Ajuste', status: 'pendente', comment: '' },
      { id: '6.3', code: '6.3', title: 'Aparelho de Segurança', description: 'Conjunto bloco e cunha - Ajuste; verificação das articulações; contato e funcionamento', status: 'pendente', comment: '' },
      { id: '6.4', code: '6.4', title: 'Sistema de Compensação embaixo da cabina', description: 'Pontos de fixação 1 e 2; alinhamento; posicionamento e medida', status: 'pendente', comment: '' },
      { id: '6.5', code: '6.5', title: 'Conjunto estrutural de cabina', description: 'Distorcimento; alinhamento; porca; contraporcas; cupilhas; polia de desvio', status: 'pendente', comment: '' },
      { id: '6.6', code: '6.6', title: 'Cabo de Manobra', description: 'Fixação e posicionamento', status: 'pendente', comment: '' },
      { id: '6.7', code: '6.7', title: 'Balanceamento Estático', description: 'Conferência; fixação e posicionamento', status: 'pendente', comment: '' },
      { id: '6.8', code: '6.8', title: 'Condição geral embaixo da cabina', description: 'Limpeza; Organização; Aterramento', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-7',
    code: '7.0',
    title: 'Pavimento',
    items: [
      { id: '7.1', code: '7.1', title: 'Porta e batentes', description: 'Alinhamento; Nível; Estado; Funcionamento; Aterramento; Ativação do dispositivo de abertura', status: 'pendente', comment: '' },
      { id: '7.2', code: '7.2', title: 'Botoeiras e indicadores', description: 'Fixação; alinhamento; prumo; aterramento; funcionamento', status: 'pendente', comment: '' },
      { id: '7.3', code: '7.3', title: 'Soleiras de pavimento', description: 'Nivelamento; Fixação; distâncias de soleiras', status: 'pendente', comment: '' },
      { id: '7.4', code: '7.4', title: 'Bombeiro e interfone', description: 'Prumo; Fixação; funcionamento', status: 'pendente', comment: '' },
      { id: '7.5', code: '7.5', title: 'Condição gerais do pavimento', description: 'Organização; fechamento completo do marco; Fechamento de vãos livres e limpeza', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-8',
    code: '8.0',
    title: 'Cabina Interna',
    items: [
      { id: '8.1', code: '8.1', title: 'Totem e painel de operação', description: 'Fixação; arranhões; aterramento; operação; DIGITAL EOX', status: 'pendente', comment: '' },
      { id: '8.2', code: '8.2', title: 'Painéis e SubTeto', description: 'Fixação; distorcimento; alinhamento; amassados; arranhões; limpeza', status: 'pendente', comment: '' },
      { id: '8.3', code: '8.3', title: 'Espelho e guarda-corpo', description: 'Instalação; fixação; Acabamentos', status: 'pendente', comment: '' },
      { id: '8.4', code: '8.4', title: 'Iluminação', description: 'Instalação; Funcionamento; Limpeza', status: 'pendente', comment: '' },
      { id: '8.5', code: '8.5', title: 'Iluminação de Emergência, Interfone, alarme; Ventilação; cabineiro', description: 'Instalação; Operação; DIGITAL EOX', status: 'pendente', comment: '' },
      { id: '8.6', code: '8.6', title: 'Porta de cabina e régua de segurança', description: 'Ajuste; Prumo; Alinhamento; funcionamento; car door lock', status: 'pendente', comment: '' },
      { id: '8.7', code: '8.7', title: 'Piso de cabina e condições gerais', description: 'Instalação; Limpeza; organização', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-9',
    code: '9.0',
    title: 'Testes de Comissionamento',
    items: [
      { id: '9.1', code: '9.1', title: 'Teste dos botões de operação no QC', description: 'Sistema de segurança - Fusíveis e disjuntores', status: 'pendente', comment: '' },
      { id: '9.2', code: '9.2', title: 'Medição de resistência de isolamento e aterramento', description: 'Norma NBR 16858/EN-81 - Comprovação com Megômetro', status: 'pendente', comment: '' },
      { id: '9.3', code: '9.3', title: 'Teste de continuidade (Aterramento)', description: 'Borne de terra principal e as partes do elevador', status: 'pendente', comment: '' },
      { id: '9.4', code: '9.4', title: 'Teste de tração em subida (cabina vazia)', description: 'Realizar parada com botão stop, verificando a parada do elevador', status: 'pendente', comment: '' },
      { id: '9.5', code: '9.5', title: 'Teste do(s) para-choque(s) do contrapeso', description: 'A cabina não pode mover-se para cima quando o contrapeso toca os para-choques comprimidos', status: 'pendente', comment: '' },
      { id: '9.6', code: '9.6', title: 'Testar meios de proteção contra sobrevelocidade ascendente', description: 'Os meios de proteção devem atuar na velocidade especificada', status: 'pendente', comment: '' },
      { id: '9.7', code: '9.7', title: 'Teste de balanceamento de cabina e contrapeso', description: 'Deve ser possível mover a cabine naturalmente ou por meios alternativos', status: 'pendente', comment: '' },
      { id: '9.8', code: '9.8', title: 'Teste de velocidade com 50% da carga nominal', description: 'Medir velocidade: Nominal subida/descida; Nivelamento; renivelamento; Inspeção; Operação elétrica em emergência', status: 'pendente', comment: '' },
      { id: '9.9', code: '9.9', title: 'Testes dos limites finais subida e descida', description: 'Teste nos extremos inferior e superior', status: 'pendente', comment: '' },
      { id: '9.10', code: '9.10', title: 'Teste do freio (individual)', description: 'Teste; ajuste; verificação dos freios individualmente', status: 'pendente', comment: '' },
      { id: '9.11', code: '9.11', title: 'Teste UCM (movimento não intencional da cabina)', description: 'NBR 16858-1:2021 - item 6.3.13', status: 'pendente', comment: '' },
      { id: '9.12', code: '9.12', title: 'Teste do limitador de velocidade e aparelho de segurança', description: 'Cabina e contrapeso - NBR 16858-1:2021 - item 6.3.4', status: 'pendente', comment: '' },
      { id: '9.13', code: '9.13', title: 'Teste de tração em descida', description: 'NBR 16858-1:2021 - item 6.3.3', status: 'pendente', comment: '' },
      { id: '9.14', code: '9.14', title: 'Teste do freio (deslize e escorregamento)', description: 'Realize a prova com 3 paradas pulsando o botão STOP', status: 'pendente', comment: '' },
      { id: '9.15', code: '9.15', title: 'Teste do pesador de carga', description: 'Verificação do funcionamento', status: 'pendente', comment: '' },
      { id: '9.16', code: '9.16', title: 'Conforto; vibração e ajustes', description: 'Verificação dos parâmetros', status: 'pendente', comment: '' },
      { id: '9.17', code: '9.17', title: 'Testes dos opcionais', description: 'ADC; AGILE; Biotracking; instalação; funcionamento; aterramento', status: 'pendente', comment: '' },
      { id: '9.18', code: '9.18', title: 'Teste do sistema regenerativo', description: 'Verificação do funcionamento', status: 'pendente', comment: '' },
      { id: '9.19', code: '9.19', title: 'Certificação dos ensaios', description: 'Inserir etiqueta de certificação - Norma NBR 16858/EN-81', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-10',
    code: '10.0',
    title: 'Aplicação de Circular Técnica Corretiva (CTC)',
    items: [
      { id: '10.1', code: '10.1', title: 'Circular Técnica Corretiva', description: 'Verificação conforme a gestão de CTCs da filial - Blindagem da CAN Cabo de manobra', status: 'pendente', comment: '' },
    ],
  },
];
