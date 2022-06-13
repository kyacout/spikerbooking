import create from 'zustand'

export const useStore = create(set => ({
  artist: {},
  addArtistInfo: newData => set(state => ({ artist: { ...state.artist, ...newData } })),
  venue: {},
  addVenueInfo: newData => set(state => ({ venue: { ...state.venue, ...newData } })),
}))
