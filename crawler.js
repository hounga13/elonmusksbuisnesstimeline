import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";

// 크롤링 대상 URL (예: Elon Musk 타임라인 페이지)
const TARGET_URL = "https://example.com/elon-timeline";

async function crawl() {
  console.log("🚀 Start crawling:", TARGET_URL);

  const { data } = await axios.get(TARGET_URL);
  const $ = cheerio.load(data);

  // 데이터 수집 (예시: .timeline-item)
  const results = [];
  $(".timeline-item").each((_, el) => {
    results.push({
      date: $(el).find(".date").text().trim(),
      title: $(el).find(".title").text().trim(),
      description: $(el).find(".description").text().trim(),
    });
  });

  // JSON 저장 (GitHub Pages로 배포)
  writeFileSync("data.json", JSON.stringify(results, null, 2));
  console.log(`✅ Crawled ${results.length} items and saved to data.json`);
}

crawl();
