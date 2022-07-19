function tabdivs(cls = 'tabdivs') {
  // Set up the tab styles
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.textContent = `
  body {
    transition: all 1s;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap; /* added line */
    border: 0;
  }
  .${cls} > div {
    padding: 1em;
    margin: 0 1em 1em;
    border: 1px solid green;
    display: block;
    box-shadow: 5px 5px pink;
    height: initial;
  }
  .${cls} > div.selected {
  }
  .${cls} ul {
    margin: 1em 0 0;
  }
  .${cls} li {
    display: inline;
    margin-right: .5em;
  }
  .${cls} button {
    border: 1px solid gray;
    border-bottom: 0;
  }
  button.selected {
    background-color: white;
    border-color: blue;
  }
  `;
  document.head.appendChild(styleSheet)

  const tabGroups = document.querySelectorAll(`.${cls}`)
  tabGroups.forEach(
    tabGroup => {
      const tabDivs = tabGroup.querySelectorAll(':scope > div')
      const tabList = document.createElement('ul')
      // Create an <li> containing tab button for eaach tabbed div
      for (let x = 0; x < tabDivs.length; x++) {
        const li = document.createElement('li')
        const btn = document.createElement('button')
        btn.dataset.tabIndex = x
        const tabLabel = document.createTextNode(tabDivs[x].dataset.tabLabel || `Tab ${x + 1}`)
        btn.appendChild(tabLabel)
        li.appendChild(btn)
        tabList.appendChild(li)
      }
      const tabButtons = tabList.querySelectorAll(':scope > li > button')
      // Add event handler for each tab button
      tabButtons.forEach(
        btn => {
          btn.addEventListener(
            'click',
            evt => {
              const thisButton = evt.target
              const tabIndex = thisButton.dataset.tabIndex
              tabButtons.forEach(elt => elt.classList.remove('selected'))
              tabDivs.forEach(elt => elt.classList.add('visually-hidden'))
              thisButton.classList.add('selected')
              tabDivs[tabIndex].classList.remove('visually-hidden')
            }
          )
        }
      )
      // Initialize to show first tab
      tabButtons[0].classList.add('selected')
      tabDivs.forEach((elt, idx) => idx > 0 && elt.classList.add('visually-hidden'))
      tabGroup.insertBefore(tabList, tabGroup.firstChild)
    }
  )
}

function tabdivsInit() {
  window.addEventListener('load', () => tabdivs())
}

tabdivsInit()
