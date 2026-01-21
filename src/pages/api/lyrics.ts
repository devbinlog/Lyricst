// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';
import { xml2json } from 'xml-js';
import cheerio from 'cheerio'
import { songInfoDatas } from '../types/type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<songInfoDatas | { error: string }>
) {
    try {
        if (typeof req.query["name"] !== "string" || !req.query["name"]) {
            return res.status(400).json({ error: "Song name is required" });
        }

        const albumParam = req.query['album'] === 'undefined' ? '' : req.query["album"];
        let searchQuery = req.query["name"] + (albumParam ? " " + albumParam : "");
        let idLink = await fetch("https://www.melon.com/search/total/index.htm?q=" + encodeURI(searchQuery));
        
        // * Song id grapper
        // link : https://www.melon.com/search/total/index.htm?q="song name + singer name"
        let $ = cheerio.load(await idLink.text());
        let idTemp: number | number[] | undefined = ($("#frm_songList > div > table > tbody > tr > td:nth-child(3) > div > div > a.btn.btn_icon_detail").attr('href') ?? $("#frm_searchSong > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > div > a.btn.btn_icon_detail").attr('href'))?.split("'").map(i => parseInt(i)).filter(i => !isNaN(i));
        let id = typeof idTemp === 'object' ? idTemp[idTemp.length - 1] : idTemp;

        if (!id && typeof req.query["singer"] === "string") {
            idLink = await fetch("https://www.melon.com/search/total/index.htm?q=" + encodeURI(req.query["singer"] + " " + albumParam));
            $ = cheerio.load(await idLink.text());
            let idTemp = ($("#frm_songList > div > table > tbody > tr > td:nth-child(3) > div > div > a.btn.btn_icon_detail").attr('href') ?? $("#frm_searchSong > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > div > a.btn.btn_icon_detail").attr('href'))?.split("'").map(i => parseInt(i)).filter(i => !isNaN(i));
            id = typeof idTemp === 'object' ? idTemp[idTemp?.length - 1] : id;
        }

        if (!id) {
            return res.status(404).json({ error: "Song not found" });
        }

        // * Lyrics Grapper
        // link : https://www.melon.com/song/detail.htm?songId="songId"
        const lyricsFetch = await fetch("https://www.melon.com/song/detail.htm?songId=" + id);

        $ = cheerio.load(await lyricsFetch.text());
        const lyrics = $("#d_video_summary").html()?.replaceAll("<!-- height:auto; 로 변경시, 확장됨 -->\n", "").replaceAll("\t", "").split("<br>");
        const album = $("#d_song_org > a > img").attr("src");
        const title = $("#downloadfrm > div > div > div.entry > div.info > div.song_name").text().replace("곡명", "").trim();
        const singers = $("#downloadfrm > div > div > div.entry > div.info > div.artist > a > span").map((i, card) => $(card).text()).get().filter(i => i);
        
        res.status(200).json({
            lyric: lyrics,
            album: album,
            title: title,
            singers: singers
        });
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        res.status(500).json({ error: "Failed to fetch lyrics" });
    }
}

// Songlist Not used
// console.log(JSON.stringify(JSON.parse(json).rss.channel.item['maniadb:majorsongs']))