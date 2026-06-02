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

})();
