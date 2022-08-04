function tabdivs(cls = 'tabdivs') {
  // Set up the tab styles
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.textContent = `
  body {
    transition: all 1s;
  }
  [aria-expanded='false'] {
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
  [aria-selected='true'] {
    background-color: white;
    border-color: blue;
  }
  `;
  document.head.appendChild(styleSheet)

  const tabGroups = document.querySelectorAll(`.${cls}`)
  tabGroups.forEach(
    (tabGroup, groupNum) => {
      const tabDivs = tabGroup.querySelectorAll(':scope > div')
      const tabList = document.createElement('ul')
      tabList.setAttribute('role', 'tablist')
      // Build the tablist and setup the divs to be tabpanels
      tabDivs.forEach(
        (tabDiv, divNum) => {
          const li = document.createElement('li')
          const btn = document.createElement('button')
          const tabpanelId = `tabpanel-${groupNum}-${divNum}`
          tabDiv.setAttribute('id', tabpanelId)
          tabDiv.setAttribute('aria-expanded', 'false')
          btn.setAttribute('role', 'tab')
          btn.setAttribute('aria-selected', 'false')
          btn.dataset.tabIndex = divNum
          btn.setAttribute('aria-controls', tabpanelId)
          const tabLabel = document.createTextNode(tabDiv.dataset.tabLabel || `Tab ${divNum + 1}`)
          btn.appendChild(tabLabel)
          li.appendChild(btn)
          tabList.appendChild(li)
        }
      )
      const tabButtons = tabList.querySelectorAll(':scope > li > button')
      // Add event handler for each tab button
      tabButtons.forEach(
        btn => {
          btn.addEventListener(
            'click',
            evt => {
              const thisButton = evt.target
              const tabpanelId = thisButton.getAttribute('aria-controls')
              tabButtons.forEach(elt => elt.setAttribute('aria-selected', 'false'))
              tabDivs.forEach(elt => elt.setAttribute('aria-expanded', 'false'))
              thisButton.setAttribute('aria-selected', 'true')
              document.getElementById(tabpanelId).setAttribute('aria-expanded', 'true')
            }
          )
        }
      )
      // Initialize to show first tab
      tabButtons[0].setAttribute('aria-selected', true)
      tabDivs[0].setAttribute('aria-expanded', true)
      tabGroup.insertBefore(tabList, tabGroup.firstChild)
    }
  )
}

function tabdivsInit() {
  window.addEventListener('load', () => tabdivs())
}

tabdivsInit()
