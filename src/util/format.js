export default function formatDate(dateTime){
    const date = new Date(+dateTime);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}