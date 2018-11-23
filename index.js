const Neo = require('@cityofzion/neon-js')
const rpc = Neo.rpc
const Neon = Neo.default

let publicKey = '0361e09663f44ae15dff4f59064575af7a9095fed9205480d2cf6cc225bae66213'
let contractAddr = '0xb5014adc0636b8445a1f75e41da5e9a3f3c39daa'
let byteArray = "b'\xb9{\x8e\x9f%%\xcao\x8e\x8b\x9c}\xc5$\x9b\xaa\x86\x8cB\xeb'"
let WIF = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'
let account = Neon.create.account(WIF);
let privateKey = Neo.wallet.getPrivateKeyFromWIF(WIF)
let networkUrl = 'http://localhost:30333'
let neoscanUrl = 'http://localhost:4000/api/main_net'
let addr_1 = "eb428c86aa9b24c57d9c8b8e6fca25259f8e7bb9"
let addr_2 = "e9eed8dc39332032dc22e5d6e86332c50327ba23"
const scriptHash = 'b5014adc0636b8445a1f75e41da5e9a3f3c39daa' // Scripthash for the contract

const request = {
  net: neoscanUrl,
  url: networkUrl,
  script: Neon.create.script({
    scriptHash: scriptHash,
    operation: "balanceOf",
    args: [Neon.u.reverseHex(addr_2)]
  }),
  address: account.address,
  privateKey: account.privateKey,
  publicKey: account.publicKey,
  gas: 1,
  balance: null
};

Neon.doInvoke(request).then(res => {
  console.log(res);
}).catch(err => { 
  console.log(err)
});


