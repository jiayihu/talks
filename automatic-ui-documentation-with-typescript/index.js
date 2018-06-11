import React from 'react';
import { render } from 'react-dom';

import Presentation from './presentation/index.jsx';

render(<Presentation />, document.getElementById('root'));

function createWindowEvent(keyCode) {
  const evt = document.createEvent('Event');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  window.dispatchEvent(evt);
}

// function createDocEvent(which) {
//   const evt = document.createEvent('Event');
//   evt.initEvent('keydown', true, true);
//   evt.which = which;
//   document.dispatchEvent(evt);
// }

// let lastTime = Date.now();

// document.addEventListener('keydown', (event) => {
//   const arrows = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
//   if (arrows.indexOf(event.key) === -1) return;

//   const newTime = Date.now();
//   const elapsedTime = newTime - lastTime;

//   console.log('elapsedTime', elapsedTime / 1000, 'seconds');

//   event.preventDefault();
//   event.stopImmediatePropagation();
//   event.stopPropagation();

//   if (elapsedTime < 400) return;

//   lastTime = newTime;

//   if (event.key === 'ArrowDown') {
//     createWindowEvent(37); // Prev slide
//   } else if (event.key === 'ArrowUp') {
//     createWindowEvent(39); // Next slide
//   } else if (event.key === 'ArrowLeft') {
//     createDocEvent(38); // Next slide
//   } else if (event.key === 'ArrowRight') {
//     createDocEvent(40); // Next slide
//   }
// });
