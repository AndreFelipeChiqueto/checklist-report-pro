import { useState } from 'react';
import { FileDown, FileText, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InspectionData } from '@/types/inspection';
import { generateCompletePDF, generatePendingPDF, downloadPDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';

interface PDFExportButtonsProps {
  data: InspectionData;
  pendingCount: number;
}

export const PDFExportButtons = ({ data, pendingCount }: PDFExportButtonsProps) => {
  const [isGeneratingComplete, setIsGeneratingComplete] = useState(false);
  const [isGeneratingPending, setIsGeneratingPending] = useState(false);
  const { toast } = useToast();

  const handleGenerateComplete = async () => {
    setIsGeneratingComplete(true);
    try {
      const blob = await generateCompletePDF(data);
      const filename = `Inspecao_Completa_${data.generalInfo.elevatorNumber || 'Elevador'}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(blob, filename);
      toast({
        title: 'PDF gerado com sucesso!',
        description: 'O relatório completo foi baixado.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao gerar PDF',
        description: 'Ocorreu um erro ao gerar o relatório.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingComplete(false);
    }
  };

  const handleGeneratePending = async () => {
    setIsGeneratingPending(true);
    try {
      const blob = await generatePendingPDF(data);
      const filename = `Pendencias_${data.generalInfo.elevatorNumber || 'Elevador'}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(blob, filename);
      toast({
        title: 'PDF gerado com sucesso!',
        description: 'O relatório de pendências foi baixado.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao gerar PDF',
        description: 'Ocorreu um erro ao gerar o relatório.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingPending(false);
    }
  };

  return (
    <div className="space-y-3 animate-slide-up">
      <Button
        onClick={handleGenerateComplete}
        disabled={isGeneratingComplete}
        className="w-full h-14 gradient-primary text-primary-foreground font-semibold"
      >
        {isGeneratingComplete ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <FileText className="w-5 h-5 mr-2" />
        )}
        Gerar Relatório Completo
      </Button>

      <Button
        onClick={handleGeneratePending}
        disabled={isGeneratingPending}
        variant="outline"
        className="w-full h-14 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
      >
        {isGeneratingPending ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <>
            <AlertTriangle className="w-5 h-5 mr-2" />
            <FileDown className="w-5 h-5 mr-2" />
          </>
        )}
        Gerar Relatório de Pendências
        {pendingCount > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-destructive text-destructive-foreground text-xs rounded-full">
            {pendingCount}
          </span>
        )}
      </Button>
    </div>
  );
};
