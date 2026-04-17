import { MouseEvent, ReactNode, useState } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { Navbar } from '../navigation/Navbar';
import { SparkleBursts } from '../layout/Sparkles';
import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

type BurstData = { id: number; x: number; y: number };

const Main = (props: IMainProps) => {
  const [bursts, setBursts] = useState<BurstData[]>([]);

  const triggerBurst = (e: MouseEvent) => {
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
  };

  const removeBurst = (id: number) =>
    setBursts((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="antialiased w-full text-gray-700 px-3 md:px-0">
      {props.meta}

      <SparkleBursts bursts={bursts} onBurstDone={removeBurst} />

      <div className="max-w-screen-md mx-auto">
        <div className="border-b border-gray-300">
          <div className="titleContent pt-16 pb-8">
            <motion.img
              className="faceImage"
              src="/assets/images/face.png"
              onClick={triggerBurst}
              whileHover={{ scale: 1.08, rotate: [0, -6, 6, -3, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{ cursor: 'pointer' }}
            />
            <div className="font-semibold text-3xl text-gray-900">
              {AppConfig.title}
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>
          <div>
            <Navbar>
              <li className="mr-6">
                <Link href="/">
                  Home (Blagh)
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/about/">
                  About
                </Link>
              </li>
              <li className="mr-6">
                <a href="https://github.com/dsab123" target="_blank">
                  GitHub
                </a>
              </li>
              {/* <li className="mr-6">
                <a href="/posts/projects">
                  Projects
                </a>
              </li> */}
            </Navbar>
          </div>
        </div>

        <div className="text-xl py-5">{props.children}</div>

        <div className="border-t border-gray-300 text-center py-8 text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
          <span role="img" aria-label="Love">
            ♥
          </span>{' '}
          by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
          {/*
           * PLEASE READ THIS SECTION
           * We'll really appreciate if you could have a link to our website
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * Thank you for your support it'll mean a lot for us.
           */}
        </div>
      </div>
    </div>
  );
};

export { Main };
