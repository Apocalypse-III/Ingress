import { Base64 } from 'js-base64'

export function encrypt(content, passwd) {
    content = Base64.encode(content)
    let prand = ""
    for(let i = 0; i < passwd.length; i++) {
        prand += passwd.charCodeAt(i).toString()
    }
    let sPos = Math.floor(prand.length / 5)
    let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5))
    let incr = Math.ceil(passwd.length / 2)
    let modu = Math.pow(2, 31) - 1
    if(mult < 2) {
        console.error('Please choose a more complex or longer password.')
        return null
    }
    let salt = Math.round(Math.random() * 1000000000) % 100000000
    prand += salt
    while(prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString()
    }
    prand = (mult * prand + incr) % modu
    let enc_chr = ""
    let enc_str = ""
    for(let i = 0; i < content.length; i++) {
        enc_chr = parseInt((content.charCodeAt(i) ^ Math.floor((prand / modu) * 255)).toString())
        if(enc_chr < 16) {
            enc_str += "0" + enc_chr.toString(16)
        } else enc_str += enc_chr.toString(16)
        prand = (mult * prand + incr) % modu
    }
    salt = salt.toString(16)
    while(salt.length < 8)salt = "0" + salt
    enc_str += salt
    return enc_str
}

export function decrypt(content, passwd) {
    let prand = ""
    for(let i = 0; i < passwd.length; i++) {
        prand += passwd.charCodeAt(i).toString()
    }
    let sPos = Math.floor(prand.length / 5)
    let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5))
    let incr = Math.round(passwd.length / 2)
    let modu = Math.pow(2, 31) - 1
    let salt = parseInt(content.substring(content.length - 8, content.length), 16)
    content = content.substring(0, content.length - 8)
    prand += salt
    while(prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString()
    }
    prand = (mult * prand + incr) % modu
    let enc_chr = ""
    let enc_str = ""
    for(let i = 0; i < content.length; i += 2) {
        enc_chr = parseInt((parseInt(content.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255)).toString())
        enc_str += String.fromCharCode(enc_chr)
        prand = (mult * prand + incr) % modu
    }
    return Base64.decode(enc_str)
}
