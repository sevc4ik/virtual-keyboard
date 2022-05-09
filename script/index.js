import {
  keyboard, keyboardObjEng,
} from './data.js';

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
