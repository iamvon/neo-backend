const Neo = require('@cityofzion/neon-js')
const rpc = Neo.rpc
const Neon = Neo.default

let publicKey = '0361e09663f44ae15dff4f59064575af7a9095fed9205480d2cf6cc225bae66213'
let contractAddr = '0x87a61ee8b47876e6ef437c4c403687d2a4f28804'
// let byteArray = "b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'"
let WIF = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'
let account = Neon.create.account(WIF);
let privateKey = Neo.wallet.getPrivateKeyFromWIF(WIF)
const localAddress = require('./properties').address
let networkUrl = `http://${localAddress}:30333`  //'http://localhost:30333'
let neoscanUrl = `http://${localAddress}:4000/api/main_net` //'http://localhost:4000/api/main_net'
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

const writeRequest = {
  net: neoscanUrl,
  url: networkUrl,
  script: null,  
  address: null,
  privateKey: account.privateKey,
  publicKey: account.publicKey,
  gas: 0,
  balance: null
};

let setToken = function(address, amount) {
  setToken = Neon.create.script({ scriptHash: scriptHash, operation: "setToken", args: [Neon.u.reverseHex(Neo.wallet.getScriptHashFromAddress(address)), amount]})

  Neo.api.neoscan.getBalance(neoscanUrl, account.address).then(data => {
    let setTokenRequest = writeRequest
    setTokenRequest.address = address
    setTokenRequest.script = setToken
    setTokenRequest.balance = data
    Neon.doInvoke(setTokenRequest).then(res => console.log(res.response));
  }).catch(err => {
    console.log(err)
  });
}

let bonusToken = function(address, amount) {
  bonusToken = Neon.create.script({ scriptHash: scriptHash, operation: "bonusToken", args: [Neon.u.reverseHex(Neo.wallet.getScriptHashFromAddress(address)), amount]})

  Neo.api.neoscan.getBalance(neoscanUrl, account.address).then(data => {
    let bonusTokenRequest = writeRequest
    bonusTokenRequest.address = address
    bonusTokenRequest.script = bonusToken
    bonusTokenRequest.balance = data
    Neon.doInvoke(bonusTokenRequest).then(res => console.log(res.response));
  }).catch(err => {
    console.log(err)
  });
}

let minusToken = function(address, amount) {
  minusToken = Neon.create.script({ scriptHash: scriptHash, operation: "minusToken", args: [Neon.u.reverseHex(Neo.wallet.getScriptHashFromAddress(address)), amount]})

  Neo.api.neoscan.getBalance(neoscanUrl, account.address).then(data => {
    let minusTokenRequest = writeRequest
    minusTokenRequest.address = address
    minusTokenRequest.script = minusToken
    minusTokenRequest.balance = data
    Neon.doInvoke(minusTokenRequest).then(res => console.log(res.response));
  }).catch(err => {
    console.log(err)
  });
}

let balanceOf = function(address) {
  get_BalanceOf = {scriptHash, operation: 'balanceOf', args: [Neon.u.reverseHex(Neo.wallet.getScriptHashFromAddress(address))]}

  const balanceOfScript = Neon.create.script(get_BalanceOf) 
  rpc.Query.invokeScript(balanceOfScript)
  .execute(networkUrl)                 
  .then(res => {
    console.log("Balance of:", addr_1, ":",res.result.stack[0].value) 
}).catch(error => {
  console.log(error)
})
}

let getTime = function() {
  getTime = {scriptHash, operation: 'getTime', args: []}

  const getTimeScript = Neon.create.script(getTime) 
  rpc.Query.invokeScript(getTimeScript)
  .execute(networkUrl)                 
  .then(res => {
    console.log("unixTime:", res.result.stack[0].value) 
}).catch(error => {
  console.log(error)
})
}

// setToken(account.address, 500)
// bonusToken(account.address, 100)
// minusToken(account.address, 50)
// balanceOf(account.address)
// getTime()

module.exports = {
  setToken, 
  bonusToken, 
  minusToken, 
  balanceOf, 
  getTime,
  account
}