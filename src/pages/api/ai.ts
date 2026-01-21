import type { NextApiRequest, NextApiResponse } from 'next'
import PaLM from "palm-api";
import { aiRecommendation } from '../types/type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<aiRecommendation | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const bot = new PaLM("AIzaSyCL5APGESUbIh8QFVUml9Wc1KPBpdVd4-g");
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const lyrics = body["lyrics"];

        if (!lyrics || !Array.isArray(lyrics)) {
            return res.status(400).json({ error: "No lyrics found." });
        }

        const recommendation = await bot.ask(
            "Recommend 10 songs that match the lyrics in Korean, Output the title and singer.",
            {
                context: lyrics.join("\n"),
            }
        );

        res.status(200).json({ 
            status: 200, 
            contents: recommendation || "추천 곡을 찾을 수 없습니다." 
        });
    } catch (error) {
        console.error("Error in AI recommendation:", error);
        res.status(500).json({ error: "Failed to get AI recommendation" });
    }
}

// Songlist Not used
// console.log(JSON.stringify(JSON.parse(json).rss.channel.item['maniadb:majorsongs']))