import Head from 'next/head'
import styles from '../styles/search.module.css'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import ColorThief from 'colorthief';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './modules/Nav';
import { artistInfo } from './types/type';

export default function Search() {
    const router = useRouter();
    const imgRef = useRef<HTMLImageElement>(null);
    const body = useRef<HTMLDivElement>(null);
    const profile = useRef<HTMLDivElement>(null);
    const songs = useRef<HTMLDivElement>(null);
    const [info, setInfos] = useState<artistInfo>();
    const [color, setColor] = useState<number[][]>();
    // 멜론 가사 a태그 클래스명 : (btn btn_icon_detail)
    // 가사 클래스 : .lyric

    const getColor = () => {
        const colorThief = new ColorThief();
        if (imgRef.current.complete) {
          setColor(colorThief.getPalette(imgRef.current, 4));
        }
      };

    useEffect(() => {
        (async () => {
            if (!router.isReady) return;

            const data = await (await fetch("/api/artist/?name=" + router.query["query"])).json();
            setInfos(data);
        })();
    }, [router.isReady]);

    useEffect(() => {
        if (!color || color.length < 4) return getColor();
        body.current!.style.background = `linear-gradient(145deg, rgb(${color[0].join(", ")}) 50%, rgb(${color[1].join(", ")}))`;
        body.current!.style.color = `rgb(${color[2].join(", ")})`;
        profile.current!.style.background = `rgb(${color[3].join(", ")})`;
        songs.current!.style.background = `rgb(${color[3].join(", ")})`;
        // body.current!.style.background = `linear-gradient(to right, #4880EC, #019CAD)`;
        console.log(color);
    }, [color]);

    return (
        <>
            <Head>
            </Head>

            <Nav />
            <div className={styles.container2}>
                <div className={styles.loading} style={
                    info?.profile ? {
                        display: 'none'
                    } : {}}></div>
                <div className={styles.searchresult}>
                    <h3> 검색 결과  </h3>
                </div>
                <div ref={body} className={styles.container}>

                    <div ref={profile} className={styles.profile}>
                        <Image onLoad={getColor} ref={imgRef} src={info?.profile ?? "http://placehold.it/250x250"} width={250} height={250} alt='Profile' />
                        <div className={styles.info}>
                            가수 : {info && info.name}
                        </div>

                    </div>
                    <div ref={songs} className={styles.songs}>
                        <div className={styles.titles}>
                            {info?.albums && info.albums.map((album, index) => {
                                let nameHandler = album.name.split("(20")[0].split("[digital")[0].replace("[ep]", "").replace("[omnibus]", "");
                                let songInfo = nameHandler.split("-");
                                return <a href={`/view?name=${songInfo[0]}&album=${songInfo[1]}&singer=${info.name}`} className={styles.album} key={index}>
                                    <Image src={album.img ?? "http://placehold.it/100x100"} width={100} height={100} alt='Album' />
                                    <p>{album.name}</p>
                                </a>
                            })}
                        </div>
                    </div>


                </div>

            </div>

        </>
    )
}
