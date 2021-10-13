const Web3 = require("web3");

// const web3 = new Web3(
//     new Web3.providers.HttpProvider(
//         "https://rinkeby.infura.io/v3/da1d44097f014ed18c889adf79df9350"
//     )
// );

// Get balance of 1 address
// web3.eth.getBalance(
//     "0x2492985f2a3A6aC21573Bf9dA2E6efA7770BF930",
//     function (err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(web3.utils.fromWei(result, "ether") + " ETH");
//         }
//     }
// );

// let fetch = require("node-fetch");

// fetch(
//     "https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a&apikey=JSXICG3EMIIEXRMN7TVH7CHV5A637CWSQV",
//     {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: "{}",
//     }
// )
//     .then((response) => {
//         return response.json();
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// var myAddr = "0x7F101fE45e6649A6fB8F3F8B43ed03D353f2B90c";
// var currentBlock = web3.eth.blockNumber;
// var n = web3.eth.getTransactionCount(myAddr, currentBlock);
// var bal = web3.eth.getBalance(myAddr, currentBlock);
// for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
//     try {
//         var block = web3.eth.getBlock(i, true);
//         if (block && block.transactions) {
//             block.transactions.forEach(function (e) {
//                 if (myAddr == e.from) {
//                     if (e.from != e.to) bal = bal.plus(e.value);
//                     console.log(i, e.from, e.to, e.value.toString(10));
//                     --n;
//                 }
//                 if (myAddr == e.to) {
//                     if (e.from != e.to) bal = bal.minus(e.value);
//                     console.log(i, e.from, e.to, e.value.toString(10));
//                 }
//             });
//         }
//     } catch (e) {
//         console.error("Error in block " + i, e);
//     }
// }

var request = require("request");
request(
    "https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=0x041bb5c6dd8a97e8bad4674ebf6a09aac49f0f44a49ee6c6eab6072776337c93&apikey=JSXICG3EMIIEXRMN7TVH7CHV5A637CWSQV",
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body); // Print the google web page.
        }
    }
);
