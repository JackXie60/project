//根据输入的年份获取当年的起始时间和终止时间
export default function getYearTime(year) {
    const yearStart = new Date(new Date(new Date(new Date(new Date().setHours(0, 0, 0, 0)).setMonth(0)).setDate(1)).setFullYear(year)).getTime();
    const yearEnd = new Date(new Date(new Date(new Date(new Date().setHours(0, 0, 0, 0)).setMonth(0)).setDate(1)).setFullYear(year+1)).getTime();
    return {
        yearStart,
        yearEnd,
    }
}