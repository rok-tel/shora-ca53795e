
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import { seedInitialData } from "../api/articleApi";
import { Article } from "@/components/ArticleCard";

// Mock data to seed the database
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Tesla Stock Soars After Record Quarter Deliveries",
    summary: "Tesla's stock price jumped 8% after the company reported record quarterly vehicle deliveries, exceeding Wall Street expectations.",
    content: `Tesla's stock surged on Monday after the electric vehicle maker reported record quarterly deliveries that exceeded Wall Street expectations, signaling strong demand despite economic uncertainties.

The company delivered 310,048 vehicles in the first quarter, up 68% from a year earlier and higher than analysts' expectations of about 309,000. Tesla CEO Elon Musk called it an "exceptionally difficult quarter" due to supply chain disruptions and China's COVID-19 policies.

The strong delivery numbers come as the auto industry continues to grapple with a global shortage of semiconductor chips, which has forced many automakers to cut production. Tesla, however, has been able to navigate these challenges better than most, in part by sourcing chips from different suppliers and rewriting software to work with available chips.

"This was a 'flex the muscle' moment for Tesla," said Dan Ives, an analyst at Wedbush Securities. "The Street was looking for 305,000 to 310,000 deliveries, and Tesla exceeded the high end of that range despite enormous headwinds."

Tesla's shares rose as much as 8% in morning trading, adding more than $80 billion to its market value. The company's market capitalization now stands at about $1.1 trillion, making it one of the most valuable companies in the world.`,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
    publishedAt: "2025-04-08T14:30:00Z",
    author: "Michael Chen",
    stocks: [
      { symbol: "TSLA", price: 812.15, change: 8.2 },
      { symbol: "LCID", price: 22.45, change: 2.1 },
      { symbol: "GM", price: 41.20, change: -1.2 },
    ]
  },
  {
    id: "2",
    title: "Fed Signals Aggressive Rate Hikes to Combat Inflation",
    summary: "Federal Reserve officials indicated they are prepared to raise interest rates by half percentage points if needed to control inflation.",
    content: `Federal Reserve officials signaled they are ready to take more aggressive actions to bring down inflation, including raising interest rates by half percentage-point increments at coming meetings if necessary.

Fed Chair Jerome Powell said Monday that the central bank needs to move "expeditiously" to raise rates and possibly "more aggressively" to prevent high inflation from becoming entrenched. His remarks were the latest indication that the Fed is pivoting toward a more inflation-fighting posture.

"The labor market is very strong, and inflation is much too high," Powell said in a speech to the National Association for Business Economics. "There is an obvious need to move expeditiously to return the stance of monetary policy to a more neutral level, and then to move to more restrictive levels if that is what is required to restore price stability."

Powell's comments come less than a week after the Fed raised its benchmark federal-funds rate by a quarter percentage point, lifting it from near zero to a range between 0.25% and 0.5%. That was the first rate increase since 2018.

Wall Street stocks dropped sharply following Powell's remarks. The Dow Jones Industrial Average fell 0.6%, while the tech-heavy Nasdaq Composite dropped 1.1%. Treasury yields rose, with the yield on the benchmark 10-year Treasury note climbing to 2.29%, its highest level since May 2019.`,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
    publishedAt: "2025-04-08T10:15:00Z",
    author: "Sarah Johnson",
    stocks: [
      { symbol: "SPY", price: 450.20, change: -1.2 },
      { symbol: "QQQ", price: 345.75, change: -1.8 },
      { symbol: "GS", price: 320.45, change: -0.5 },
    ]
  },
  {
    id: "3",
    title: "Apple Announces New MacBook Pro with M3 Chip",
    summary: "Apple unveiled its latest MacBook Pro featuring the new M3 processor, claiming significant performance improvements over previous models.",
    content: `Apple Inc. on Tuesday announced a new MacBook Pro laptop equipped with its next-generation M3 processor, promising significant performance improvements over previous models while maintaining industry-leading power efficiency.

The new MacBook Pro models feature the M3, M3 Pro, and M3 Max chips, which Apple says are the first personal computer chips built using 3-nanometer technology. This allows for greater performance and efficiency compared to the company's previous M2 chips.

According to Apple, the base M3 chip delivers up to 35% faster CPU performance than the M1 chip and up to 65% faster graphics performance. The high-end M3 Max chip can be configured with up to a 16-core CPU and a 40-core GPU, along with support for up to 128GB of unified memory.

"With the new MacBook Pro lineup, we're taking Apple silicon to new heights," said John Ternus, Apple's senior vice president of Hardware Engineering. "These are the most advanced laptops we've ever created."

The new MacBook Pro models also feature improved battery life, with Apple claiming up to 22 hours of usage on a single charge for the 16-inch model. Other features include a Liquid Retina XDR display, a 1080p FaceTime HD camera, a six-speaker sound system, and an array of connectivity options, including Thunderbolt 4 ports, HDMI, and an SD card slot.

The new MacBook Pro models are available for pre-order today and will begin shipping next week. Prices start at $1,599 for the 14-inch model with the M3 chip and go up to $3,499 for the 16-inch model with the M3 Max chip.`,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    publishedAt: "2025-04-07T18:45:00Z",
    author: "David Kim",
    stocks: [
      { symbol: "AAPL", price: 172.30, change: 2.8 },
      { symbol: "MSFT", price: 335.40, change: 0.5 },
      { symbol: "INTC", price: 32.10, change: -1.2 },
    ]
  },
  {
    id: "4",
    title: "Bitcoin Surpasses $75,000 for the First Time",
    summary: "The world's largest cryptocurrency reached a new all-time high amid increasing institutional adoption and decreasing inflation concerns.",
    content: `Bitcoin surpassed $75,000 for the first time on Wednesday, extending its remarkable rally as institutional investors continue to embrace the world's largest cryptocurrency.

The digital asset gained as much as 5% to reach $75,642, eclipsing its previous record of $71,250 set just last month. Bitcoin has now risen more than 80% this year, significantly outperforming traditional assets like stocks, bonds, and gold.

The latest surge comes as more institutional investors are allocating portions of their portfolios to cryptocurrencies. Last week, BlackRock's spot Bitcoin ETF surpassed $10 billion in assets under management, becoming the fastest-growing ETF in history.

"We're seeing unprecedented levels of institutional adoption," said Michael Saylor, executive chairman of MicroStrategy, which holds more than 200,000 bitcoins on its balance sheet. "The narrative has shifted from 'if' institutions will adopt bitcoin to 'how much' they will allocate."

Adding to the bullish sentiment was a recent report showing cooling inflation, which has reduced expectations that the Federal Reserve will maintain high interest rates for an extended period. Lower interest rates typically benefit risk assets like cryptocurrencies.

Other cryptocurrencies also rose, with Ethereum, the second-largest by market value, gaining 4% to reach $3,950. The total market value of all cryptocurrencies now stands at approximately $2.8 trillion, according to data from CoinMarketCap.`,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800",
    publishedAt: "2025-04-07T09:20:00Z",
    author: "Alex Rodriguez",
    stocks: [
      { symbol: "BTC-USD", price: 75420.50, change: 5.2 },
      { symbol: "ETH-USD", price: 3950.75, change: 4.1 },
      { symbol: "COIN", price: 245.30, change: 7.5 },
    ]
  },
  {
    id: "5",
    title: "Amazon Acquires AI Startup for $5 Billion",
    summary: "Amazon announced its largest acquisition of the year, purchasing an AI startup specializing in robotics and automation technology.",
    content: `Amazon.com Inc. announced on Monday it will acquire artificial intelligence startup Anthropic for $5 billion, marking the e-commerce giant's largest acquisition of the year and a significant expansion of its AI capabilities.

Anthropic, founded in 2021 by former OpenAI researchers, has gained attention for its AI assistant Claude, which competes with OpenAI's ChatGPT and Google's Gemini. The startup has been focusing on developing AI systems that are more reliable, interpretable, and steerable than current models.

Amazon said the acquisition will help it integrate advanced AI capabilities across its businesses, from improving product recommendations on its e-commerce platform to enhancing its cloud computing services offered through Amazon Web Services (AWS).

"Anthropic's team and technology will accelerate our AI innovation and help us maintain our leadership in cloud computing," said Andy Jassy, Amazon's CEO, in a statement. "This acquisition represents a strategic investment in the future of AI that will benefit our customers across all our businesses."

As part of the deal, Anthropic's AI models will be available through AWS, allowing Amazon's cloud customers to build applications using the startup's technology. Amazon will also incorporate Anthropic's AI capabilities into its consumer products, including Alexa and its e-commerce recommendation systems.

The acquisition comes amid increasing competition in the AI space, with Microsoft's partnership with OpenAI and Google's development of its Gemini models. The deal is expected to close in the first half of 2025, subject to regulatory approval.

Amazon's shares rose 2.5% following the announcement, while other tech stocks with significant AI investments also gained.`,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
    publishedAt: "2025-04-06T16:10:00Z",
    author: "Priya Sharma",
    stocks: [
      { symbol: "AMZN", price: 185.40, change: 2.5 },
      { symbol: "MSFT", price: 335.20, change: 1.2 },
      { symbol: "GOOGL", price: 155.75, change: 0.8 },
    ]
  },
  {
    id: "6",
    title: "Oil Prices Surge After Middle East Tensions Escalate",
    summary: "Crude oil prices jumped more than 6% after new geopolitical tensions in the Middle East raised concerns about potential supply disruptions.",
    content: `Oil prices surged more than 6% on Tuesday after escalating tensions in the Middle East raised fears of potential supply disruptions from the oil-rich region.

Brent crude, the global benchmark, jumped to $94.82 a barrel, while U.S. West Texas Intermediate crude rose to $91.35, both reaching their highest levels since 2022.

The price surge came after reports of increased military activities and diplomatic tensions between several countries in the region, threatening to disrupt oil production and transportation. The Middle East accounts for roughly a third of global oil production.

"Any potential conflict in the region immediately raises concerns about the Strait of Hormuz, through which about 20% of global oil supply passes," said John Smith, an oil analyst at Energy Insights. "Even the perception of potential disruption can drive significant price movements."

The price surge comes at a challenging time for global economies already grappling with inflation pressures. Higher oil prices typically lead to increased gasoline prices for consumers and higher input costs for businesses across various sectors.

OPEC+, the group of oil-producing nations led by Saudi Arabia and Russia, is scheduled to meet next week to discuss production quotas. The group had previously agreed to gradually increase production, but analysts now expect they may reconsider their plans given the current market conditions.

Energy stocks rallied on the news, with major oil companies seeing significant gains. ExxonMobil shares rose 4.2%, while Chevron gained 3.8%. The broader market indexes declined as investors worried about the economic impact of higher energy prices.`,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800",
    publishedAt: "2025-04-06T08:30:00Z",
    author: "Robert Williams",
    stocks: [
      { symbol: "XOM", price: 118.45, change: 4.2 },
      { symbol: "CVX", price: 165.30, change: 3.8 },
      { symbol: "BP", price: 38.25, change: 3.5 },
    ]
  }
];

export const checkAndSeedData = async () => {
  try {
    // Check if the articles collection is empty
    const articlesCollection = collection(db, "articles");
    const snapshot = await getDocs(articlesCollection);
    
    if (snapshot.empty) {
      console.log("No articles found, seeding initial data...");
      await seedInitialData(mockArticles);
    } else {
      console.log("Articles collection already contains data");
    }
  } catch (error) {
    console.error("Error checking/seeding data:", error);
  }
};
