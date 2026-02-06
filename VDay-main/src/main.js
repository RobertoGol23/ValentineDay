import './style.css'

const letter = document.getElementById('myLetter');
const container = document.getElementById('mailboxContainer');
const mailboxImage = document.getElementById('mailboxImage');
const sideText = document.getElementById('sideText');

let heartInterval;

// --- GESTIONE CLICK ---
letter.addEventListener('click', (event) => {
  event.preventDefault(); 
  
  clearInterval(heartInterval);
  document.querySelectorAll('.heart-particle').forEach(el => el.remove());

  setInterval(createLetterParticle, 35);

  sideText.classList.add('transparent');
  mailboxImage.classList.add('transparent');
  container.classList.add('zoomed-center');
});


// --- FUNZIONE: ESPLOSIONE LETTERE ---
function createLetterParticle() 
{
  const particle = document.createElement('div');
  particle.classList.add('mini-letter-particle');
  
  const tx = (Math.random() - 0.5) * 400; 
  const ty = (Math.random() - 0.5) * 400 - 100; 
  const r = (Math.random() - 0.5) * 360;
  
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--ty', `${ty}px`);
  particle.style.setProperty('--r', `${r}deg`);
  
  const duration = 2 + Math.random() * 2;
  particle.style.animation = `flyParticles ${duration}s ease-out forwards`;
  
  container.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}


// --- FUNZIONE: PIOGGIA DI CUORI ---
function createHeartRain() {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');
  
  heart.style.left = Math.random() * 100 + 'vw';
  
  const duration = 3 + Math.random() * 4; 
  const delay = Math.random() * 2; 
  
  heart.style.animation = `fallRain ${duration}s linear ${delay}s forwards`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

heartInterval = setInterval(createHeartRain, 50);

const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');

btnYes.addEventListener('click', (e) => {
  e.stopPropagation(); 
  alert("Basta che non mi fai diventare più ciccio ❤️ Ti amo"); 
  
  setInterval(createHeartRain, 100);
});

btnNo.addEventListener('mouseover', moveButton); 
btnNo.addEventListener('click', moveButton);

function moveButton(e) {
  e.preventDefault();
  e.stopPropagation();

  const finalContent = document.querySelector('.final-content');

  if (btnNo.parentElement !== finalContent) {
    btnNo.style.position = 'absolute'; 
    btnNo.style.zIndex = '1000';     
    finalContent.appendChild(btnNo);   
  }

  const containerWidth = finalContent.offsetWidth; 
  const containerHeight = finalContent.offsetHeight;

  const btnWidth = btnNo.offsetWidth;
  const btnHeight = btnNo.offsetHeight;

  const maxLeft = containerWidth - btnWidth - 20; 
  const maxTop = containerHeight - btnHeight - 20; 

  const newLeft = Math.max(10, Math.random() * maxLeft);
  const newTop = Math.max(10, Math.random() * maxTop);
  
  btnNo.style.left = `${newLeft}px`;
  btnNo.style.top = `${newTop}px`;
}
