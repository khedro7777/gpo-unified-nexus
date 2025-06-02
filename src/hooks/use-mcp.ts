
import { create } from 'zustand';

type MCPMode = 'auto' | 'ask' | 'manual';

interface MCPState {
  mode: MCPMode;
  serverStatus: 'online' | 'offline';
  isOpen: boolean;
  rasaConnected: boolean;
  activeTasks: number;
  completedTasks: number;
  setMode: (mode: MCPMode) => void;
  setServerStatus: (status: 'online' | 'offline') => void;
  setRasaConnected: (connected: boolean) => void;
  toggleMCP: () => void;
  incrementCompletedTasks: () => void;
  setActiveTasks: (count: number) => void;
}

export const useMCP = create<MCPState>((set) => ({
  mode: 'ask', // Default to ask mode
  serverStatus: 'online',
  isOpen: false,
  rasaConnected: true,
  activeTasks: 3,
  completedTasks: 24,
  setMode: (mode) => set({ mode }),
  setServerStatus: (status) => set({ serverStatus: status }),
  setRasaConnected: (connected) => set({ rasaConnected: connected }),
  toggleMCP: () => set((state) => ({ isOpen: !state.isOpen })),
  incrementCompletedTasks: () => set((state) => ({ 
    completedTasks: state.completedTasks + 1,
    activeTasks: Math.max(0, state.activeTasks - 1)
  })),
  setActiveTasks: (count) => set({ activeTasks: count })
}));
