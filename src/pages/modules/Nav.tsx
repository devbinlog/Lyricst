import styles from '../../styles/search.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, KeyboardEvent } from 'react';

export default function Nav() {
    const router = useRouter();
    const inputData = useRef<HTMLInputElement>(null);

    const search = async (e: KeyboardEvent<HTMLInputElement>) => {
        const value = inputData.current?.value;
        console.log(value);
        if (e.key === 'Enter' && value) {
            const go = await router.push({
                pathname: '/search',
                query: { query: value },
            });
            router.reload();
        }
    };

    return (
        <div className={styles.nav}>
            <h1>
                <Link href="/">Lyricst</Link>
            </h1>
            <div id={styles.SearchBox}>
                <input
                    type="text"
                    id={styles.SearchBar}
                    placeholder="아티스트 검색"
                    ref={inputData}
                    onKeyDown={search}
                />

                <label htmlFor="SearchBar" id={styles.SearchIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                        />
                    </svg>
                </label>
            </div>
        </div>
    );
}
