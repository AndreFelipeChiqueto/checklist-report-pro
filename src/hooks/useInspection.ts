import { useState, useCallback } from 'react';
import { 
  InspectionData, 
  InspectionItem, 
  ItemStatus, 
  GeneralInfo,
  inspectionSections, 
  defaultGeneralInfo 
} from '@/types/inspection';

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useInspection = () => {
  const [inspection, setInspection] = useState<InspectionData>(() => ({
    id: generateId(),
    generalInfo: { ...defaultGeneralInfo },
    sections: JSON.parse(JSON.stringify(inspectionSections)),
    clientObservations: [],
    finalObservations: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const updateGeneralInfo = useCallback((info: Partial<GeneralInfo>) => {
    setInspection(prev => ({
      ...prev,
      generalInfo: { ...prev.generalInfo, ...info },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItemStatus = useCallback((sectionId: string, itemId: string, status: ItemStatus) => {
    setInspection(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, status } : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItemComment = useCallback((sectionId: string, itemId: string, comment: string) => {
    setInspection(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, comment } : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItemPhoto = useCallback((sectionId: string, itemId: string, photoUrl: string | undefined) => {
    setInspection(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, photoUrl } : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addClientObservation = useCallback((observation: string) => {
    setInspection(prev => ({
      ...prev,
      clientObservations: [...prev.clientObservations, observation],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeClientObservation = useCallback((index: number) => {
    setInspection(prev => ({
      ...prev,
      clientObservations: prev.clientObservations.filter((_, i) => i !== index),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateFinalObservations = useCallback((observations: string) => {
    setInspection(prev => ({
      ...prev,
      finalObservations: observations,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const getStatistics = useCallback(() => {
    let total = 0;
    let conforme = 0;
    let naoConforme = 0;
    let naoAplicavel = 0;
    let pendente = 0;

    inspection.sections.forEach(section => {
      section.items.forEach(item => {
        total++;
        switch (item.status) {
          case 'conforme': conforme++; break;
          case 'nao_conforme': naoConforme++; break;
          case 'nao_aplicavel': naoAplicavel++; break;
          case 'pendente': pendente++; break;
        }
      });
    });

    return { total, conforme, naoConforme, naoAplicavel, pendente };
  }, [inspection.sections]);

  const getPendingItems = useCallback((): { section: string; item: InspectionItem }[] => {
    const pending: { section: string; item: InspectionItem }[] = [];
    
    inspection.sections.forEach(section => {
      section.items.forEach(item => {
        if (item.status === 'nao_conforme') {
          pending.push({ section: section.title, item });
        }
      });
    });
    
    return pending;
  }, [inspection.sections]);

  const resetInspection = useCallback(() => {
    setInspection({
      id: generateId(),
      generalInfo: { ...defaultGeneralInfo },
      sections: JSON.parse(JSON.stringify(inspectionSections)),
      clientObservations: [],
      finalObservations: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  return {
    inspection,
    updateGeneralInfo,
    updateItemStatus,
    updateItemComment,
    updateItemPhoto,
    addClientObservation,
    removeClientObservation,
    updateFinalObservations,
    getStatistics,
    getPendingItems,
    resetInspection,
  };
};
