import Head from 'next/head'
import styles from 'Modules/styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
    const router = useRouter();
    const screen = useRef<HTMLDivElement>(null);
    const [singerURL, setSingerURL] = useState("http://placehold.it/200x200")

    useEffect(() => {
        (async () => {
            if (!router.isReady) return;
            fetch("/api/ai");

            // const data = await (await fetch("/api/artist/?name=" + router.query["query"])).json();
            // if (data.profile) {
            //     setSingerURL(data.profile)
            // }
            // console.log(data.albums);
            // http://i.maniadb.com/images/artist/427/427160.jpg
        })()
        setTimeout(() => { screen.current?.remove() }, 2000);
    }, [router.isReady]);

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
                            <Image src={singerURL} width={200} height={200} alt={"Singer"} />
                            <h1>
                                {
                                    router.query["query"]
                                }
                            </h1>
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
