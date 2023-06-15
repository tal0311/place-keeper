'use strict'

function makeId(length = 6) {
 const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
 var txt = ''
 for (var i = 0; i < length; i++) {
  txt += possible.charAt(Math.floor(Math.random() * possible.length))
 }
 return txt
}

function setUserMsg(msg) {
 document.querySelector('.user-msg').classList.toggle('open')
 if (!msg) return
 document.querySelector('.msg-txt').innerText = msg || ''
 setTimeout(setUserMsg, 2000)
}