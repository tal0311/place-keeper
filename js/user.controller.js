function initUser() {
 console.log('%c init user', 'color:lightgreen')
 renderUserPrefs()
}

function handleSubmit(ev) {
 ev.preventDefault()
 console.log('ev', ev)
 const userPrefs = Object.fromEntries(new FormData(ev.target))

 setUser(userPrefs)
 setUserMsg('Setting usr preferences')
 renderUserPrefs()
}

function renderUserPrefs() {
 const user = getUser()
 if (!user) return
 const { bgColor, txtColor } = user
 const elBody = document.querySelector('body')
 elBody.style.backgroundColor = bgColor
 elBody.style.color = txtColor
}