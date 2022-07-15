//一些公共方法

// 获取当天是今年的第几周（周一到周日为一周）
// 如果当年1月1日不是周一，则1月第一个周一为第二周的开始
export function getWeekInYear() {
    var endDate = new Date(),
        curYear = endDate.getFullYear(),
        startDate = new Date(curYear, 0, 1);

    var startWeek = startDate.getDay(), // 1月1号是星期几:0-6
        offsetWeek = 0; //用来计算不完整的第一周，如果1月1号为星期一则为0，否则为1

    if (startWeek != 1) {
        offsetWeek = 1;
        if (!startWeek) {
            startDate.setDate(1);
        } else {
            startDate.setDate(8 - startWeek); // (7 - startWeek + 1)
        }
    }
    var distanceTimestamp = endDate - startDate,
        days = Math.ceil(distanceTimestamp / (24 * 60 * 60 * 1000)) + startWeek,
        weeks = Math.ceil(days / 7) + offsetWeek;
    return weeks;
}


// 底部导航
export const FooterList = [
    {
        path: '/movie',
        name: 'movie',
        text: '电影',
        icon: "icon-movie"
    },
    {
        path: '/shop',
        name: 'shop',
        text: '电影商城',
        icon: "icon-shangcheng",
        hot: true
    },
    {
        path: '/news',
        name: 'news',
        text: '新片上映',
        icon: "icon-zixun"
    },
    {
        path: '/mine',
        name: 'mine',
        text: '我的',
        icon: "icon-mine"
    },
    {
        path: '/cinema',
        name: 'cinema',
        text: '影院',
        icon: "icon-cinema"
    },
]


