import {create} from 'zustand'

interface MacBookStoreState{
  color: string,
  setColor: (color: string) => void,

  scale: number,
  setScale: (scale: number) => void

  reset : ()=> void
}
const useMacBookStore = create<MacBookStoreState>((set) => ({
  color: '#2e2c2e',
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  reset: ()=>set({color: '#2e2c2e', scale: 0.08})

}))

export default useMacBookStore
