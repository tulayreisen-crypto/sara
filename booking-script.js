document.getElementById('bookingForm').addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(e.target);
  const booking = {};
  fd.forEach((v,k)=>booking[k]=v);
  booking.id = Date.now();
  const list = JSON.parse(localStorage.getItem('sara_bookings')||'[]');
  list.push(booking);
  localStorage.setItem('sara_bookings', JSON.stringify(list));
  document.getElementById('success').style.display='block';
  e.target.reset();
});
