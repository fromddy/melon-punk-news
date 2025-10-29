'use client'

import React from "react";

type NewsItem = {
    id: number;
    title: string;
    summary: string;
    url: string;
    date: string; // ISO string, 精确到分钟
};

// 示例新闻数据（日期精确到分钟）
const newsData: NewsItem[] = [
    {
        id: 2,
        title: "本地猫咪当选市长",
        summary: "小镇举行选举，意外选出一只长毛猫担任市长。居民表示‘终于有个会喵的领导了’。",
        url: "https://example.com/funny-news2",
        date: "2025-10-29T12:30:00",
    },
    {
        id: 3,
        title: "外星人要求加入朋友圈",
        summary: "据报道，一艘不明飞行物在市中心降落，并请求注册当地社交平台账号。网友评论：‘终于可以互发朋友圈了’。",
        url: "https://example.com/funny-news3",
        date: "2025-10-29T13:15:00",
    },
    {
        id: 4,
        title: "冰淇淋被判非法占用",
        summary: "法院裁定，夏日冰淇淋摊占用了‘清凉权’，必须立刻撤柜。摊主表示：‘我只是想帮大家消暑啊’。",
        url: "https://example.com/funny-news4",
        date: "2025-10-29T14:00:00",
    },
    {
        id: 5,
        title: "机器人举办脱口秀",
        summary: "AI 机器人在本地咖啡馆表演脱口秀，其冷幽默让观众既哭笑不得又点赞刷屏。",
        url: "https://example.com/funny-news5",
        date: "2025-10-29T15:45:00",
    },
    {
        id: 6,
        title: "面包成为新货币",
        summary: "由于通货膨胀，某国宣布面包为法定货币。市民排队买吐司，笑称‘终于可以用早餐付房租了’。",
        url: "https://example.com/funny-news6",
        date: "2025-10-29T16:30:00",
    },
    {
        id: 7,
        title: "鸭子入侵地铁",
        summary: "一群野鸭闯入地铁站，乘客全程录视频上传社交媒体。官方提醒：‘请保持安静，让鸭子上班’。",
        url: "https://example.com/funny-news7",
        date: "2025-10-29T17:15:00",
    },
];

export function News() {
    // 按完整时间排序（最新在前）
    const sortedNews = newsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="flex flex-col space-y-6">
            {sortedNews.map((news) => (
                <div
                    key={news.id}
                    className="relative p-6 rounded-lg bg-yellow-50 border border-yellow-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                    style={{
                        fontFamily: "'Times New Roman', serif",
                    }}
                >
                    {/* 老报纸纸纹背景 */}
                    <div className="absolute inset-0 bg-[url('/paper-texture.png')] bg-repeat opacity-10 rounded-lg pointer-events-none"></div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug border-b border-gray-400 pb-1">
                        {news.title}
                    </h2>
                    <p className="text-gray-800 mb-3 text-justify">{news.summary}</p>
                    <div className="flex justify-between items-center">
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 font-semibold underline"
                        >
                            Read more
                        </a>
                        {/* 显示完整日期到分钟 */}
                        <span className="text-gray-600 text-sm italic">
                            {new Date(news.date).toLocaleString("zh-CN", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}