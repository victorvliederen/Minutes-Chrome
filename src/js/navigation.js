'use strict'

let navIndex = 0 // Current navigation index

export function init () {
  document.addEventListener('mouseover', onDocumentMouseover, false)
  document.addEventListener('keydown', onDocumentKeydown, false)
  document.addEventListener('mouseout', onDocumentMouseout, false)
}

function onDocumentMouseover (e) {
  const target = e.target

  if (target.classList.contains('nav-index')) {
    removeAllSelections()

    target.classList.add('selected')

    const navItems = document.querySelectorAll('.nav-index')
    navIndex = [...navItems].indexOf(target)
  }
}

function onDocumentKeydown (e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    navigateDirection(e)
  } else if (e.key === 'Enter') {
    clickSelectedItem()
  }
}

function onDocumentMouseout () {
  removeAllSelections()
}

function navigateDirection (e) {
  e.preventDefault()

  switch (e.key) {
    case 'ArrowDown':
      setNavIndex()
      navigateListDown()
      break
    case 'ArrowUp':
      setNavIndex()
      navigateListUp()
      break
  }

  // Scroll to the top or bottom of the page if necessary
  if (navIndex <= 1) scrollToTop()
  if (navIndex >= document.querySelectorAll('.nav-index').length - 1) {
    scrollToBottom()
  }

  const navItem = document.querySelectorAll('.nav-index')[navIndex]
  navItem.classList.add('selected')
  navItem.scrollIntoView({ block: 'nearest' })
}

function setNavIndex () {
  // Set the current navigation index to 0 if it's not already set
  if (!navIndex) {
    navIndex = 0
  }
}

function navigateListDown () {
  const navItems = document.querySelectorAll('.nav-index')
  if (navItems[navIndex].classList.contains('selected')) {
    // Remove the selection from the current item and highlight the next item
    navItems[navIndex].classList.remove('selected')
    const newIndex =
      navIndex !== navItems.length - 1 ? navIndex + 1 : navItems.length - 1
    navIndex = newIndex
  } else {
    // Set the current index to 0 if no items are selected
    navIndex = 0
  }
}

function navigateListUp () {
  const navItems = document.querySelectorAll('.nav-index')
  if (navItems[navIndex].classList.contains('selected')) {
    // Remove the selection from the current item and highlight the previous item
    navItems[navIndex].classList.remove('selected')
    const newIndex = navIndex !== 0 ? navIndex - 1 : 0
    navIndex = newIndex
  } else {
    // Set the current index to the last item if no items are selected
    navIndex = navItems.length - 1
  }
}

function clickSelectedItem () {
  const selectedItem = document.querySelectorAll('.nav-index')[navIndex]
  if (selectedItem) selectedItem.click()
}

function removeAllSelections () {
  const navItems = document.querySelectorAll('.nav-index')
  for (const item of navItems) {
    item.classList.remove('selected')
  }

  navIndex = 0
}

function scrollToTop () {
  window.scrollTo(0, 0)
}

function scrollToBottom () {
  window.scrollTo(0, document.body.scrollHeight)
}
