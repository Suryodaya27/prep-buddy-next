import axios from "axios"
import cheerio from "cheerio"

// Scraper function
async function scraperHelper(url){
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const data = $("p").text();
        return data;
    } catch (error) {
        throw new ApiError(404,"website data not found")
    }
}

export default async function scraper(url) {
    try {
        const scrapedData = await scraperHelper(url);
        return {scrapedData };
    } catch (error) {
        throw new ApiError(error.statusCode||  500,error.message||'some error occured')
    }
}