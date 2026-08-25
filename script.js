const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');

let calculation = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'C') {
      calculation = '';
      display.value = '';
      return;
    }

    if (value === '=') {
      try {
        const result = Function(`"use strict"; return (${calculation})`)();
        display.value = Number.isFinite(result) ? result : 'Error';
        calculation = String(result);
      } catch {
        display.value = 'Error';
        calculation = '';
      }
      return;
    }

    calculation += value;
    display.value = calculation;
  });
});

const directAgeForm = document.getElementById('directAgeForm');
const ageInput = document.getElementById('ageInput');
const ageResult = document.getElementById('ageResult');

directAgeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const age = Number(ageInput.value);

  if (age >= 18) {
    ageResult.textContent = 'You are eligible. Access granted.';
    ageResult.style.color = '#22c55e';
  } else {
    ageResult.textContent = 'You are under 18. Access denied.';
    ageResult.style.color = '#ef4444';
  }
});

const dobForm = document.getElementById('dobForm');
const dobInput = document.getElementById('dobInput');
const dobResult = document.getElementById('dobResult');

dobForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const dob = new Date(dobInput.value);
  const today = new Date();

  if (Number.isNaN(dob.getTime())) {
    dobResult.textContent = 'Please select a valid date.';
    dobResult.style.color = '#ef4444';
    return;
  }

  let age = today.getFullYear() - dob.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasBirthdayPassed) age -= 1;

  if (age >= 18) {
    dobResult.textContent = `Eligible: You are ${age} years old.`;
    dobResult.style.color = '#22c55e';
  } else {
    dobResult.textContent = `Not eligible: You are ${age} years old.`;
    dobResult.style.color = '#ef4444';
  }
});

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const registerModal = document.getElementById('registerModal');
const openRegister = document.getElementById('openRegister');
const closeRegister = document.getElementById('closeRegister');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Login successful!');
  loginForm.reset();
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Registration successful!');
  registerForm.reset();
  registerModal.classList.add('hidden');
});

openRegister.addEventListener('click', () => {
  registerModal.classList.remove('hidden');
});

closeRegister.addEventListener('click', () => {
  registerModal.classList.add('hidden');
});

registerModal.addEventListener('click', (event) => {
  if (event.target === registerModal) {
    registerModal.classList.add('hidden');
  }
});