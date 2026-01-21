import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { KeyboardEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import React, { useState } from 'react';

export default function Home() {
  const [isInfoHovered, setInfoHovered] = useState(false);
  const [isUseHovered, setUseHovered] = useState(false);
  const [isProducerHovered, setProducerHovered] = useState(false);
  const FloatingBox1: React.FC<{ content: string }> = ({ content }) => (
    <div className={styles.floatingBox1}>
      {content}
    </div>
  );
  const FloatingBox2: React.FC<{ content: string }> = ({ content }) => (
    <div className={styles.floatingBox2}>
      {content}
    </div>
  );
  const FloatingBox3: React.FC<{ content: string }> = ({ content }) => (
    <div className={styles.floatingBox3}>
      {content}
    </div>
  );

  const router = useRouter();
  const screen = useRef<HTMLDivElement>(null);
  const inputData = useRef<HTMLInputElement>(null);
  const search = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = inputData.current?.value;
    if (e.key == "Enter" && value) {
      router.push({
        pathname: "/search",
        query: { query: value },
      })
    }
  };

  useEffect(() => {
    setTimeout(() => { screen.current?.remove() }, 2000);
  }, [router.isReady])

  return (
    <>
      <Head>
        <title>Lyricst</title>
        <meta name="description" content="Design with lyrics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <div className={styles.macbook}>
          <div className={styles.head}>
            <div className={styles.camera}></div>
            <div className={styles.screen}>
              <div ref={screen} className={styles.blackScreen}></div>
              <span>Lyricst</span>
              <div className={styles.searcher}>
                <Image src="./searchIcon.svg" alt="Search" width={25} height={25} />
                <input ref={inputData} type="text" placeholder='가수의 이름을 입력해주세요.' onKeyDown={search} />
              </div>
              <Image src="./Logo.svg" alt="LOGO" width={150} height={150} />

              <div className={styles.items}>

                <div className={styles.btn}
                  onMouseEnter={() => setInfoHovered(true)}
                  onMouseLeave={() => setInfoHovered(false)}
                >Info
                </div>

                <div className={styles.btn}
                  onMouseEnter={() => setUseHovered(true)}
                  onMouseLeave={() => setUseHovered(false)}
                >Use
                </div>

                <div className={styles.btn}
                  onMouseEnter={() => setProducerHovered(true)}
                  onMouseLeave={() => setProducerHovered(false)}
                >Producer
                </div>

              </div>
              {isInfoHovered && <FloatingBox1 content="가사와 이미지 사용화를 제공하는 서비스 입니다." />}
              {isUseHovered && <FloatingBox2 content="검색창에서 가수의 이름을 검색하세요." />}
              {isProducerHovered && <FloatingBox3 content="김태빈 성민우 이우진" />}
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.openner}></div>
          </div>
        </div>
      </div >
      <div className={styles.footer}>
        <div id="desk">

        </div>
      </div>
    </>
  )
}