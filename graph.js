import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrTRA1OqClyqoeF3qtdnH63QT3N9dh0Wg",
    authDomain: "project-c12c6.firebaseapp.com",
    projectId: "project-c12c6",
    storageBucket: "project-c12c6.firebasestorage.app",
    messagingSenderId: "403135006428",
    appId: "1:403135006428:web:96e95ea04d8fee9f159619"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        if(localStorage.getItem("refresh") != null) {
            signOut(auth).then(() => {
                localStorage.removeItem("refresh");
                document.location.href = "index.html";
            }).catch((error) => {
                console.error(error);
            });
        } else {
            localStorage.setItem("refresh", "false");
        }
        getDataNvidia()
        .then(getDataMeta)
        .then(getDataAmazon)
        .then(createChart)
        .catch(error => {
            console.error(error);
        });
    } else {
        document.location.href = "index.html";
    }
});