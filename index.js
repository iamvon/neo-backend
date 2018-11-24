const Neo = require('@cityofzion/neon-js')
const rpc = Neo.rpc
const Neon = Neo.default

let publicKey = '0361e09663f44ae15dff4f59064575af7a9095fed9205480d2cf6cc225bae66213'
let contractAddr = '0x87a61ee8b47876e6ef437c4c403687d2a4f28804'
// let byteArray = "b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'"
let WIF = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'
let account = Neon.create.account(WIF);
let privateKey = Neo.wallet.getPrivateKeyFromWIF(WIF)
let networkUrl = 'http://localhost:30333'
let neoscanUrl = 'http://localhost:4000/api/main_net'
let addr_1 = "e9eed8dc39332032dc22e5d6e86332c50327ba23"
const scriptHash = '1825a77f40149e0272b217c480b676136a2f456f' // Scripthash for the contract

// =======================================================================================

// let accountAmount = 50
// let WIFList = []
// let genPrivateKey
// let wif
// for(let i = 0; i < accountAmount; ++i) {
//     genPrivateKey = Neon.create.privateKey(i)
//     wif = Neon.get.WIFFromPrivateKey(privateKey)
//     WIFList.push(wif)
// }

// // Verify keys
// console.log(Neon.is.wif(wif))
// console.log(WIFList)

// let genPrivateKeyA = Neon.create.privateKey()
// let wifA = Neon.get.WIFFromPrivateKey(privateKey)
// console.log(wifA)

//===========================================================================================

// List of smart contract method scripts
let amountToken = 50;
const setToken = Neon.create.script({ scriptHash: scriptHash, operation: "setToken", args: [Neon.u.reverseHex(addr_1), amountToken]})
const bonusToken = Neon.create.script({ scriptHash: scriptHash, operation: "bonusToken", args: [Neon.u.reverseHex(addr_1), amountToken]})
const minusToken = Neon.create.script({ scriptHash: scriptHash, operation: "minusToken", args: [Neon.u.reverseHex(addr_1), amountToken]})
const get_BalanceOf = {scriptHash, operation: 'balanceOf', args: [Neon.u.reverseHex(addr_1)]}
const get_getTime = {scriptHash, operation: 'getTime', args: []}

// writeRequest to choose what method to write to NEO blockchain
const writeRequest = {
  net: neoscanUrl,
  url: networkUrl,
  script: minusToken,  // Change this method script to WRITE
  address: account.address,
  privateKey: account.privateKey,
  publicKey: account.publicKey,
  gas: 0,
  balance: null
};

// Sign and writing to NEO blockchain
Neo.api.neoscan.getBalance(neoscanUrl, account.address).then(data => {
  writeRequest.balance = data;
  Neon.doInvoke(writeRequest).then(res => console.log(res.response));
}).catch(err => {
  console.log(err)
});


// Query the NEO blockchain
const multipleQueryScript = Neon.create.script(get_getTime)  // Change this method script to READ
rpc.Query.invokeScript(multipleQueryScript)
  .execute(networkUrl)                 
  .then(res => {
    console.log("Balance of:", addr_1, ":",res.result.stack[0].value) 
}).catch(error => {
  console.log(error)
})

