const Web3 = window.Web3;

var web3 = undefined;

const deployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // 適宜変更する
var abi = undefined;
var contract = undefined;


var defaultAccount = null;

const messages = [];
const times = [];
let clearN = 0;
// Walletに接続
async function connectWallet() {
    try {
        web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        defaultAccount = accounts[0];

        fetch("/Messages.json").then(resp => resp.json()).then((data) => {
            abi = data.abi;
            contract = new web3.eth.Contract(abi, deployedAddress);
        });

        window.alert("Walletに接続済み");
    } catch (e) {
        console.log('Failed to connect a wallet', e);
    }
}

// KVSに書き込み
async function handleCreate() {
    const key = document.getElementById('create-name').value;
    const value = document.getElementById('create-message').value;
    if (!key || !value) {
        window.alert("Error: NameとMessageの両方を埋めてください");
        return;
    }

    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log(latestBlockNumber);

        await contract.methods.write(key, value).send({
            from: defaultAccount,
            gas: 300000,
        }, latestBlockNumber);
        let date = new Date(2010, 2, 11, 11, 24, 30, 776);
        let now = new Date();
        messages.push([key, value,now]);

    } catch (e) {
        console.log(e);
    }

    console.log('end');
}

// 読み込み
async function read() {
    try {
        let key = document.getElementById('create-name');
        key.value = "";
        var value = document.getElementById('create-message');
        value.value = "";

        let keys = await contract.methods.getKeys().call();
        console.log(keys);

        const valuesElement = document.getElementById('values');
        valuesElement.innerHTML = '';

        for (let i = 0; i<messages.length; i++) {
            const li = document.createElement('li');
            const bt = document.createElement('button');
            const nbt = document.createElement('button');
            li.innerText = `${i+1} 名前: ${messages[i][0]}: ${messages[i][2]}\n> ${messages[i][1]}`;
            bt.innerText = "✅";
            nbt.innerText = "☑️";
            bt.onclick = send();
            valuesElement.appendChild(li);
            valuesElement.appendChild(bt);
            valuesElement.appendChild(nbt);
        }
        clearN = messages.length

    } catch (e) {
        console.log(e);
        window.alert("エラー");
    }
}

//画面クリア
async function delall() {
    try {
        clearN = messages.length
        messages.length = 0;
        this.read();

    } catch (e) {
        console.log(e);
        window.alert("エラー");
    }
}

async function send() {
    try {
        console.log("Sending...");
    } catch (err) {
        console.error(err);
    }
}
