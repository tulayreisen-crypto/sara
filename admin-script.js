(function(){
  const loginBox = document.getElementById('loginBox');
  const dashboard = document.getElementById('dashboard');
  const loginBtn = document.getElementById('loginBtn');
  const logout = document.getElementById('logout');
  const passInput = document.getElementById('pass');
  const waInput = document.getElementById('waNumber');
  const saveBtn = document.getElementById('saveSettings');
  const bookingsDiv = document.getElementById('bookings');
  const servicesList = document.getElementById('servicesList');
  const addService = document.getElementById('addService');
  const articlesList = document.getElementById('articlesList');
  const addArticleBtn = document.getElementById('addArticle');

  const PASSWORD = '1234';

  loginBtn.addEventListener('click', ()=>{
    if(passInput.value === PASSWORD){
      loginBox.style.display='none'; dashboard.style.display='block';
      loadDashboard();
    } else {alert('كلمة مرور خاطئة')}
  });
  logout.addEventListener('click', ()=>{dashboard.style.display='none';loginBox.style.display='block'});

  function loadDashboard(){
    const settings = JSON.parse(localStorage.getItem('sara_settings')||'{}');
    waInput.value = settings.whatsapp || '';
    renderBookings();
    renderServices();
    renderArticles();
  }

  saveBtn.addEventListener('click', ()=>{
    const settings = JSON.parse(localStorage.getItem('sara_settings')||'{}');
    settings.whatsapp = waInput.value.trim();
    localStorage.setItem('sara_settings', JSON.stringify(settings));
    alert('تم حفظ الإعدادات');
  });

  function renderBookings(){
    const list = JSON.parse(localStorage.getItem('sara_bookings')||'[]');
    if(!list.length){bookingsDiv.innerHTML='<p>لا توجد حجوزات</p>';return}
    let html = '<table><tr><th>الاسم</th><th>الهاتف</th><th>الخدمة</th><th>التاريخ</th><th>الوقت</th><th>اجراء</th></tr>';
    list.forEach(b=>{
      html += `<tr><td>${b.name}</td><td>${b.phone}</td><td>${b.service}</td><td>${b.date||''}</td><td>${b.time||''}</td><td><button data-id="${b.id}" class="del">حذف</button></td></tr>`;
    });
    html += '</table>';
    bookingsDiv.innerHTML = html;
    document.querySelectorAll('.del').forEach(btn=>btn.addEventListener('click', function(){
      const id = this.getAttribute('data-id');
      let list = JSON.parse(localStorage.getItem('sara_bookings')||'[]');
      list = list.filter(x=>String(x.id)!==String(id));
      localStorage.setItem('sara_bookings', JSON.stringify(list));
      renderBookings();
    }));
  }

  function renderServices(){
    const list = JSON.parse(localStorage.getItem('sara_services')||'[]');
    if(!list.length){servicesList.innerHTML='<p>لا توجد خدمات</p>'} else {
      servicesList.innerHTML = list.map((s,i)=>`<div style="padding:8px;background:#fff;margin-bottom:8px;border-radius:8px"><strong>${s.title}</strong><div>${s.desc||''}</div><div style="margin-top:8px">${s.price||''}</div></div>`).join('');
    }
  }

  addService.addEventListener('click', ()=>{
    const title = prompt('عنوان الخدمة');
    if(!title) return;
    const desc = prompt('وصف موجز')||'';
    const price = prompt('السعر')||'';
    const list = JSON.parse(localStorage.getItem('sara_services')||'[]');
    list.push({title,desc,price});
    localStorage.setItem('sara_services', JSON.stringify(list));
    renderServices();
  });

  // Articles management
  function renderArticles(){
    const list = window._sara_blog.getArticles();
    if(!list.length){articlesList.innerHTML='<p>لا توجد مقالات</p>';return}
    const rows = list.slice().reverse().map(a=>{
      return `<div style="padding:10px;background:#fff;margin-bottom:8px;border-radius:8px"><strong>${a.title}</strong> <div class="small">${a.categories? a.categories.join(', ') : ''} • ${a.date? new Date(a.date).toLocaleDateString():''}</div><div style="margin-top:8px"><button data-id="${a.id}" class="edit">تعديل</button> <button data-id="${a.id}" class="del-article">حذف</button> <button data-id="${a.id}" class="toggle-feature">${a.featured? 'إزالة من المميزة' : 'تمييز'}</button></div></div>`
    }).join('');
    articlesList.innerHTML = rows;
    // wire actions
    document.querySelectorAll('.del-article').forEach(btn=>btn.addEventListener('click', function(){
      const id = this.getAttribute('data-id');
      if(!confirm('هل تريد حذف هذا المقال؟')) return;
      window._sara_blog.deleteArticle(id);
      renderArticles();
    }));
    document.querySelectorAll('.edit').forEach(btn=>btn.addEventListener('click', function(){
      const id = this.getAttribute('data-id');
      const a = window._sara_blog.getArticles().find(x=>String(x.id)===String(id));
      if(!a) return; 
      const title = prompt('عنوان المقال', a.title); if(title===null) return;
      const excerpt = prompt('مقتطف العرض', a.excerpt||'')||'';
      const categories = prompt('الفئات (مفصولة بفاصلة)', (a.categories||[]).join(','))||'';
      const tags = prompt('الوسوم (مفصولة بفاصلة)', (a.tags||[]).join(','))||'';
      const content = prompt('المحتوى (HTML مبسط)', a.content||'')||'';
      a.title = title; a.excerpt = excerpt; a.categories = categories.split(',').map(s=>s.trim()).filter(Boolean); a.tags = tags.split(',').map(s=>s.trim()).filter(Boolean); a.content = content; 
      window._sara_blog.updateArticle(a);
      renderArticles();
    }));
    document.querySelectorAll('.toggle-feature').forEach(btn=>btn.addEventListener('click', function(){
      const id = this.getAttribute('data-id');
      const a = window._sara_blog.getArticles().find(x=>String(x.id)===String(id));
      if(!a) return; a.featured = !a.featured; window._sara_blog.updateArticle(a); renderArticles();
    }));
  }

  addArticleBtn.addEventListener('click', ()=>{
    const title = prompt('عنوان المقال'); if(!title) return;
    const excerpt = prompt('مقتطف العرض')||'';
    const categories = (prompt('الفئات (مفصولة بفاصلة)')||'').split(',').map(s=>s.trim()).filter(Boolean);
    const tags = (prompt('الوسوم (مفصولة بفاصلة)')||'').split(',').map(s=>s.trim()).filter(Boolean);
    const content = prompt('المحتوى (HTML مبسط)')||'';
    const article = {title, excerpt, categories, tags, content, featured:false};
    window._sara_blog.addArticle(article);
    renderArticles();
  });

})();
