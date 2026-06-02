// script.js - apply settings (whatsapp, branding, font)
(function(){
  const settings = JSON.parse(localStorage.getItem('sara_settings')||'{}');
  // WhatsApp
  const whatsapp = document.querySelector('.whatsapp');
  if(whatsapp){
    const number = settings.whatsapp || '0000000000';
    whatsapp.href = 'https://wa.me/'+number;
  }
  // Branding colors
  if(settings.colorPrimary) document.documentElement.style.setProperty('--purple', settings.colorPrimary);
  if(settings.colorGold) document.documentElement.style.setProperty('--gold', settings.colorGold);
  // Font
  if(settings.font){
    const href = `https://fonts.googleapis.com/css2?family=${settings.font}:wght@400;600;700&display=swap`;
    if(!document.getElementById('gfont')){
      const l = document.createElement('link'); l.id='gfont'; l.rel='stylesheet'; l.href=href; document.head.appendChild(l);
    } else { document.getElementById('gfont').href = href }
    const fontName = settings.font.replace('+',' ');
    document.documentElement.style.setProperty('--site-font', `'${fontName}', system-ui, sans-serif`);
    document.body.style.fontFamily = `var(--site-font)`;
  }
  // Homepage content (hero)
  const hp = JSON.parse(localStorage.getItem('sara_home')||'{}');
  if(hp.title && document.querySelector('.hero-title')) document.querySelector('.hero-title').textContent = hp.title;
  if(hp.lead && document.querySelector('.hero-lead')) document.querySelector('.hero-lead').textContent = hp.lead;
  if(hp.cta && document.querySelector('.btn.primary')) document.querySelector('.btn.primary').textContent = hp.cta;
})();
