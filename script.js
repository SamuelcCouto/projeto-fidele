/* ---------- Campo de fundo com IMAGEM FDL + dinâmica de JS ---------- */
const bgField = document.getElementById('bgField');

function buildField(){
  bgField.innerHTML = '';
  
  setTimeout(() => {
    const w = document.body.scrollWidth;
    const h = document.body.scrollHeight;
    
    const area = w * h;
    
    // 1. AUMENTAMOS A DENSIDADE: O divisor caiu para 8000 e o mínimo subiu para 150.
    // Isso garante que a tela fique mais preenchida, forçando várias logos no centro.
    const count = Math.min(600, Math.max(150, Math.round(area / 8000)));
    
    for(let i=0; i<count; i++){
      const el = document.createElement('img');
      el.src = 'fdl-logo.png'; 
      el.alt = '';
      
      const size = 50 + Math.random() * 90; 
      const rot = (Math.random()*50 - 25).toFixed(1);
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      // 2. AUMENTAMOS A OPACIDADE: Agora eles vão de 15% até 40% de visibilidade.
      // Forte o suficiente para aparecer na foto, mas transparente o suficiente para não ofuscar.
      const op = (0.15 + Math.random() * 0.25).toFixed(2);
      
      const dur = (6 + Math.random() * 10).toFixed(1);
      const delay = (Math.random() * 6).toFixed(1);
      
      el.style.setProperty('--rot', rot+'deg');
      el.style.top = top+'%';
      el.style.left = left+'%';
      el.style.width = size+'px';
      el.style.opacity = op;
      el.style.transform = `rotate(${rot}deg)`;
      el.style.animationDuration = dur+'s';
      el.style.animationDelay = delay+'s';
      
      bgField.appendChild(el);
    }
  }, 100);
}

buildField();

let resizeT;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeT);
  resizeT = setTimeout(buildField, 300);
});

window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5) * 24;
  const y = (e.clientY / window.innerHeight - 0.5) * 24;
  bgField.style.transform = `translate(${x}px, ${y}px)`;
});

/* ---------- interações de exemplo ---------- */
function toggleCart(){
  alert('Aqui abriria o drawer do carrinho, com o campo de CEP e o resumo do pedido antes do checkout transparente.');
}

function calcFrete(){
  const v = document.getElementById('cep-input').value.trim();
  const out = document.getElementById('cep-result');
  
  if(v.replace(/\D/g,'').length < 8){ 
    out.textContent = 'Digite um CEP válido.'; 
    return; 
  }
  
  out.textContent = 'Exemplo de retorno da API (Melhor Envio/Correios): 3 a 6 dias úteis · R$ 18,90';
}