
import { create } from 'zustand';
import { MCPMode } from '@/types';

interface MCPState {
  mode: MCPMode;
  serverStatus: 'online' | 'offline';
  isOpen: boolean;
  setMode: (mode: MCPMode) => void;
  setServerStatus: (status: 'online' | 'offline') => void;
  toggleMCP: () => void;
}

export const useMCP = create<MCPState>((set) => ({
  mode: 'manual',
  serverStatus: 'online',
  isOpen: false,
  setMode: (mode) => set({ mode }),
  setServerStatus: (status) => set({ serverStatus }),
  toggleMCP: () => set((state) => ({ isOpen: !state.isOpen }))
}));
