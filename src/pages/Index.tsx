import { useState } from 'react';
import { useInspection } from '@/hooks/useInspection';
import { GeneralInfoForm } from '@/components/inspection/GeneralInfoForm';
import { SectionCard } from '@/components/inspection/SectionCard';
import { StatisticsCard } from '@/components/inspection/StatisticsCard';
import { ClientObservations } from '@/components/inspection/ClientObservations';
import { PDFExportButtons } from '@/components/inspection/PDFExportButtons';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Settings, ListChecks, FileOutput, ChevronLeft, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
type Tab = 'info' | 'checklist' | 'export';
const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const {
    inspection,
    updateGeneralInfo,
    updateItemStatus,
    updateItemComment,
    addItemPhoto,
    removeItemPhoto,
    addClientObservation,
    removeClientObservation,
    getStatistics,
    getPendingItems,
    resetInspection
  } = useInspection();
  const stats = getStatistics();
  const pendingItems = getPendingItems();
  const tabs = [{
    id: 'info' as Tab,
    label: 'Info',
    icon: Settings
  }, {
    id: 'checklist' as Tab,
    label: 'Checklist',
    icon: ListChecks
  }, {
    id: 'export' as Tab,
    label: 'Exportar',
    icon: FileOutput
  }];
  return <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Inspeção de Elevador</h1>
              <p className="text-xs text-muted-foreground">Elevadores - ON/MI</p>
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reiniciar inspeção?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação irá apagar todos os dados preenchidos. Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={resetInspection}>
                  Reiniciar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 space-y-4 max-w-lg mx-auto">
        {activeTab === 'info' && <GeneralInfoForm info={inspection.generalInfo} onChange={updateGeneralInfo} />}

        {activeTab === 'checklist' && <div className="space-y-4">
            <StatisticsCard {...stats} />
            
            {inspection.sections.map(section => <SectionCard key={section.id} section={section} onStatusChange={(itemId, status) => updateItemStatus(section.id, itemId, status)} onCommentChange={(itemId, comment) => updateItemComment(section.id, itemId, comment)} onPhotoAdd={(itemId, photoUrl) => addItemPhoto(section.id, itemId, photoUrl)} onPhotoRemove={(itemId, index) => removeItemPhoto(section.id, itemId, index)} />)}

            <ClientObservations observations={inspection.clientObservations} onAdd={addClientObservation} onRemove={removeClientObservation} />
          </div>}

        {activeTab === 'export' && <div className="space-y-6">
            <StatisticsCard {...stats} />
            
            <div className="bg-card rounded-2xl border shadow-card p-4 space-y-4">
              <div className="gradient-primary rounded-xl p-4 -mx-4 -mt-4">
                <h3 className="font-bold text-primary-foreground">Gerar Relatórios</h3>
                <p className="text-sm text-primary-foreground/80">Exporte os resultados em PDF</p>
              </div>

              <PDFExportButtons data={inspection} pendingCount={stats.naoConforme} />
            </div>

            {pendingItems.length > 0 && <div className="bg-card rounded-2xl border shadow-card p-4 space-y-4">
                <div className="flex items-center gap-2 text-destructive">
                  <div className="w-8 h-8 rounded-full bg-destructive/15 flex items-center justify-center">
                    <span className="text-sm font-bold">{pendingItems.length}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Itens Não Conformes</h4>
                    <p className="text-xs text-muted-foreground">Requerem atenção</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {pendingItems.map(({
              section,
              item
            }) => <li key={item.id} className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="text-sm font-medium text-foreground">{item.code} - {item.title}</div>
                      <div className="text-xs text-muted-foreground">{section}</div>
                      {item.comment && <div className="text-xs text-destructive mt-1 italic">{item.comment}</div>}
                    </li>)}
                </ul>
              </div>}
          </div>}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg">
        <div className="flex max-w-lg mx-auto">
          {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('flex-1 flex flex-col items-center gap-1 py-3 px-4 transition-colors', activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}>
              <tab.icon className={cn('w-6 h-6', activeTab === tab.id && 'text-accent')} />
              <span className="text-xs font-medium">{tab.label}</span>
              {tab.id === 'checklist' && stats.naoConforme > 0 && <span className="absolute top-2 right-1/4 w-2 h-2 bg-destructive rounded-full" />}
            </button>)}
        </div>
      </nav>
    </div>;
};
export default Index;