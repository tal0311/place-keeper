function initHome() {
  console.log('%c init home', 'color:lightgreen')
  navigateTo()
}

function initGallery() {
  navigateTo()

}

function navigateTo(route = 'home') {
  const pages = [...document.querySelectorAll('.page')]
  const elBody = document.querySelector('body')
  pages.forEach((page) => {
    !page.classList.contains(route)
      ? (page.hidden = true)
      : (page.hidden = false)
  })
  renderBy(route)
  setActiveClass(route)
}

function setActiveClass(route) {

  const elLinks = document.querySelectorAll('nav li')
  elLinks.forEach((link) => {
    const linkName = link.getAttribute('name')
    link.classList.remove('active')
    if (linkName === route) link.classList.add('active')
  })
}

function renderBy(route) {
  switch (route) {
    case 'user':
      // in User controller
      initUser()
      break
    case 'map':
      // in Map controller
      initMap()
      break
    case 'home':
    // in Home controller
    default:
      break
  }
}