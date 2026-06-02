// Fetch jokes from JokeAPI (https://v2.jokeapi.dev)
// Handles both single and twopart jokes, filters out NSFW/etc.

const jokeBox = document.getElementById('joke');
const newBtn = document.getElementById('newJoke');
const copyBtn = document.getElementById('copyJoke');
const shareBtn = document.getElementById('shareWhats');

async function fetchJoke(){
  jokeBox.textContent = 'جارٍ جلب المزحة...';
  try{
    const res = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&lang=ar');
    // JokeAPI supports lang=ar but may fall back; handle English too
    const data = await res.json();
    let text = '';
    if(data.type === 'single'){
      text = data.joke;
    } else if(data.type === 'twopart'){
      text = data.setup + '\n\n' + data.delivery;
    } else {
      // fallback to Official Joke API
      const f = await fetch('https://official-joke-api.appspot.com/random_joke');
      const d = await f.json();
      text = d.setup + '\n\n' + d.punchline;
    }
    jokeBox.textContent = text;
    updateShare(text);
  }catch(err){
    console.error(err);
    jokeBox.textContent = 'حدث خطأ أثناء جلب المزحة. حاول مرة أخرى.';
    updateShare('');
  }
}

function updateShare(text){
  const encoded = encodeURIComponent(text);
  shareBtn.href = text ? `https://wa.me/?text=${encoded}` : '#';
}

newBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', async ()=>{
  const text = jokeBox.textContent;
  if(!text) return;
  try{ await navigator.clipboard.writeText(text); alert('تم نسخ المزحة'); }
  catch(e){ alert('فشل نسخ المزحة'); }
});

// load initial joke
fetchJoke();
