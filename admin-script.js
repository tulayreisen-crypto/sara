(function(){
  // admin-script: add profile photo upload handling
  // existing variables and functions remain; we add handlers for profile image
  const profileInput = document.createElement('input');
  profileInput.type = 'file'; profileInput.accept = 'image/*'; profileInput.id = 'profileFile';
  const profileLabel = document.createElement('div'); profileLabel.style.marginTop='8px'; profileLabel.innerHTML = '<label class="small">صورة الملف الشخصي</label>';
  profileLabel.appendChild(profileInput);
  const imagesCard = document.querySelector('#imagesList')?.parentElement;
  if(imagesCard){ imagesCard.insertBefore(profileLabel, imagesCard.firstChild); }

  profileInput.addEventListener('change', function(){
    const f = this.files[0]; if(!f) return; const r = new FileReader(); r.onload = function(e){
      const data = e.target.result;
      localStorage.setItem('sara_profile_photo', data);
      // apply immediately to header and hero
      const headerImg = document.getElementById('headerPhoto');
      const heroImg = document.getElementById('heroPhoto');
      const aboutImg = document.getElementById('aboutPhoto');
      if(headerImg) headerImg.src = data;
      if(heroImg) heroImg.src = data;
      if(aboutImg) aboutImg.src = data;
      alert('تم تحديث الصورة الشخصية');
    }; r.readAsDataURL(f);
  });

  // expose a function to remove profile photo
  window._sara_admin_removeProfile = function(){ localStorage.removeItem('sara_profile_photo'); alert('تمت إزالة الصورة الشخصية المحلية. أعد تحميل الصفحة لعرض الصورة الافتراضية.'); }

  // keep existing admin script behavior
})();
