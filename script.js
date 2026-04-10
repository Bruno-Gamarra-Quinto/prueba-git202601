document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const message = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');
  const pwToggle = document.getElementById('pwToggle');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  function setError(el, text){ el.textContent = text || ''; }

  function validateEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function passwordScore(pw){
    let score = 0;
    if(pw.length >= 6) score++;
    if(pw.length >= 10) score++;
    if(/[0-9]/.test(pw)) score++;
    if(/[A-Z]/.test(pw)) score++;
    if(/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score,5);
  }

  function updateStrength(pw){
    const score = passwordScore(pw);
    const width = (score / 5) * 100;
    const barInner = strengthBar.querySelector('div');
    barInner.style.width = width + '%';
    let text = '';
    if(score <= 1) text = 'Muy débil';
    else if(score === 2) text = 'Débil';
    else if(score === 3) text = 'Aceptable';
    else if(score === 4) text = 'Buena';
    else text = 'Fuerte';
    strengthText.textContent = text;
  }

  // Live validation
  email.addEventListener('input', () => {
    setError(emailError, '');
    if(email.value && !validateEmail(email.value)) setError(emailError, 'Correo inválido.');
  });

  password.addEventListener('input', () => {
    setError(passwordError, '');
    updateStrength(password.value);
  });

  pwToggle.addEventListener('click', () => {
    const t = password.type === 'password' ? 'text' : 'password';
    password.type = t;
    pwToggle.textContent = t === 'text' ? '🙈' : '👁️';
    pwToggle.setAttribute('aria-label', t === 'text' ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });

  function formValid(){
    const em = email.value.trim();
    const pw = password.value;
    return em && validateEmail(em) && pw && pw.length >= 6;
  }

  // Enable/disable submit based on validity
  setInterval(() => { submitBtn.disabled = !formValid(); }, 300);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setError(emailError,''); setError(passwordError,''); message.textContent = '';

    const em = email.value.trim();
    const pw = password.value;
    let ok = true;

    if(!em){ setError(emailError,'El correo es obligatorio.'); ok = false; }
    else if(!validateEmail(em)){ setError(emailError,'Ingrese un correo válido.'); ok = false; }

    if(!pw){ setError(passwordError,'La contraseña es obligatoria.'); ok = false; }
    else if(pw.length < 6){ setError(passwordError,'Mínimo 6 caracteres.'); ok = false; }

    if(!ok) return;

    submitBtn.disabled = true; const prevText = submitBtn.textContent; submitBtn.textContent = 'Entrando...';

    // Simular llamada al servidor
    setTimeout(() => {
      if(em === 'demo@example.com' && pw === 'demo123'){
        message.textContent = 'Inicio de sesión exitoso. Redirigiendo...'; message.style.color = 'var(--success)';
      } else {
        message.textContent = 'Credenciales incorrectas.'; message.style.color = 'var(--error)';
      }
      submitBtn.disabled = false; submitBtn.textContent = prevText;
    }, 900);
  });
});
