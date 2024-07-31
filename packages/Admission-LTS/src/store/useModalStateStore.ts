import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IModalState } from '@/interface/type';

export const useModalStateStore = create<IModalState>()(
  devtools((set) => ({
    modalState: '',
    setModalState: (modalState) => set(() => ({ modalState })),
  })),
);
