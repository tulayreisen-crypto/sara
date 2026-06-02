// Simple script: store settings in localStorage for whatsapp number
(function(){
  const whatsapp = document.querySelector('.whatsapp');
  if(!whatsapp) return;
  const settings = JSON.parse(localStorage.getItem('sara_settings')||'{}');
  const number = settings.whatsapp || '0000000000';
  whatsapp.href = 'https://wa.me/'+number;
})();
