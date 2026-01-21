// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';
import { xml2json } from 'xml-js';
import cheerio from 'cheerio'
import { artistInfo } from '../types/type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<artistInfo | { error: string }>
) {
  try {
    // http://www.maniadb.com/api/search/metallica/?sr=artist&display=10&key=example&v=0.5
    if (typeof req.query["name"] !== "string" || !req.query["name"]) {
      return res.status(400).json({ error: "Artist name is required" });
    }

    const apiRes = await (await fetch("http://www.maniadb.com/api/search/" + encodeURI(req.query["name"]) + "/?sr=artist&display=1&key=example&v=0.5")).text();
    const json = JSON.parse(xml2json(apiRes, { compact: true, spaces: 4 })).rss.channel.item;

    if (!json || !json['maniadb:linkgallery']) {
      return res.status(404).json({ error: "Artist not found" });
    }

    //Album list link
    const albumHTML = await fetch(json['maniadb:linkgallery']['_cdata']);

    // Scraper
    const $ = cheerio.load(await albumHTML.text()); 
    
    // Get album list from link
    const albums = $(".artist-generation>table").map((i, card) => {
      return {
        name: $(card).find(".album>div>a").text(),
        img: $(card).find("img").attr("src") || "http://placehold.it/100x100"
      }
    }).get();

    // warping profile and album list
    res.status(200).json({
      name: json['title']['_cdata'] || req.query["name"],
      profile: json['image']['_cdata'] == "http://i.maniadb.com" ? "http://placehold.it/200x200" : json['image']['_cdata'],
      albums: albums
    })
  } catch (error) {
    console.error("Error fetching artist info:", error);
    res.status(500).json({ error: "Failed to fetch artist information" });
  }
}

// Songlist Not used
// console.log(JSON.stringify(JSON.parse(json).rss.channel.item['maniadb:majorsongs']))