import { create } from 'zustand';
import { Song } from '@/types';
import { dummyAllSongList } from '@/lib/dummyData';

interface PlayerState {
  isVisiblePlayer: boolean;
  setIsVisiblePlayer: (isVisiblePlayer: boolean) => void;
  activeSong?: Song | null;
  prevPlayerQueue: Song[];
  nextPlayerQueue: Song[];
  //기능들 (재생, 다음곡, 이전곡)
  addSongList: (songList: Song[]) => void;
  playNext: () => void;
  playBack: () => void;
}

const usePlayerState = create<PlayerState>((set) => ({
  isVisiblePlayer: false,
  setIsVisiblePlayer: (isVisiblePlayer: boolean) => set({ isVisiblePlayer }),
  activeSong: null,
  nextPlayerQueue: [],
  prevPlayerQueue: [],
  addSongList: (songList: Song[]) =>
    set((prev) => {
      const prevSong = prev.activeSong;
      const currentSong = songList[0];
      const remainingSongs = songList.slice(1);

      return {
        activeSong: currentSong,
        prevPlayerQueue: prevSong
          ? [prevSong, ...prev.prevPlayerQueue]
          : prev.prevPlayerQueue,
        nextPlayerQueue: remainingSongs,
        isVisiblePlayer: true,
      };
    }),
  playNext: () =>
    set((prev) => {
      const currentSong = prev.activeSong;
      const nextSrc = prev.nextPlayerQueue[0];
      const updatedNextQueue = prev.nextPlayerQueue.slice(1);

      return {
        activeSong: nextSrc,
        nextPlayerQueue: updatedNextQueue,
        prevPlayerQueue: currentSong
          ? [currentSong, ...prev.prevPlayerQueue]
          : prev.prevPlayerQueue,
      };
    }),
  playBack: () =>
    set((prev) => {
      const currentSong = prev.activeSong;
      const preSrc = prev.prevPlayerQueue[0];
      const updatedPrevQueue = prev.prevPlayerQueue.slice(1);

      return {
        activeSong: preSrc,
        nextPlayerQueue: currentSong
          ? [currentSong, ...prev.nextPlayerQueue]
          : prev.nextPlayerQueue,
        prevPlayerQueue: updatedPrevQueue,
      };
    }),
}));

export default usePlayerState;
