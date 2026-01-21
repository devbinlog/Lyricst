import Head from 'next/head'
import styles from '../styles/view.module.css'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ColorThief from 'colorthief';
import Link from 'next/link';
import Nav from './modules/Nav';
import { songInfoDatas } from './types/type';
import React from 'react';

export default function View() {
    const [songs, setSongs] = useState<string>();
    const [color, setColor] = useState<number[][]>();
    const [info, setInfos] = useState<songInfoDatas>();
    const [isFloatingBoxVisible, setIsFloatingBoxVisible] = useState(false);
    const [path, setPath] = useState<number>(0);
    const body = useRef<HTMLDivElement>(null);
    const lyrics = useRef<HTMLDivElement>(null);
    const cdBack = useRef<HTMLDivElement>(null);
    const album = useRef<HTMLImageElement>(null);
    const link = useRef<HTMLAnchorElement>(null);
    const router = useRouter();
    const youtubeLink = info && info.title && info.singers
        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${info.title} ${info.singers.join(' ')}`)}`
        : null;
    // 멜론 가사 a태그 클래스명 : (btn btn_icon_detail)
    // 가사 클래스 : .lyric

    const paths = [
        "",
        "polygon(50% 0%, 0% 100%, 100% 100%)",
        "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
    ];

    useEffect(() => {
        album.current!.style.clipPath = paths[path];
    }, [path]);

    const nex = () => {
        if (path === paths.length - 1) return;
        setPath(path + 1);
    }

    const pre = () => {
        if (path === 0) return;
        setPath(path - 1);
    }

    useEffect(() => {
        (async () => {
            if (!router.isReady) return;
            const getInfo = await (await fetch("/api/lyrics?name=" + router.query["name"] + "&album=" + router.query["album"] + "&singer=" + router.query["singer"])).json();
            if (getInfo) {
                setInfos(getInfo);
            };
        })()
    }, [router.isReady]);

    useEffect(() => {
        if (!color) getColor();
        else {
            body.current!.style.background = `linear-gradient(145deg, rgb(${color[0].join(", ")}) 35%, rgb(${color[1].join(", ")})50%)`;
            body.current!.style.color = `rgb(${color[2].join(", ")})`;
            link.current!.style.color = `rgb(${color[2].join(", ")})`;
            lyrics.current!.style.background = `rgb(${color[0].join(", ")})`;
            lyrics.current?.style.setProperty("--color", `rgb(${color[1].join(", ")})`);
            lyrics.current?.style.setProperty("--color2", `rgb(${color[2].join(", ")})`);
            cdBack.current!.style.background = `linear-gradient(145deg, rgb(${color[1].join(", ")}) 50%, rgb(${color[0].join(", ")}))`;
            (async () => {
                const songs = await (await fetch("/api/ai", {
                    body: JSON.stringify({
                        lyrics: info?.lyric
                    }),
                    method: "POST"
                })).json();
                setSongs(songs.contents.split("\n\n")[1]);
            })();
        }
    }, [color]);

    const getColor = async () => {
        const colorThief = new ColorThief();
      
        // 앨범 ref 및 해당 current 속성이 있는지 확인
        if (album.current && album.current.complete && album.current.naturalWidth > 0) {
          setColor(colorThief.getPalette(album.current, 3));
        } else {
          
          console.error('이미지가 로드되지 않았거나 크기가 0입니다.');
        
        }
      };
      

    const showFloatingBox = () => {
        setIsFloatingBoxVisible(true);
    };

    const hideFloatingBox = () => {
        setIsFloatingBoxVisible(false);
    };

    const songSuggest = async () => {
        showFloatingBox();
    };

    const FloatingBox1: React.FC<{ content: string[] }> = ({ content }) => (
        <div className={styles.floatingBox}>
            <div className={styles.closeButton} onClick={hideFloatingBox}>
                X
            </div>
            {content.map((x, index) => {
                return <p key={index}>{x}</p>
            })}
        </div>
    );
    return (
        <>

            <Head>
            </Head>
            <Nav />
            <div ref={body} className={styles.container}>
                <div className={styles.player}>
                    <Link ref={link} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(info?.title + " " + info?.singers?.join(' '))}`}>{router.query["album"] == 'undefined' ? router.query['name'] : router.query['album']}</Link>
                    <div ref={cdBack} className={styles.cdback}>
                        <Image onLoad={getColor} ref={album} src={info?.album ?? "http://placehold.it/200x200"} width={200} height={200} alt='Album' className={styles.cd} />
                        {/* <div className={styles.hole}></div> */}
                    </div>

                    <div className={styles.process}>
                        <p className={styles.time}>3:33</p>
                        <div className={styles.bar}></div>

                    </div>
                    <div className={styles.btns}>
                        <div className={styles.previous} onClick={pre}></div>
                        <div className={styles.download}></div>
                        <div className={styles.next} onClick={nex}></div>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.song}>
                        <div className={styles.divider}>
                            Title - &nbsp;
                            {youtubeLink && (
                                <a href={youtubeLink} target="_blank" ref={link} rel="noopener noreferrer">
                                    {info && info.title}
                                </a>
                            )}
                            <h3 className={styles.author}>Singer - {info && info.singers?.join(", ")} </h3>
                        </div>
                    </div>
                    <div className={styles.translyrics}>
                        <div className={styles.ai} onClick={songSuggest}>
                            Ai 곡 추천
                        </div>
                        {isFloatingBoxVisible && <FloatingBox1 content={songs?.split("\n") ?? ["AI가 생각중 입니다."]} />}
                    </div>

                    <div ref={lyrics} className={styles.lyrics}>
                        {info?.lyric && info.lyric.map((ly, index) => {
                            return <p key={index}>{ly}</p>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
