export const turnOn = () => {
  sendSignalA();
  sendSignalB();
  console.log('TV is on');
}

const sendSignalA = (a, b) => {};
const sendSignalB = () => {};

// import { sendSignalA } from './coupling/module';

// sendSignalA(1, 2);

import { turnOn } from './coupling/module';

turnOn();

// Basically don't export internals