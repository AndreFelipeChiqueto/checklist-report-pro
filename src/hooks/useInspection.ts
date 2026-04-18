import { useState, useCallback, useEffect, useRef } from 'react';
import {
  InspectionData,
  InspectionItem,
  ItemStatus,
  GeneralInfo,
  inspectionSections,
  defaultGeneralInfo,
} from '@/types/inspection';
import { storage } from '@/lib/storage';

const STORAGE_KEY = 'elevator-inspection-data';
const generateId = () => crypto.randomUUID();

const createNewInspection = (): InspectionData => ({
  id: generateId(),
  generalInfo: { ...defaultGeneralInfo },
  sections: JSON.parse(JSON.stringify(inspectionSections)),
  clientObservations: [],
  finalObservations: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Migra dados antigos (photoUrl: string) para novo formato (photoUrls: string[])
const migrateInspection = (data: InspectionData): InspectionData => {
  if (!data?.sections) return data;
  return {
    ...data,
    sections: data.sections.map((section) => ({
      ...section,
      items: section.items.map((item: InspectionItem & { photoUrl?: string }) => {
        if (item.photoUrls && Array.isArray(item.photoUrls)) {
          return { ...item, photoUrl: undefined };
        }
        if (item.photoUrl) {
          return { ...item, photoUrls: [item.photoUrl], photoUrl: undefined };
        }
        return { ...item, photoUrls: [] };
      }),
    })),
  };
};

export const useInspection = () => {
  const [inspection, setInspection] = useState<InspectionData>(() => createNewInspection());
  const [isLoaded, setIsLoaded] = useState(false);
  const hasMigrated = useRef(false);

  // Carregar dados do storage no mount (assíncrono para suportar Capacitor Preferences)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const saved = await storage.getItem(STORAGE_KEY);
        if (!cancelled && saved) {
          const parsed = JSON.parse(saved) as InspectionData;
          setInspection(migrateInspection(parsed));
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      } finally {
        if (!cancelled) {
          hasMigrated.current = true;
          setIsLoaded(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Salvar automaticamente com debounce de 500ms (reduz custo do JSON.stringify)
  useEffect(() => {
    if (!isLoaded) return;
    const timeout = setTimeout(() => {
      storage.setItem(STORAGE_KEY, JSON.stringify(inspection)).catch((error) => {
        console.error('Erro ao salvar dados:', error);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [inspection, isLoaded]);

  const updateGeneralInfo = useCallback((info: Partial<GeneralInfo>) => {
    setInspection((prev) => ({
      ...prev,
      generalInfo: { ...prev.generalInfo, ...info },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItemStatus = useCallback((sectionId: string, itemId: string, status: ItemStatus) => {
    setInspection((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, status } : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItemComment = useCallback((sectionId: string, itemId: string, comment: string) => {
    setInspection((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, comment } : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addItemPhoto = useCallback((sectionId: string, itemId: string, photoUrl: string) => {
    setInspection((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? { ...item, photoUrls: [...(item.photoUrls ?? []), photoUrl] }
                  : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeItemPhoto = useCallback((sectionId: string, itemId: string, index: number) => {
    setInspection((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? { ...item, photoUrls: (item.photoUrls ?? []).filter((_, i) => i !== index) }
                  : item
              ),
            }
          : section
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addClientObservation = useCallback((observation: string) => {
    setInspection((prev) => ({
      ...prev,
      clientObservations: [...prev.clientObservations, observation],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeClientObservation = useCallback((index: number) => {
    setInspection((prev) => ({
      ...prev,
      clientObservations: prev.clientObservations.filter((_, i) => i !== index),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateFinalObservations = useCallback((observations: string) => {
    setInspection((prev) => ({
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

    inspection.sections.forEach((section) => {
      section.items.forEach((item) => {
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
    inspection.sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.status === 'nao_conforme') {
          pending.push({ section: section.title, item });
        }
      });
    });
    return pending;
  }, [inspection.sections]);

  const resetInspection = useCallback(() => {
    storage.removeItem(STORAGE_KEY).catch((error) => {
      console.error('Erro ao limpar dados:', error);
    });
    setInspection(createNewInspection());
  }, []);

  return {
    inspection,
    updateGeneralInfo,
    updateItemStatus,
    updateItemComment,
    addItemPhoto,
    removeItemPhoto,
    addClientObservation,
    removeClientObservation,
    updateFinalObservations,
    getStatistics,
    getPendingItems,
    resetInspection,
  };
};
