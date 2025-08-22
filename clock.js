// Convert lunar day number into iOS-style Chinese format
function getLunarDayName(day) {
    const chineseNums = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    if (day <= 10) {
        return "初" + chineseNums[day - 1];       // 初一 ~ 初十
    } else if (day < 20) {
        return "十" + chineseNums[day - 11];      // 十一 ~ 十九
    } else if (day === 20) {
        return "二十";
    } else if (day < 30) {
        return "廿" + chineseNums[day - 21];      // 廿一 ~ 廿九
    } else {
        return "三十";                            // 三十
    }
}

// Get Lunar Calendar (农历)
function getLunarDate(date) {
    try {
        const lunarFormatter = new Intl.DateTimeFormat('zh-u-ca-chinese', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const lunarString = lunarFormatter.format(date);
        // Example: "2025乙巳年七月1"

        // Extract the day number at the end
        const match = lunarString.match(/(\d+)$/);
        if (match) {
            const dayNum = parseInt(match[1], 10);
            const lunarDayName = getLunarDayName(dayNum);
            return lunarString.replace(/\d+$/, lunarDayName);
        }
        return lunarString;
    } catch {
        return "农历不支持";
    }
}

function currentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday = (hour >= 12) ? "PM" : "AM";
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour);

    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " " + midday;
    setTimeout(currentTime, 1000);

    // --- Gregorian Calendar ---
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = date.toLocaleDateString('en-US', options);

    // --- Lunar Calendar ---
    document.getElementById('lunar').textContent = getLunarDate(date);
}


function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

currentTime(); /* calling currentTime() function to initiate the process */