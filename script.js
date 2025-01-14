var pricesN = [];
var yearsN = [];
var pricesM = [];
var yearsM = [];
var pricesA = [];
var yearsA = [];

async function getDataNvidia() {
    const response = await fetch("nvidia.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    rows.forEach((elem) => {
        const row = elem.split(",");
        const year = row[1];
        const price = row[5];
        yearsN.push(year);
        pricesN.push(parseFloat(price));
    });
}

async function getDataMeta() {
    const response = await fetch("meta.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    rows.forEach((elem) => {
        const row = elem.split(",");
        const year = row[0];
        const price = row[4];
        yearsM.push(year);
        pricesM.push(parseFloat(price));
    });
}

async function getDataAmazon() {
    const response = await fetch("amazon.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    rows.forEach((elem) => {
        const row = elem.split(",");
        const year = row[0];
        const price = row[4];
        yearsA.push(year);
        pricesA.push(parseFloat(price));
    });
}

function createChart() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearsN,
            datasets: [{
                label: 'NVIDIA',
                data: pricesN,
                borderWidth: 1
            },{
                label: 'META',
                data: pricesM,
                borderWidth: 1
            },{
                label: 'AMAZON',
                data: pricesA,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false 
                }
            }
        }
    });
}
getDataNvidia()
.then(getDataMeta)
.then(getDataAmazon)
.then(createChart)
.catch(error => {
    console.error("Error fetching data:" + error);
});
