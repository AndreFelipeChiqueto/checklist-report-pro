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
      { id: '1.1', code: '1.1', title: 'Quadro de força', description: '(Fusíveis; Disjuntores; IDR; Cabeamento; Aterramento; Organização; Kit fechadura e/ou ferrolho)\n\n********** Item 1.2 do PROTOCOLO MHC2 e EOX: Verificar as condições da energia do empreendimento', status: 'pendente', comment: '' },
      { id: '1.2', code: '1.2', title: 'Base/Máquina de Tração', description: '(Nível; Prumo; Fixação; Amortecedores; Proteção da polia; Anti-pulo; Verificação do PTC das máquinas; conexões e aterramento)\n\n********** Item 5.3 do PROTOCOLO MHC2: Fixação do encoder', status: 'pendente', comment: '' },
      { id: '1.3', code: '1.3', title: 'Pesador de carga', description: '(Funcionamento; Fixação; Base; Ajuste)', status: 'pendente', comment: '' },
      { id: '1.4', code: '1.4', title: 'Regulador de Velocidade', description: '(Fixação; Alinhamento; Nível; Aterramento; Proteção)\n\n********** PROTOCOLO EOX: Item 3.1 Verificar a posição do regulador de velocidade', status: 'pendente', comment: '' },
      { id: '1.5', code: '1.5', title: 'Auto Trafo (Transformador)', description: '(Fixação; terminais; proteção; aterramento)', status: 'pendente', comment: '' },
      { id: '1.6', code: '1.6', title: 'Quadro de Comando', description: 'NBR 16858-1:2021: Ensaios antes da entrega para serviços.\n(Fixação; Conexões; Fusíveis; Aterramento; Configuração; Organização; DIGITAL EOX)\n\n********** PROTOCOLO MHC2:\nItem 2.1 Verificar se o job da obra condiz com o referido quadro de comando e elevador\nItem 2.2 Verificação da versão de software do controlador MHC2\nItem 2.3 Verificar configuração do tipo de pesador utilizado\nItem 2.5 Verificar parâmetros de calibração do pesador\nItem 2.6 Verificar existência de rollback\nItem 2.7 Verificar variação da leitura de carga do pesador de carga\nItem 4.1 Aterramento\nItem 4.2 Fiações frouxas\nItem 4.3 Contatoras\nItem 11.0 Parâmetros importantes', status: 'pendente', comment: '' },
      { id: '1.7', code: '1.7', title: 'Resgate manual/automático', description: 'NBR 16858-1:2021 - Ensaios antes da entrega para serviços.\n(Fixação; Conexões; Funcionamento; Verificação do volante e alavancas)\n\n********** Item 3.1 do PROTOCOLO MHC2: Verificar o funcionamento do resgate automático', status: 'pendente', comment: '' },
      { id: '1.8', code: '1.8', title: 'Regenerativo', description: '(Fixação; disjuntores; botões de inspeção; botão de emergência; Ligações; Fusíveis; Aterramentos; Configurações; Organização)', status: 'pendente', comment: '' },
      { id: '1.9', code: '1.9', title: 'Sistema de Tração', description: '(Fixação; Alinhamento; Distorcimento; Equalização; ANTI-PULO; Lubrificação)\n\nNota: Favor anexar foto da etiqueta de equalização e vídeo de distorcimento dos cabos', status: 'pendente', comment: '' },
      { id: '1.10', code: '1.10', title: 'Suspensão/Tirantes cabina e Contrapeso', description: '(Fixação; Porca; contra-porcas; cupilhas; clips)', status: 'pendente', comment: '' },
      { id: '1.11', code: '1.11', title: 'Condição geral da casa de máquinas', description: '(Organização; pintura; fechamento de buracos na laje; luz de emergência; limpeza; ventilação; extintores; normalização)\n\n********** PROTOCOLO MHC2:\nPonto 5.1 Ligação à terra\nPonto 5.2 Separação total de todas as linhas CAN das linhas com tensão alternada (VAC) - Parte superior do duto MRL\n\n********** PROTOCOLO EOX: Item 3.3 Distância entre a fiação do codificador do variador e a alimentação trifásica', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-2',
    code: '2.0',
    title: 'Topo da Cabina',
    items: [
      { id: '2.1', code: '2.1', title: 'Caixa de plugação', description: '(Fixação; Conexões; Aterramento; Funcionamento; DIGITAL EOX)\n\n********** Item 6.4 do PROTOCOLO MHC2: Aterramento\n\n********** PROTOCOLO EOX:\nItem 4.1 Conexão do MAX - cabo ethernet (CTC 286)\nItem 4.2 Para elevadores com CPTB ou CIB e com renivelamento, avaliar histórico de falhas e presença de diodos nos módulos', status: 'pendente', comment: '' },
      { id: '2.2', code: '2.2', title: 'Estrutura e Painéis de fechamento do teto', description: '(Fixação; alinhamento)\n\n********** PROTOCOLO MHC2: Item 6.3 Instalação e posicionamento dos mordentes da cabina', status: 'pendente', comment: '' },
      { id: '2.3', code: '2.3', title: 'Pesador de Carga', description: '(Fixação; ajuste; funcionamento)', status: 'pendente', comment: '' },
      { id: '2.4', code: '2.4', title: 'Operador de Porta', description: '(Fixação; ajuste; rampa articulada; nivelamento; funcionamento)\n\n********** Item 6.5 do PROTOCOLO MHC2: Avaliação das condições gerais do operador de porta', status: 'pendente', comment: '' },
      { id: '2.5', code: '2.5', title: 'Polia de desvio em cima da cabina', description: '(Fixação; Proteção; anti-pulo; lubrificação)', status: 'pendente', comment: '' },
      { id: '2.6', code: '2.6', title: 'Aparelho de Segurança', description: '(Ajuste; Contato; funcionamento)', status: 'pendente', comment: '' },
      { id: '2.7', code: '2.7', title: 'Chave Eletrônica e Sensor de nivelamento', description: '(Fixação; ajuste; funcionamento)\n\n********** Item 6.2 do PROTOCOLO MHC2: Sensor de posicionamento APS', status: 'pendente', comment: '' },
      { id: '2.8', code: '2.8', title: 'Corrediças superiores', description: '(Fixação; Ajuste; Pinagem; distorcimento)', status: 'pendente', comment: '' },
      { id: '2.9', code: '2.9', title: 'Tirantes e suspensão', description: '(Fixação; Ajuste; Posicionamento)', status: 'pendente', comment: '' },
      { id: '2.10', code: '2.10', title: 'Guarda Corpo', description: '(Fixação e posicionamento)', status: 'pendente', comment: '' },
      { id: '2.11', code: '2.11', title: 'Rampa de Limites', description: '(Fixação; prumo e alinhamento)', status: 'pendente', comment: '' },
      { id: '2.12', code: '2.12', title: 'Condições gerais em cima da cabina', description: '(Limpeza; organização; aterramento)\n\n********** Ponto 6.4 do PROTOCOLO MHC2: Aterramento', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-3',
    code: '3.0',
    title: 'Caixa de Corrida',
    items: [
      { id: '3.1', code: '3.1', title: 'Portas de Pavimento', description: 'NBR 16858-1:2021 - ponto 6.3.12 - Ensaios prévios à entrega para serviços.\n(Ajuste; fixação; dispositivo da porta; saia/proteção; fechadura mecânica da porta; aterramento)\n\n********** Item 10.3 do PROTOCOLO MHC2: Verificar as condições gerais das portas de pavimento', status: 'pendente', comment: '' },
      { id: '3.2', code: '3.2', title: 'Suporte de guias', description: '(Fixação; posição; tornillos; distorção)', status: 'pendente', comment: '' },
      { id: '3.3', code: '3.3', title: 'Guias', description: '(Fixação; lubrificação; emendas; aterramento; EGC; EGCP)', status: 'pendente', comment: '' },
      { id: '3.4', code: '3.4', title: 'Cabo de Manobra', description: '(Fixação; distorcimento; proteções)', status: 'pendente', comment: '' },
      { id: '3.5', code: '3.5', title: 'Canaletas e cableado', description: '(Fixação; Separação; Acabamento)\n\n********** Item 7.1 do PROTOCOLO MHC2: Separação total de todas as linhas CAN das linhas com tensão alternada (VAC) - Descida até ao poço', status: 'pendente', comment: '' },
      { id: '3.6', code: '3.6', title: 'Placas e imãs de Paradas', description: 'NBR 16858-1:2021 - item 6.3.2 - Ensaios antes da entrega para serviços.\n(Fixação; posicionamento)', status: 'pendente', comment: '' },
      { id: '3.7', code: '3.7', title: 'Limites Parada e Final', description: 'Subida/Descida\n(Fixação; Posição; Funcionamento)', status: 'pendente', comment: '' },
      { id: '3.8', code: '3.8', title: 'Limites de redução', description: 'Mecânico e/ou magnético\n(Fixação; Posição; Funcionamento)', status: 'pendente', comment: '' },
      { id: '3.9', code: '3.9', title: 'Porta de Inspeção', description: '(Instalação; Contato de segurança; Abertura; fechamento; Aterramento do contato elétrico)', status: 'pendente', comment: '' },
      { id: '3.10', code: '3.10', title: 'Medidas superiores de última altura', description: '(Medidas HA; HB; HC; posição; proteção)', status: 'pendente', comment: '' },
      { id: '3.11', code: '3.11', title: 'Condição geral da caixa de corrida', description: '(Iluminação; Limpeza; Proteções; Aterramento)\n\n********** Item 7.3 do PROTOCOLO MHC2: Verificar versão de software dos MRPTCs', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-4',
    code: '4.0',
    title: 'Contrapeso',
    items: [
      { id: '4.1', code: '4.1', title: 'Corrediças Superiores e Inferiores', description: '(Fixação; ajuste; distorcimento; pinagem)', status: 'pendente', comment: '' },
      { id: '4.2', code: '4.2', title: 'Polia de desvio', description: '(Fixação; Lubrificação; Anti-pulo; distorcimento; proteção)', status: 'pendente', comment: '' },
      { id: '4.3', code: '4.3', title: 'Tirantes e suspensão', description: '(Fixação; porcas; contra-porcas; cupilhas)', status: 'pendente', comment: '' },
      { id: '4.4', code: '4.4', title: 'Estrutura do contrapeso', description: '(Fixação; alinhamento; porcas; contraporcas; pedras; varão)', status: 'pendente', comment: '' },
      { id: '4.5', code: '4.5', title: 'Sistema de compensação embaixo do contrapeso', description: '(Pontos de fixação 1 e 2; posicionamento; porcas; contraporcas)', status: 'pendente', comment: '' },
      { id: '4.6', code: '4.6', title: 'Aparelho de Segurança', description: '(Fixação; posicionamento; ajuste; funcionamento)', status: 'pendente', comment: '' },
      { id: '4.7', code: '4.7', title: 'Condições gerais do contrapeso', description: '(Organização; Limpeza)', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-5',
    code: '5.0',
    title: 'Poço',
    items: [
      { id: '5.1', code: '5.1', title: 'Escada; pintura; geral fundo do poço', description: '(Área de segurança e limpeza)', status: 'pendente', comment: '' },
      { id: '5.2', code: '5.2', title: 'Conjunto de caixa de inspeção e botão STOP', description: '(Fixação; posição; funcionamento)\nSe houver mais de um, verificar ambos.\n\n********** PROTOCOLO MHC2:\nItem 8.2 Aterramento\nItem 8.3 Ancoragem dos rabichos da Pit Box\nItem 8.4 Separação da Pit Box das botoeiras', status: 'pendente', comment: '' },
      { id: '5.3', code: '5.3', title: 'Mola; Buffer ou Amortecedor hidráulico', description: '(Fixação; Posição; Prumo; Nível do óleo; contato; aterramento; LCAB e LCP)', status: 'pendente', comment: '' },
      { id: '5.4', code: '5.4', title: 'Polia Tensora do regulador', description: 'Cabina e/ou contrapeso\n(Fixação; Aterramento; Altura; Funcionamento e Contato Elétrico)', status: 'pendente', comment: '' },
      { id: '5.5', code: '5.5', title: 'Suportes da corrente de compensação', description: '(Fixação; Posição)', status: 'pendente', comment: '' },
      { id: '5.6', code: '5.6', title: 'Guias e Polia dos cabos de compensação', description: '(Fixação; prumo; aterramento; funcionamento contato)', status: 'pendente', comment: '' },
      { id: '5.7', code: '5.7', title: 'Guias e pé de guias de cabina e contrapeso', description: '(Fixação; aterramento de todas as guias; medidas)\n\n********** Item 8.1 do PROTOCOLO MHC2: Verificar a medida de tensionamento da mola da fita metálica', status: 'pendente', comment: '' },
      { id: '5.8', code: '5.8', title: 'Proteção do Contrapeso', description: '(Instalação e fixação)', status: 'pendente', comment: '' },
      { id: '5.9', code: '5.9', title: 'Instalação do cabo de emergência da porta do 1º pavimento', description: '(Instalação e fixação)', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-6',
    code: '6.0',
    title: 'Embaixo da Cabina',
    items: [
      { id: '6.1', code: '6.1', title: 'Cornija', description: '(Fixação; Posicionamento)', status: 'pendente', comment: '' },
      { id: '6.2', code: '6.2', title: 'Corrediças embaixo da cabina', description: '(Fixação; Ajuste)', status: 'pendente', comment: '' },
      { id: '6.3', code: '6.3', title: 'Aparelho de Segurança', description: 'Conjunto bloco e cunha\n(Ajuste; verificação das articulações; contato e funcionamento)\n\n********** Item 9.3 do PROTOCOLO MHC2: Verificar o modelo de contato de segurança do aparelho de segurança (CTC257)', status: 'pendente', comment: '' },
      { id: '6.4', code: '6.4', title: 'Sistema de Compensação embaixo da cabina', description: '(Pontos de fixação 1 e 2; alinhamento; posicionamento e medida)', status: 'pendente', comment: '' },
      { id: '6.5', code: '6.5', title: 'Conjunto estrutural de cabina', description: '(Distorcimento; alinhamento; porca; contraporcas; cupilhas; polia de desvio)\n\n********** Item 9.2 do PROTOCOLO MHC2: Ajuste e posicionamento das borrachas amortecedoras', status: 'pendente', comment: '' },
      { id: '6.6', code: '6.6', title: 'Cabo de Manobra', description: '(Fixação e posicionamento)', status: 'pendente', comment: '' },
      { id: '6.7', code: '6.7', title: 'Balanceamento Estático', description: '(Conferência; fixação e posicionamento)', status: 'pendente', comment: '' },
      { id: '6.8', code: '6.8', title: 'Condição geral embaixo da cabina', description: '(Limpeza; Organização; Aterramento)\n\n********** Item 9.1 do PROTOCOLO MHC2: Posicionamento do sensor magnético (pesador de carga)', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-7',
    code: '7.0',
    title: 'Pavimento',
    items: [
      { id: '7.1', code: '7.1', title: 'Porta e batentes', description: '(Alinhamento; Nível; Estado; Funcionamento; Aterramento; Ativação do dispositivo de abertura da porta do pavimento)\n\n********** Item 10.3 do PROTOCOLO MHC2: Verificar as condições gerais das portas de pavimento', status: 'pendente', comment: '' },
      { id: '7.2', code: '7.2', title: 'Botoeiras e indicadores', description: '(Fixação; alinhamento; prumo; aterramento; funcionamento)\n\n********** PROTOCOLO MHC2:\nItem 10.1 Versão de software das botoeiras e indicadores VEGA\nItem 10.2 Versão de software das botoeiras BSLPC', status: 'pendente', comment: '' },
      { id: '7.3', code: '7.3', title: 'Soleiras de pavimento', description: '(Nivelamento; Fixação; distâncias de soleiras)', status: 'pendente', comment: '' },
      { id: '7.4', code: '7.4', title: 'Bombeiro e interfone', description: '(Prumo; Fixação; funcionamento)', status: 'pendente', comment: '' },
      { id: '7.5', code: '7.5', title: 'Condição gerais do pavimento', description: '(Organização; fechamento completo do marco; Fechamento de vãos livres e limpeza)', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-8',
    code: '8.0',
    title: 'Cabina Interna',
    items: [
      { id: '8.1', code: '8.1', title: 'Totem e painel de operação', description: '(Fixação; arranhões; aterramento; operação; DIGITAL EOX)', status: 'pendente', comment: '' },
      { id: '8.2', code: '8.2', title: 'Painéis e SubTeto', description: '(Fixação; distorcimento; alinhamento; amassados; arranhões; limpeza)', status: 'pendente', comment: '' },
      { id: '8.3', code: '8.3', title: 'Espelho e guarda-corpo', description: '(Instalação; fixação; Acabamentos)', status: 'pendente', comment: '' },
      { id: '8.4', code: '8.4', title: 'Iluminação', description: '(Instalação; Funcionamento; Limpeza)', status: 'pendente', comment: '' },
      { id: '8.5', code: '8.5', title: 'Iluminação de Emergência, Interfone, alarme; Ventilação; cabineiro', description: '(Instalação; Operação; DIGITAL EOX)', status: 'pendente', comment: '' },
      { id: '8.6', code: '8.6', title: 'Porta de cabina e régua de segurança', description: '(Ajuste; Prumo; Alinhamento; funcionamento; car door lock)', status: 'pendente', comment: '' },
      { id: '8.7', code: '8.7', title: 'Piso de cabina e condições gerais', description: '(Instalação; Limpeza; organização)', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-9',
    code: '9.0',
    title: 'Testes de Comissionamento',
    items: [
      { id: '9.1', code: '9.1', title: 'Teste dos botões de operação no QC', description: 'Sistema de segurança - Fusíveis e disjuntores', status: 'pendente', comment: '' },
      { id: '9.2', code: '9.2', title: 'Medição de resistência de isolamento e aterramento', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.2 - Ensaios antes da entrega para serviços.\n(Comprovação com Megômetro)', status: 'pendente', comment: '' },
      { id: '9.3', code: '9.3', title: 'Teste de continuidade (Aterramento)', description: 'Norma NBR 16858/EN-81\n(Borne de terra principal e as partes do elevador)', status: 'pendente', comment: '' },
      { id: '9.4', code: '9.4', title: 'Teste de tração em subida (cabina vazia)', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.3 - Ensaios antes da entrega para serviços.\n(Realizar parada com botão stop, verificando a parada do elevador)', status: 'pendente', comment: '' },
      { id: '9.5', code: '9.5', title: 'Teste do(s) para-choque(s) do contrapeso', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.7 - Ensaios antes da entrega para serviços.\n(A cabina não pode mover-se para cima quando o contrapeso toca os para-choques comprimidos)', status: 'pendente', comment: '' },
      { id: '9.6', code: '9.6', title: 'Testar meios de proteção contra sobrevelocidade ascendente', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.11 - Ensaios antes da entrega para serviços.\n(Os meios de proteção devem atuar na velocidade especificada)', status: 'pendente', comment: '' },
      { id: '9.7', code: '9.7', title: 'Teste de balanceamento de cabina e contrapeso', description: 'Norma NBR 16858/EN-81\n(Deve ser possível mover a cabine naturalmente ou por meios alternativos)\n\n********** Item 2.4 do PROTOCOLO MHC2: Parâmetro de balanceamento da cabine', status: 'pendente', comment: '' },
      { id: '9.8', code: '9.8', title: 'Teste de velocidade com 50% da carga nominal', description: 'Norma NBR 16858/EN-81\n(Medir velocidade: Nominal subida; Nominal descida; Nivelamento; renivelamento; Inspeção; Operação elétrica em emergência)', status: 'pendente', comment: '' },
      { id: '9.9', code: '9.9', title: 'Testes dos limites finais subida e descida', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.2 - Ensaios antes da entrega para serviços.\n(Teste nos extremos inferior e superior)', status: 'pendente', comment: '' },
      { id: '9.10', code: '9.10', title: 'Teste do freio (individual)', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.1 B - Ensaios antes da entrega para serviços.\n(Teste; ajuste; verificação dos freios individualmente)', status: 'pendente', comment: '' },
      { id: '9.11', code: '9.11', title: 'Teste UCM (movimento não intencional da cabina)', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.13 - Ensaios antes da entrega para serviços.', status: 'pendente', comment: '' },
      { id: '9.12', code: '9.12', title: 'Teste do limitador de velocidade e aparelho de segurança', description: 'Cabina e contrapeso - Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.4 - Ensaio antes de entregar para serviços.', status: 'pendente', comment: '' },
      { id: '9.13', code: '9.13', title: 'Teste de tração em descida', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.3 - Ensaios antes da entrega para serviços.', status: 'pendente', comment: '' },
      { id: '9.14', code: '9.14', title: 'Teste do freio (deslize e escorregamento)', description: 'Norma NBR 16858/EN-81\nNBR 16858-1:2021 - item 6.3.1 A - Ensaios antes da entrega para serviços.\n(Realize a prova com 3 paradas pulsando o botão STOP)', status: 'pendente', comment: '' },
      { id: '9.15', code: '9.15', title: 'Teste do pesador de carga', description: '(Verificação do funcionamento)', status: 'pendente', comment: '' },
      { id: '9.16', code: '9.16', title: 'Conforto; vibração e ajustes', description: '(Verificação dos parâmetros)', status: 'pendente', comment: '' },
      { id: '9.17', code: '9.17', title: 'Testes dos opcionais', description: '(ADC; AGILE; Biotracking; instalação; funcionamento; aterramento)', status: 'pendente', comment: '' },
      { id: '9.18', code: '9.18', title: 'Teste do sistema regenerativo', description: '(Verificação do funcionamento)', status: 'pendente', comment: '' },
      { id: '9.19', code: '9.19', title: 'Certificação dos ensaios', description: 'Norma NBR 16858/EN-81\n(Inserir etiqueta de certificação)', status: 'pendente', comment: '' },
    ],
  },
  {
    id: 'section-10',
    code: '10.0',
    title: 'Aplicação de Circular Técnica Corretiva (CTC)',
    items: [
      { id: '10.1', code: '10.1', title: 'Circular Técnica Corretiva', description: 'Verificação conforme a gestão de CTCs da filial\n\n********** Item 6.1 do PROTOCOLO MHC2: Blindagem da CAN Cabo de manobra', status: 'pendente', comment: '' },
    ],
  },
];
