import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setIsOpen: (value: boolean) => void;
};

export const useSidebarOpen = create<SidebarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (value) => set({ isOpen: value }),
}));
