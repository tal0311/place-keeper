function initUser() {
 console.log('init user');
 renderUserPrefs()
}

function handleSubmit(ev) {
 ev.preventDefault()
 console.log('ev', ev)
 const userPrefs = Object.fromEntries(new FormData(ev.target))

 setUser(userPrefs)
 renderUserPrefs()
}

function renderUserPrefs() {
 setUserMsg('Setting usr preferences')
 const user = getUser()
 if (!user) return
 const { bgColor, txtColor } = user
 console.log('bgColor, textColor:', bgColor, txtColor)
 const elBody = document.querySelector('body')
 elBody.style.backgroundColor = bgColor
 elBody.style.color = txtColor
}