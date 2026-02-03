import { GeneralInfo } from '@/types/inspection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, User, MapPin, Gauge, Calendar } from 'lucide-react';

interface GeneralInfoFormProps {
  info: GeneralInfo;
  onChange: (info: Partial<GeneralInfo>) => void;
}

export const GeneralInfoForm = ({ info, onChange }: GeneralInfoFormProps) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="gradient-primary rounded-2xl p-6 text-primary-foreground">
        <h2 className="text-xl font-bold mb-1">Informações Gerais</h2>
        <p className="text-primary-foreground/80 text-sm">Dados do elevador e da inspeção</p>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-xl border p-4 space-y-4 shadow-card">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Building2 className="w-5 h-5" />
            Elevador
          </div>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="elevatorNumber">Número do Elevador</Label>
              <Input
                id="elevatorNumber"
                value={info.elevatorNumber}
                onChange={(e) => onChange({ elevatorNumber: e.target.value })}
                placeholder="Ex: 205322"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="speed">Velocidade</Label>
                <Input
                  id="speed"
                  value={info.speed}
                  onChange={(e) => onChange({ speed: e.target.value })}
                  placeholder="m/s"
                />
              </div>
              <div>
                <Label htmlFor="stops">Paradas</Label>
                <Input
                  id="stops"
                  type="number"
                  value={info.stops}
                  onChange={(e) => onChange({ stops: e.target.value })}
                  placeholder="Qtd"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="capacityKg">Capacidade (kg)</Label>
                <Input
                  id="capacityKg"
                  value={info.capacityKg}
                  onChange={(e) => onChange({ capacityKg: e.target.value })}
                  placeholder="kg"
                />
              </div>
              <div>
                <Label htmlFor="capacityPassengers">Passageiros</Label>
                <Input
                  id="capacityPassengers"
                  type="number"
                  value={info.capacityPassengers}
                  onChange={(e) => onChange({ capacityPassengers: e.target.value })}
                  placeholder="Qtd"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="commandModel">Modelo do Quadro de Comando</Label>
              <Input
                id="commandModel"
                value={info.commandModel}
                onChange={(e) => onChange({ commandModel: e.target.value })}
                placeholder="Ex: MC5-EOX"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-4 space-y-4 shadow-card">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <MapPin className="w-5 h-5" />
            Cliente e Local
          </div>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={info.client}
                onChange={(e) => onChange({ client: e.target.value })}
                placeholder="Nome do cliente"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={info.address}
                onChange={(e) => onChange({ address: e.target.value })}
                placeholder="Endereço completo"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="branch">Filial</Label>
                <Input
                  id="branch"
                  value={info.branch}
                  onChange={(e) => onChange({ branch: e.target.value })}
                  placeholder="Filial"
                />
              </div>
              <div>
                <Label htmlFor="sector">Setor</Label>
                <Input
                  id="sector"
                  value={info.sector}
                  onChange={(e) => onChange({ sector: e.target.value })}
                  placeholder="Setor"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-4 space-y-4 shadow-card">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <User className="w-5 h-5" />
            Responsáveis
          </div>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="auditor">Auditor Responsável</Label>
              <Input
                id="auditor"
                value={info.auditor}
                onChange={(e) => onChange({ auditor: e.target.value })}
                placeholder="Nome do auditor"
              />
            </div>

            <div>
              <Label htmlFor="supervisor">Supervisor</Label>
              <Input
                id="supervisor"
                value={info.supervisor}
                onChange={(e) => onChange({ supervisor: e.target.value })}
                placeholder="Nome do supervisor"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="assemblerName">Montador</Label>
                <Input
                  id="assemblerName"
                  value={info.assemblerName}
                  onChange={(e) => onChange({ assemblerName: e.target.value })}
                  placeholder="Nome"
                />
              </div>
              <div>
                <Label htmlFor="subcontractor">Empresa</Label>
                <Input
                  id="subcontractor"
                  value={info.subcontractor}
                  onChange={(e) => onChange({ subcontractor: e.target.value })}
                  placeholder="Empresa"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-4 space-y-4 shadow-card">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Calendar className="w-5 h-5" />
            Data da Inspeção
          </div>
          
          <Input
            type="date"
            value={info.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
