function initHome() {
  console.log('%c init home', 'color:lightgreen')

  navigateTo()
}

function initGallery() {
  navigateTo()

}

function navigateTo(route = 'map') {
  const pages = [...document.querySelectorAll('.page')]
  const elBody = document.querySelector('body')
  pages.forEach((page) => {
    !page.classList.contains(route)
      ? (page.hidden = true)
      : (page.hidden = false)
  })
  renderBy(route)
  // setActiveClass(route)
}

// function setActiveClass(route) {
//  const elLinks = document.querySelectorAll('header a')
//  elLinks.forEach((link) => {
//   link.classList.remove('active')
//   if (link.name === route) link.classList.add('active')
//  })
// }

function renderBy(route) {
  switch (route) {
    case 'user':
      initUser()
      break
    case 'map':
      // in saved controller
      initMap()
      break
    case 'home':
    // in editor controller
    default:
      break
  }
}