const bip32 = require("bip32") //protocolo para carteiras hierárquicas deterministicas (HD wallets)
const bip39 = require("bip39") // frases mnemônicas
const bitcoin = require("bitcoinjs-lib") // lib para criar, assinar e manipular transações Bitcoin

const network = bitcoin.networks.testnet // definindo a rede

const path = `m/49'/1'/0'/0` // caminho de derivação (hd wallet path)
const mnemonic = bip39.generateMnemonic() // gerando frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic) // converter mnemônica para seed

const root = bip32.fromSeed(seed, network) // gerar master key

// formar a conta e a chave de endereço
const account = root.derivePath(path) 
const node = account.derive(0).derive(0)

// gerar endereço bitcoin (p2pkh)
const btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//exibindo carteira gerada
console.log("Generate Wallet")
console.log("Address: ", btcAddress)
console.log("Private key: ", node.toWIF())
console.log("Seed: ", mnemonic)

// Resumo: 
// Este código gera uma carteira Bitcoin testnet a partir 
// de uma frase mnemônica (BIP39), converte essa frase em 
// uma seed, usa essa seed para derivar chaves conforme o 
// caminho BIP49 (SegWit), e finalmente imprime o endereço 
// Bitcoin, a chave privada e a frase mnemônica.