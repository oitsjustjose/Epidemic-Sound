const customTitleBar = require('custom-electron-titlebar');

const bootstrapFont = () => {
  if("fonts" in document) {
    const epidemicFont = new FontFace("Epidemic", "url(https://cdn.epidemicsound.com/legacy/19/fonts/epidemic/Epidemic-Medium.woff2) format('woff2')");
    epidemicFont.load().then((face) => {
      document.fonts.add(face);
    });
  }

  document.querySelector('body > .titlebar').style.fontFamily = 'Epidemic, sans-serif'
}

window.addEventListener('DOMContentLoaded', () => {
  const colors = {
    light: customTitleBar.Color.fromHex('#FFF'), 
    dark: customTitleBar.Color.fromHex('#333')
  };
  
  const color = (
    window.matchMedia('(prefers-color-scheme)').matches 
    && window.matchMedia('(prefers-color-scheme: light)').matches
  ) ? colors.light : colors.dark;
    
  const ttb = new customTitleBar.Titlebar({
    backgroundColor: color
  });
  
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    element && (element.innerText = text);
  };
  
  ['chrome', 'node', 'electron'].forEach((type) => {
    replaceText(`${type}-version`, process.versions[type])
  });

  bootstrapFont()

  let cached = null;
    
  setInterval(() => {
    if(location.pathname !== cached) {
      cached = location.pathname;
      console.log(cached)
      const offset = document.querySelector('.titlebar').clientHeight;
      const el = document.querySelector(`[class*="nav"][class*="mainapp"][class*="container"]`);
      el && (el.style.top = `${offset}px`)
    }
  }, 250);
});
