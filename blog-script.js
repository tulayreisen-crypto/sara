// blog-script.js
// Manages articles stored in localStorage under 'sara_articles'
// Provides: list, search, categories, featured, article rendering

(function(){
  const STORAGE_KEY = 'sara_articles';

  function getArticles(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
  }
  function saveArticles(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
  function seedIfEmpty(){
    const list = getArticles();
    if(list.length) return;
    const now = new Date().toISOString();
    const demo = [
      {id: 1, title: 'كيف يفهم الجسد مشاعرك؟', slug:'body-emotions', excerpt:'مقدمة عن العلاقة بين الجسد والمشاعر وكيف تظهر الاعراض الجسدية.', content:'<p>الجسد غالبًا ما يحمل رسائل صامتة...</p>', categories:['سايكوسوماتيك'], tags:['جسد','عاطفة'], featured:true, date:now},
      {id: 2, title: 'متى تحتاج جلسة كوتشنج؟', slug:'when-coaching', excerpt:'علامات تدل أن الوقت مناسب للبدء في رحلة الكوتشنج.', content:'<p>إذا كنت تشعر بأنك عالق...</p>', categories:['كوتشنج'], tags:['تطوير الذات'], featured:false, date:now},
    ];
    saveArticles(demo);
  }

  // Rendering helpers
  function el(tag, props={}, html=''){const e=document.createElement(tag);Object.assign(e,props);if(html)e.innerHTML=html;return e}

  function renderFeatured(){
    const container = document.getElementById('featuredList');
    if(!container) return;
    const list = getArticles().filter(a=>a.featured).slice(0,3);
    if(!list.length){container.innerHTML='<p>لا توجد مقالات مميزة حتى الآن.</p>';return}
    container.innerHTML='';
    list.forEach(a=>{
      const card = el('a',{href:`article.html?id=${a.id}`,className:'card'},`<h4>${a.title}</h4><p>${a.excerpt||''}</p><div style="margin-top:8px;color:var(--muted)">${a.date?new Date(a.date).toLocaleDateString():''}</div>`);
      container.appendChild(card);
    });
  }

  function renderPostsList(filter={q:'',category:''}){
    const posts = document.getElementById('posts');
    if(!posts) return;
    let list = getArticles().slice().reverse(); // newest first
    if(filter.category) list = list.filter(a=>a.categories && a.categories.includes(filter.category));
    if(filter.q) list = list.filter(a=>(a.title+a.excerpt+(a.tags||[]).join(' ')).toLowerCase().includes(filter.q.toLowerCase()));
    if(!list.length){posts.innerHTML='<p>لا توجد مقالات مطابقة.</p>';return}
    posts.innerHTML='';
    list.forEach(a=>{
      const node = el('a',{href:`article.html?id=${a.id}`,className:'card'},`<h4>${a.title}</h4><p>${a.excerpt||''}</p><div style="margin-top:8px;color:var(--muted);font-size:13px">${a.categories? a.categories.join(' • ') : ''} • ${a.date?new Date(a.date).toLocaleDateString():''}</div>`);
      posts.appendChild(node);
    });
  }

  function populateCategoryFilter(){
    const sel = document.getElementById('categoryFilter');
    if(!sel) return;
    const list = getArticles();
    const cats = Array.from(new Set((list.flatMap(a=>a.categories||[]))));
    sel.innerHTML = '<option value="">كل الفئات</option>' + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
  }

  function renderArticlePage(){
    const container = document.getElementById('article');
    if(!container) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if(!id){container.innerHTML='<p>المقال غير موجود.</p>';return}
    const a = getArticles().find(x=>String(x.id)===String(id));
    if(!a){container.innerHTML='<p>المقال غير موجود.</p>';return}
    container.innerHTML = `<h1>${a.title}</h1><div style="color:var(--muted);margin-bottom:12px">${a.categories? a.categories.join(' • ') : ''} • ${a.date? new Date(a.date).toLocaleDateString():''}</div><div>${a.content||''}</div>`;
    document.title = a.title + ' — سارة الناصر';
  }

  // Expose admin helpers for articles management
  window._sara_blog = {
    getArticles, saveArticles,
    addArticle(article){
      const list = getArticles();
      article.id = Date.now();
      article.date = new Date().toISOString();
      list.push(article); saveArticles(list);
    },
    updateArticle(updated){
      let list = getArticles();
      list = list.map(a=>a.id===updated.id?updated:a); saveArticles(list);
    },
    deleteArticle(id){
      let list = getArticles(); list = list.filter(a=>String(a.id)!==String(id)); saveArticles(list);
    }
  }

  // Initialization depending on page
  seedIfEmpty();
  renderFeatured();
  renderArticlePage();
  populateCategoryFilter();

  // If on blog list page, wire search
  const searchBtn = document.getElementById('searchBtn');
  if(searchBtn){
    const q = document.getElementById('q');
    const cat = document.getElementById('categoryFilter');
    searchBtn.addEventListener('click', ()=>{
      renderPostsList({q: q.value || '', category: cat.value || ''});
    });
    // initial render
    renderPostsList({q:'',category:''});
  }
})();
