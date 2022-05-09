import {
  keyboard, layoutKeys, notInputKeys, keyboardObjEng, keyboardObjRu,
} from './data.js';

let IsEng;
let IsCaps;
let IsShift;
// init
function init() {
  document.querySelector('body').innerHTML = `
    <div class="container">
    <h1 class="container__heading">Virtual Keyboard</h1>
      <textarea class="textarea" autofocus></textarea>
      <div class="keyboard">
        <div class="keyboard__row"></div>
        <div class="keyboard__row"></div>
        <div class="keyboard__row"></div>
        <div class="keyboard__row"></div>
        <div class="keyboard__row"></div>
      </div>
      <p class="container__description">Keyboard was created in Windows operating system. To switch language press Shift Left + Alt Left.</p>
    </div>`;

  const keyboardRow = document.querySelectorAll('.keyboard__row');

  for (let i = 0; i < keyboardRow.length; i += 1) {
    let keyWrapper = '';
    keyboard[i].forEach((key) => {
      const { caseDown } = keyboardObjEng[key];
      keyWrapper += `<div class="key ${key}" data="${key}"> ${caseDown}</div>`;
    });
    keyboardRow[i].innerHTML += keyWrapper;
  }
}

init();

const key = document.querySelectorAll('.key');
const keyboardNode = document.querySelector('.keyboard');

// animation

function clearActive(event) {
  event.target.classList.remove('active');
  event.target.removeEventListener('mouseleave', clearActive);
}

function animationHandler(event) {
  event.preventDefault();

  if (event.type === 'mouseup') {
    const keyPressed = event.target.closest('.key');

    if (keyPressed) keyPressed.classList.remove('active');
  }

  if (event.type === 'mousedown') {
    const keyPressed = event.target.closest('.key');

    if (keyPressed) {
      keyPressed.classList.add('active');
      keyPressed.addEventListener('mouseleave', clearActive);
    }
  }

  if (event.type === 'keydown') {
    key.forEach((el) => {
      if (el.classList.contains(event.code)) { el.classList.add('active'); }
    });
  }

  if (event.type === 'keyup') {
    key.forEach((el) => {
      if (el.classList.contains(event.code)) { el.classList.remove('active'); }
    });
  }
}

keyboardNode.addEventListener('mousedown', animationHandler);
keyboardNode.addEventListener('mouseup', animationHandler);
document.addEventListener('keydown', animationHandler);
document.addEventListener('keyup', animationHandler);

// Register and language

function changeLayout(keObj, caseKey) {
  key.forEach((el) => {
    const keyId = el.getAttribute('data');
    const keyCurrent = el;
    keyCurrent.innerHTML = keObj[keyId][caseKey];
  });
}

const pressedKeys = [];

function langHandler(event) {
  if (layoutKeys.includes(event.code)) {
    pressedKeys.push(event.code);
  }
  const switchLang = (pressedKeys.indexOf('AltLeft') !== -1 && pressedKeys.indexOf('ShiftLeft') !== -1);
  const nextLang = IsEng ? keyboardObjRu : keyboardObjEng;
  const textCase = IsCaps ? 'caseUp' : 'caseDown';

  if (switchLang) {
    changeLayout(nextLang, textCase);
    pressedKeys.length = 0;
    IsEng = !IsEng;
    localStorage.setItem('lang', IsEng);
  }
}

setTimeout(window.onload = function changeLang() {
  if (localStorage.lang === 'false') {
    changeLayout(keyboardObjRu, 'caseDown');
  }
}, 100);

document.addEventListener('keyup', langHandler);
