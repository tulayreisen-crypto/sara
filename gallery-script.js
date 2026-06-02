// gallery-script.js
(function(){
  const gallery = document.getElementById('gallery');
  function load(){
    const images = JSON.parse(localStorage.getItem('sara_images')||'[]');
    if(!images.length){ gallery.innerHTML = '<p>لم تُحمّل صور بعد. استخدم لوحة التحكم لإضافة الصور.</p>'; return }
    gallery.innerHTML = '';
    images.slice().reverse().forEach(img=>{
      const card = document.createElement('div'); card.className='gallery-card';
      const el = document.createElement('img'); el.src = img.data; el.alt = img.title || '';
      el.addEventListener('click', ()=>{
        document.getElementById('lbimg').src = img.data; document.getElementById('lightbox').style.display='flex';
      });
      card.appendChild(el);
      gallery.appendChild(card);
    });
  }
  load();
  // also expose for homepage render
  window._sara_gallery = { reload: load };
})();
