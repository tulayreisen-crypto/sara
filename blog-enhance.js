// augment blog-script: when rendering cards include featured image if present
(function(){
  // this file intentionally left minimal; main blog-script handles rendering
  // but ensure homepage featured rendering shows images if present
  function enhanceFeatured(){
    const container = document.getElementById('featuredList');
    if(!container) return;
    const nodes = container.querySelectorAll('a.card');
    nodes.forEach(node=>{
      // if already has image skip
      if(node.querySelector('img')) return;
      // find article id from href
      const href = node.getAttribute('href');
      const m = href && href.match(/id=(\d+)/);
      if(!m) return;
      const id = m[1];
      const list = JSON.parse(localStorage.getItem('sara_articles')||'[]');
      const a = list.find(x=>String(x.id)===String(id));
      if(a && a.featured_image){
        const img = document.createElement('img'); img.src = a.featured_image; img.alt = a.title; img.style.width='100%'; img.style.borderRadius='8px'; img.style.marginBottom='8px';
        node.insertBefore(img, node.firstChild);
      }
    });
  }
  setTimeout(enhanceFeatured,500);
  // also expose
  window._sara_blog_enhance = { enhanceFeatured };
})();
