import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';

const isNative = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

// Migra dados antigos do localStorage para IndexedDB (uma única vez por chave)
const migrateFromLocalStorage = async (key: string): Promise<string | null> => {
  try {
    const legacy = localStorage.getItem(key);
    if (legacy != null) {
      await idbSet(key, legacy);
      try {
        localStorage.removeItem(key);
      } catch {
        // ignore
      }
      return legacy;
    }
  } catch {
    // localStorage pode não estar disponível
  }
  return null;
};

export const storage = {
  async getItem(key: string): Promise<string | null> {
    if (isNative()) {
      const { value } = await Preferences.get({ key });
      return value ?? null;
    }
    try {
      const fromIdb = await idbGet<string>(key);
      if (fromIdb != null) return fromIdb;
      // Tenta migrar do localStorage antigo
      return await migrateFromLocalStorage(key);
    } catch (error) {
      console.error('Erro ao ler do IndexedDB:', error);
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (isNative()) {
      await Preferences.set({ key, value });
      return;
    }
    try {
      await idbSet(key, value);
    } catch (error) {
      console.error('Erro ao salvar no IndexedDB:', error);
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        console.error('Erro ao salvar no localStorage (fallback):', err);
      }
    }
  },

  async removeItem(key: string): Promise<void> {
    if (isNative()) {
      await Preferences.remove({ key });
      return;
    }
    try {
      await idbDel(key);
    } catch {
      // ignore
    }
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
