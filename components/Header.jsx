'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import UserIcon from '@/components/UserIcon';
import PagePadding from './PagePadding';
import { FaChromecast } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Logo from './elements/Logo';
import Navigator from './elements/Navigator';
import { cn } from '@/lib/utils';
import useUIState from '@/hooks/useUIState';

const HeaderDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[240px] h-full">
        {/* 로고 */}
        {/* 네비게이션 + 재생목록 */}
        <div className="py-3">
          <div className="px-3">
            <Logo
              isInDrawer
              onClickClose={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <Navigator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Header = ({ children }) => {
  const { headerImageSrc } = useUIState();
  const [isScrolled, setIsScrolled] = useState(false);
  const headRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = headRef?.current?.scrollTop;
      console.log('---->scrollValue', scrollValue);
      setIsScrolled(scrollValue !== 0);
    };
    headRef?.current?.addEventListener('scroll', handleScroll);
    return () => {
      headRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header ref={headRef} className="relative overflow-y-auto w-full h-full">
      <section className="absolute top-0 w-full h-[400px]">
        <div className="relative h-full w-full">
          <Image
            alt="mediaItem"
            className="object-cover"
            fill
            src={headerImageSrc || 'https://images.unsplash.com/photo-1707833558984-3293e794031c'}
          />
          {/* 배경 그라디언트 영역 */}
          <div className="absolute h-full top-0 bg-black opacity-40 w-full"></div>
          <div className="absolute h-full top-0 bg-gradient-to-t from-black w-full"></div>
        </div>
      </section>
      {/* searchSection */}
      <section className={cn('sticky top-0 left-0 z-10', isScrolled && 'bg-black')}>
        <PagePadding>
          <div className="h-[64px] flex flex-row justify-between items-center">
            <article
              className="flex flex-row items-center h-[42px] min-w-[480px]
                        bg-[rgba(0,0,0,0.14)] rounded-2xl px-[16px] gap-[16px] hidden lg:flex border border-neutral-500"
            >
              <div>
                <FiSearch size={24} />
              </div>
              <input
                type="text"
                className="h-full w-full bg-transparent"
                placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
              />
            </article>
            <HeaderDrawer>
              <article className="lg:hidden">
                <Logo />
              </article>
            </HeaderDrawer>
            <article className="flex flex-row items-center gap-6">
              <FaChromecast size={24} />
              <UserIcon />
            </article>
          </div>
        </PagePadding>
      </section>
      <section className="relative top-0 w-full h-full">{children}</section>
    </header>
  );
};

export default Header;
