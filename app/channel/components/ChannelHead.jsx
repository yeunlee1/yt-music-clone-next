'use client';
import React from 'react';
import DarkButton from '@/components/elements/DarkButton';
import WhiteButton from '@/components/elements/WhiteButton';
import usePlayerState from '@/hooks/usePlayerState';
import { FiMusic, FiShuffle } from 'react-icons/fi';

function shuffleArray(array) {
  const shuffledArray = array.slice(); // 원본 배열 복사

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 무작위 인덱스
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // 교환
  }
  return shuffledArray;
}

const ChannelHead = ({ channel }) => {
  const { addSongList } = usePlayerState();
  const onClickShuffle = () => {
    addSongList(shuffleArray(channel.songList));
  };
  return (
    <section>
      <div className=" text-[28px] font-bold">{channel.name}</div>
      <article className="mt-4 lg:hidden">
        <div>
          <DarkButton
            className={'w-[230px] flex justify-center'}
            label={'구독중 4.18만'}
          />
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <WhiteButton
            onClick={onClickShuffle}
            label={'셔플'}
            icon={<FiShuffle size={16}></FiShuffle>}
          />
          <WhiteButton label={'뮤직 스테이션'} icon={<FiMusic size={16} />} />
        </div>
      </article>
      <div className="hidden lg:flex flex-row items-center gap-4 text-[14px] mt-4">
        <WhiteButton
          onClick={onClickShuffle}
          label={'셔플'}
          icon={<FiShuffle size={16}></FiShuffle>}
        />
        <WhiteButton label={'뮤직 스테이션'} icon={<FiMusic size={16} />} />
        <DarkButton
          className={'w-[230px] flex justify-center'}
          label={'구독중 4.18만'}
        />
      </div>
    </section>
  );
};
export default ChannelHead;
