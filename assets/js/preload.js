const customTitleBar = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
  const ttb = new customTitleBar.Titlebar();
  
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    element && (element.innerText = text);
  }
  
  ['chrome', 'node', 'electron'].forEach((type) => {
    replaceText(`${type}-version`, process.versions[type])
  });

  const t = setInterval(() => {
    const offset = document.querySelector('.titlebar').clientHeight;
    const el = document.querySelector(`[class*="nav"][class*="mainapp"][class*="container"]`);
    if(el) {
      el.style.top = `${offset}px`
      // clearInterval(t)
    }
  }, 500)
});
