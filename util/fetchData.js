async function getDataset() {
    let today = new Date()

    let mo = today.getMonth() + 1;
    let da = today.getDate();
    let m = mo < 10 ? '0' + mo.toString() : mo.toString();
    let d = da < 10 ? '0' + (da).toString : (da).toString();
    let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + m + '-' + d + '-2020.csv'
    var prom = await fetch(url)
    var raw = await prom.text();
    while (raw.search("404: Not Found") != -1) {
        let x = 1;
        let yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - x)
        mo = yesterday.getMonth() + 1;
        da = yesterday.getDate();
        m = mo < 10 ? '0' + mo.toString() : mo.toString();
        d = da < 10 ? '0' + (da).toString : (da).toString();
        url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + m + '-' + d + '-2020.csv'
        prom = await fetch(url)
        raw = await prom.text();
        x++;
        today = yesterday;
    }
    var i = raw.search("Morocco");
    var j = i + raw.substring(i + 1).search("Morocco");
    var csv = raw.substring(i, j)
    var data = csv.split(",");

    return data[4];
}