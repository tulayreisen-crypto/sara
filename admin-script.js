(function(){
  const loginBox = document.getElementById('loginBox');
  const dashboard = document.getElementById('dashboard');
  const loginBtn = document.getElementById('loginBtn');
  const logout = document.getElementById('logout');
  const passInput = document.getElementById('pass');
  const waInput = document.getElementById('waNumber');
  const saveBtn = document.getElementById('saveSettings');
  const imagesList = document.getElementById('imagesList');
  const uploadBtn = document.getElementById('uploadImage');
  const imageFile = document.getElementById('imageFile');
  const imageTags = document.getElementById('imageTags');
  const imageTitle = document.getElementById('imageTitle');
  const imageCaption = document.getElementById('imageCaption');
  const clearImages = document.getElementById('clearImages');
  const projectsList = document.getElementById('projectsList');
  const addProject = document.getElementById('addProject');
  const testimonialsList = document.getElementById('testimonialsList');
  const addTestimonial = document.getElementById('addTestimonial');
  const articlesList = document.getElementById('articlesList');
  const addArticle = document.getElementById('addArticle');
  const faqList = document.getElementById('faqList');
  const addFAQ = document.getElementById('addFAQ');
  const statsDiv = document.getElementById('stats');
  const demoLoad = document.getElementById('demoLoad');
  const heroTitle = document.getElementById('heroTitle');
  const heroLead = document.getElementById('heroLead');
  const heroCta = document.getElementById('heroCta');
  const saveHero = document.getElementById('saveHero');
  const fontSelect = document.getElementById('fontSelect');
  const colorPrimary = document.getElementById('colorPrimary');
  const colorGold = document.getElementById('colorGold');
  const resetBrand = document.getElementById('resetBrand');

  const PASSWORD = '1234';
  const IMG_KEY = 'sara_images';
  const PROJ_KEY = 'sara_projects';
  const TEST_KEY = 'sara_testimonials';
  const FAQ_KEY = 'sara_faq';
  const ARTICLE_KEY = 'sara_articles';

  // login
  loginBtn.addEventListener('click', ()=>{
    if(passInput.value === PASSWORD){
      loginBox.style.display='none'; dashboard.style.display='block';
      loadDashboard();
    } else {alert('كلمة مرور خاطئة')}
  });
  logout.addEventListener('click', ()=>{dashboard.style.display='none';loginBox.style.display='block'});

  // demo load
  demoLoad.addEventListener('click', ()=>{
    if(!confirm('ستستبدل بعض البيانات التجريبية؟')) return;
    seedDemo();
    loadDashboard();
    alert('تم تحميل بيانات تجريبية');
  });

  // settings save
  saveBtn.addEventListener('click', ()=>{
    const settings = JSON.parse(localStorage.getItem('sara_settings')||'{}');
    settings.whatsapp = waInput.value.trim();
    settings.font = fontSelect.value || '';
    settings.colorPrimary = colorPrimary.value || '#7C3AED';
    settings.colorGold = colorGold.value || '#D4A574';
    localStorage.setItem('sara_settings', JSON.stringify(settings));
    applyBranding(settings);
    alert('تم حفظ الإعدادات');
    renderStats();
  });

  resetBrand.addEventListener('click', ()=>{
    colorPrimary.value = '#7C3AED'; colorGold.value = '#D4A574';
    saveBtn.click();
  });

  // hero save
  saveHero.addEventListener('click', ()=>{
    const hp = JSON.parse(localStorage.getItem('sara_home')||'{}');
    hp.title = heroTitle.value; hp.lead = heroLead.value; hp.cta = heroCta.value;
    localStorage.setItem('sara_home', JSON.stringify(hp));
    alert('تم تحديث محتوى الصفحة الرئيسية');
    // update homepage if open in another tab via localStorage event
    renderStats();
  });

  // image upload
  uploadBtn.addEventListener('click', ()=>{
    const file = imageFile.files[0];
    if(!file){ alert('اختر صورة أولاً'); return; }
    const reader = new FileReader();
    reader.onload = function(e){
      const data = e.target.result;
      const list = JSON.parse(localStorage.getItem(IMG_KEY)||'[]');
      const item = {id: Date.now(), data, title: imageTitle.value || '', caption: imageCaption.value||'', tags: (imageTags.value||'').split(',').map(s=>s.trim()).filter(Boolean)};
      list.push(item); localStorage.setItem(IMG_KEY, JSON.stringify(list));
      imageFile.value=''; imageTags.value=''; imageTitle.value=''; imageCaption.value='';
      renderImages();
      window._sara_gallery && window._sara_gallery.reload && window._sara_gallery.reload();
      renderSuccessStories();
      renderStats();
      alert('تم رفع الصورة');
    };
    reader.readAsDataURL(file);
  });

  clearImages.addEventListener('click', ()=>{
    if(!confirm('حذف كل الصور؟')) return; localStorage.removeItem(IMG_KEY); renderImages(); renderSuccessStories(); renderStats();
  });

  function renderImages(){
    const list = JSON.parse(localStorage.getItem(IMG_KEY)||'[]');
    if(!list.length){ imagesList.innerHTML = '<p class="small">لا توجد صور</p>'; return }
    imagesList.innerHTML = '';
    list.slice().reverse().forEach(img=>{
      const div = document.createElement('div'); div.className='list-item';
      const im = document.createElement('img'); im.src = img.data; im.className='thumb';
      const meta = document.createElement('div'); meta.style.flex='1'; meta.innerHTML = `<strong>${img.title||'بدون عنوان'}</strong><div class='small'>${(img.tags||[]).join(', ')}</div>`;
      const del = document.createElement('button'); del.className='btn secondary'; del.textContent='حذف'; del.addEventListener('click', ()=>{ deleteImage(img.id); });
      const tagBtn = document.createElement('button'); tagBtn.className='btn'; tagBtn.textContent='تحرير'; tagBtn.addEventListener('click', ()=>{ editImage(img.id); });
      div.appendChild(im); div.appendChild(meta); div.appendChild(tagBtn); div.appendChild(del);
      imagesList.appendChild(div);
    });
  }
  function deleteImage(id){ let list = JSON.parse(localStorage.getItem(IMG_KEY)||'[]'); list = list.filter(x=>x.id!==id); localStorage.setItem(IMG_KEY, JSON.stringify(list)); renderImages(); renderSuccessStories(); renderStats(); }
  function editImage(id){ const list = JSON.parse(localStorage.getItem(IMG_KEY)||'[]'); const item = list.find(x=>x.id===id); if(!item) return; const t = prompt('عنوان الصورة', item.title||'')||''; const c = prompt('تعليق', item.caption||'')||''; const tags = prompt('وسوم مفصولة بفاصلة', (item.tags||[]).join(','))||''; item.title = t; item.caption = c; item.tags = tags.split(',').map(s=>s.trim()).filter(Boolean); localStorage.setItem(IMG_KEY, JSON.stringify(list)); renderImages(); renderSuccessStories(); }

  // Projects
  addProject.addEventListener('click', ()=>{
    const title = prompt('عنوان المشروع'); if(!title) return; const desc = prompt('وصف المشروع')||''; const imgId = prompt('مصدر الصورة (id أو اتركه فارغًا)')||''; const projects = JSON.parse(localStorage.getItem(PROJ_KEY)||'[]'); projects.push({id:Date.now(),title,desc,imageId:imgId}); localStorage.setItem(PROJ_KEY, JSON.stringify(projects)); renderProjects(); renderStats();
  });
  function renderProjects(){ const list = JSON.parse(localStorage.getItem(PROJ_KEY)||'[]'); if(!list.length){ projectsList.innerHTML='<p class="small">لا توجد مشاريع</p>'; return } projectsList.innerHTML=''; list.slice().reverse().forEach(p=>{ const d=document.createElement('div'); d.className='list-item'; d.innerHTML=`<div style="flex:1"><strong>${p.title}</strong><div class="small">${p.desc||''}</div></div>`; const del=document.createElement('button'); del.className='btn secondary'; del.textContent='حذف'; del.addEventListener('click', ()=>{ deleteProject(p.id); }); const edit=document.createElement('button'); edit.className='btn'; edit.textContent='تعديل'; edit.addEventListener('click', ()=>{ editProject(p.id); }); d.appendChild(edit); d.appendChild(del); projectsList.appendChild(d); }); }
  function deleteProject(id){ let list = JSON.parse(localStorage.getItem(PROJ_KEY)||'[]'); list = list.filter(x=>x.id!==id); localStorage.setItem(PROJ_KEY, JSON.stringify(list)); renderProjects(); renderStats(); }
  function editProject(id){ const list = JSON.parse(localStorage.getItem(PROJ_KEY)||'[]'); const p = list.find(x=>x.id===id); if(!p) return; const title = prompt('عنوان المشروع', p.title)||''; const desc = prompt('الوصف', p.desc)||''; p.title=title; p.desc=desc; localStorage.setItem(PROJ_KEY, JSON.stringify(list)); renderProjects(); }

  // Testimonials
  addTestimonial.addEventListener('click', ()=>{
    const name = prompt('اسم العميل')||''; const text = prompt('نص التوصية (HTML مبسط)')||''; const video = prompt('رابط فيديو (اختياري)')||''; const list = JSON.parse(localStorage.getItem(TEST_KEY)||'[]'); list.push({id:Date.now(),name,text,video}); localStorage.setItem(TEST_KEY, JSON.stringify(list)); renderTestimonials(); renderStats();
  });
  function renderTestimonials(){ const list = JSON.parse(localStorage.getItem(TEST_KEY)||'[]'); testimonialsList.innerHTML=''; if(!list.length){ testimonialsList.innerHTML='<p class="small">لا توجد توصيات</p>'; return } list.slice().reverse().forEach(t=>{ const d=document.createElement('div'); d.className='list-item'; d.innerHTML = `<div style="flex:1"><strong>${t.name||'عميل'}</strong><div class="small">${(t.text||'').slice(0,120)}</div></div>`; const del=document.createElement('button'); del.className='btn secondary'; del.textContent='حذف'; del.addEventListener('click', ()=>{ deleteTestimonial(t.id); }); const edit=document.createElement('button'); edit.className='btn'; edit.textContent='تعديل'; edit.addEventListener('click', ()=>{ editTestimonial(t.id); }); d.appendChild(edit); d.appendChild(del); testimonialsList.appendChild(d); }); }
  function deleteTestimonial(id){ let list = JSON.parse(localStorage.getItem(TEST_KEY)||'[]'); list = list.filter(x=>x.id!==id); localStorage.setItem(TEST_KEY, JSON.stringify(list)); renderTestimonials(); renderStats(); }
  function editTestimonial(id){ const list = JSON.parse(localStorage.getItem(TEST_KEY)||'[]'); const t = list.find(x=>x.id===id); if(!t) return; t.name = prompt('اسم العميل', t.name)||''; t.text = prompt('نص التوصية', t.text)||''; t.video = prompt('رابط الفيديو', t.video)||''; localStorage.setItem(TEST_KEY, JSON.stringify(list)); renderTestimonials(); }

  // Articles list (uses blog-script helpers)
  addArticle.addEventListener('click', ()=>{ const title = prompt('عنوان المقال'); if(!title) return; const excerpt = prompt('مقتطف العرض')||''; const categories = (prompt('الفئات (مفصولة بفاصلة)')||'').split(',').map(s=>s.trim()).filter(Boolean); const tags = (prompt('الوسوم (مفصولة بفاصلة)')||'').split(',').map(s=>s.trim()).filter(Boolean); const content = prompt('المحتوى (HTML مبسط)')||''; const article = {title, excerpt, categories, tags, content, featured:false}; window._sara_blog.addArticle(article); renderArticles(); renderStats(); });
  function renderArticles(){ const list = window._sara_blog.getArticles(); articlesList.innerHTML=''; if(!list.length){ articlesList.innerHTML='<p class="small">لا توجد مقالات</p>'; return } list.slice().reverse().forEach(a=>{ const d=document.createElement('div'); d.className='list-item'; d.innerHTML = `<div style="flex:1"><strong>${a.title}</strong><div class="small">${(a.categories||[]).join(', ')} • ${a.date?new Date(a.date).toLocaleDateString():''}</div></div>`; const del=document.createElement('button'); del.className='btn secondary'; del.textContent='حذف'; del.addEventListener('click', ()=>{ if(!confirm('حذف المقال؟')) return; window._sara_blog.deleteArticle(a.id); renderArticles(); renderStats(); }); const edit=document.createElement('button'); edit.className='btn'; edit.textContent='تعديل'; edit.addEventListener('click', ()=>{ const title = prompt('عنوان المقال', a.title)||''; if(!title) return; a.title=title; a.excerpt = prompt('مقتطف العرض', a.excerpt||'')||''; a.categories = (prompt('الفئات', (a.categories||[]).join(','))||'').split(',').map(s=>s.trim()).filter(Boolean); a.tags = (prompt('الوسوم',(a.tags||[]).join(','))||'').split(',').map(s=>s.trim()).filter(Boolean); a.content = prompt('المحتوى (HTML)', a.content||'')||''; window._sara_blog.updateArticle(a); renderArticles(); }); d.appendChild(edit); d.appendChild(del); articlesList.appendChild(d); }); }

  // FAQ
  addFAQ.addEventListener('click', ()=>{ const q = prompt('السؤال'); if(!q) return; const a = prompt('الإجابة')||''; const list = JSON.parse(localStorage.getItem(FAQ_KEY)||'[]'); list.push({id:Date.now(),q,a}); localStorage.setItem(FAQ_KEY, JSON.stringify(list)); renderFAQ(); renderStats(); });
  function renderFAQ(){ const list = JSON.parse(localStorage.getItem(FAQ_KEY)||'[]'); faqList.innerHTML=''; if(!list.length){ faqList.innerHTML='<p class="small">لا توجد أسئلة</p>'; return } list.slice().reverse().forEach(f=>{ const d=document.createElement('div'); d.className='list-item'; d.innerHTML=`<div style="flex:1"><strong>${f.q}</strong><div class="small">${(f.a||'').slice(0,120)}</div></div>`; const del=document.createElement('button'); del.className='btn secondary'; del.textContent='حذف'; del.addEventListener('click', ()=>{ let l = JSON.parse(localStorage.getItem(FAQ_KEY)||'[]'); l = l.filter(x=>x.id!==f.id); localStorage.setItem(FAQ_KEY, JSON.stringify(l)); renderFAQ(); renderStats(); }); const edit=document.createElement('button'); edit.className='btn'; edit.textContent='تعديل'; edit.addEventListener('click', ()=>{ f.q = prompt('السؤال', f.q)||''; f.a = prompt('الإجابة', f.a)||''; const l = JSON.parse(localStorage.getItem(FAQ_KEY)||'[]'); const idx = l.findIndex(x=>x.id===f.id); if(idx>-1){ l[idx]=f; localStorage.setItem(FAQ_KEY, JSON.stringify(l)); renderFAQ(); } }); d.appendChild(edit); d.appendChild(del); faqList.appendChild(d); }); }

  // Dashboard data
  function renderStats(){ const images = JSON.parse(localStorage.getItem(IMG_KEY)||'[]'); const projects = JSON.parse(localStorage.getItem(PROJ_KEY)||'[]'); const tests = JSON.parse(localStorage.getItem(TEST_KEY)||'[]'); const articles = window._sara_blog.getArticles(); const bookings = JSON.parse(localStorage.getItem('sara_bookings')||'[]'); const subs = JSON.parse(localStorage.getItem('sara_subscribers')||'[]'); statsDiv.innerHTML = `المقالات: ${articles.length} • الصور: ${images.length} • المشاريع: ${projects.length} • التوصيات: ${tests.length} • الحجوزات: ${bookings.length} • المشتركين: ${subs.length}`; document.getElementById('bookings').innerHTML = `<p class="small">${bookings.length} حجز وارد</p>`; }

  // homepage content
  function loadHomeSettings(){ const hp = JSON.parse(localStorage.getItem('sara_home')||'{}'); heroTitle.value = hp.title || document.querySelector('.hero-title')?.textContent || ''; heroLead.value = hp.lead || document.querySelector('.hero-lead')?.textContent || ''; heroCta.value = hp.cta || 'احجز جلستك الآن'; }

  // branding apply
  function applyBranding(settings){
    document.documentElement.style.setProperty('--purple', settings.colorPrimary || '#7C3AED');
    document.documentElement.style.setProperty('--gold', settings.colorGold || '#D4A574');
    // load font
    if(settings.font){
      const href = `https://fonts.googleapis.com/css2?family=${settings.font}:wght@400;600;700&display=swap`;
      if(!document.getElementById('gfont')){
        const l = document.createElement('link'); l.id='gfont'; l.rel='stylesheet'; l.href=href; document.head.appendChild(l);
      } else { document.getElementById('gfont').href = href }
      // apply CSS var
      const fontName = settings.font.replace('+',' ');
      document.documentElement.style.setProperty('--site-font', `'${fontName}', system-ui, sans-serif`);
    }
  }

  // image success stories render on homepage
  function renderSuccessStories(){ window._sara_gallery && window._sara_gallery.reload && window._sara_gallery.reload(); }

  // initial load
  function loadDashboard(){
    const settings = JSON.parse(localStorage.getItem('sara_settings')||'{}'); waInput.value = settings.whatsapp || '';
    fontSelect.value = settings.font || '';
    colorPrimary.value = settings.colorPrimary || '#7C3AED'; colorGold.value = settings.colorGold || '#D4A574';
    applyBranding(settings);
    renderImages(); renderProjects(); renderTestimonials(); renderArticles(); renderFAQ(); loadHomeSettings(); renderStats();
  }

  // render helpers called on load
  function renderProjects(){ const list = JSON.parse(localStorage.getItem(PROJ_KEY)||'[]'); projectsList.innerHTML=''; if(!list.length){ projectsList.innerHTML='<p class="small">لا توجد مشاريع</p>'; return } list.slice().reverse().forEach(p=>{ const d=document.createElement('div'); d.className='list-item'; d.innerHTML=`<div style="flex:1"><strong>${p.title}</strong><div class="small">${(p.desc||'').slice(0,140)}</div></div>`; const del=document.createElement('button'); del.className='btn secondary'; del.textContent='حذف'; del.addEventListener('click', ()=>{ deleteProject(p.id); }); const edit=document.createElement('button'); edit.className='btn'; edit.textContent='تعديل'; edit.addEventListener('click', ()=>{ editProject(p.id); }); d.appendChild(edit); d.appendChild(del); projectsList.appendChild(d); }); }

  // load existing data if absent, seed useful keys for first run
  function seedDemo(){
    // seed images (small placeholder data-images) - create simple colored svg dataurls
    const img = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=600 height=400><rect width=100% height=100% fill=\'#A78BFA\'/><text x=50% y=50% font-size=28 text-anchor=middle fill=\'#fff\'>Demo Image</text></svg>')}`;
    localStorage.setItem(IMG_KEY, JSON.stringify([{id:1,data:img,title:'قبل وبعد: سارة',caption:'نتيجة مشروع 1',tags:['before-after']}]))
    localStorage.setItem(PROJ_KEY, JSON.stringify([{id:1,title:'برنامج التحول 8 أسابيع',desc:'برنامج مكثف لتغيير العادات والأنماط',imageId:1}]));
    localStorage.setItem(TEST_KEY, JSON.stringify([{id:1,name:'ع.م',text:'ساعدتني سارة على تغيير حياتي بشكل جذري',video:''}]));
    // ensure articles seeded in blog-script
    window._sara_blog && window._sara_blog.getArticles && window._sara_blog.getArticles();
    renderImages(); renderProjects(); renderTestimonials(); renderArticles(); renderFAQ(); renderStats();
  }

  // utility: render success stories on homepage via stored images
  function renderSuccessStories(){ const out = document.getElementById('successList'); if(!out) return; const images = JSON.parse(localStorage.getItem(IMG_KEY)||'[]'); const stories = images.filter(i=>i.tags && i.tags.includes('before-after')); if(!stories.length){ out.innerHTML = '<p class="small">لا توجد قصص نجاح</p>'; return } out.innerHTML = stories.map(s=>`<div class="card"><img src="${s.data}" alt="${s.title}" style="width:100%;border-radius:8px"><div style="margin-top:8px"><strong>${s.title||''}</strong><p class="small">${s.caption||''}</p></div></div>`).join(''); }

  // expose small API for other scripts
  window._sara_admin = {renderImages, renderProjects, renderTestimonials, renderArticles, renderFAQ, renderStats};

  // on load, try to auto-show dashboard if password saved (not secure) - disabled for safety
})();
