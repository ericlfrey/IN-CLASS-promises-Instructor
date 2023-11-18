// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from './utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import {
  getRequest, postRequest, patchRequest, deleteRequest
} from '../api/promises';

const htmlStructure = () => {
  document.querySelector('#app').innerHTML = `
    <h1>TESTING PROMISES</h1>
    <h2>Open your dev tools</h2><br />
    <button class="btn btn-warning" id="get-joke">GET JOKE</button>
    <button class="btn btn-info" id="post-name">POST YOUR NAME</button>
    <button class="btn btn-success" id="patch-name">PATCH YOUR NAME</button>
    <button class="btn btn-danger" id="delete-name">DELETE YOUR NAME</button>
    <div id="jokeSetup"></div>
    <div id="jokeDelivery"></div>
  `;
};

const jokeCycle = () => {
  const jokeBtn = document.querySelector('#get-joke');
  const jokeSetup = document.querySelector('#jokeSetup');
  const jokeDelivery = document.querySelector('#jokeDelivery');
  getRequest().then((jokeData) => {
    jokeBtn.addEventListener('click', () => {
      if (jokeBtn.innerHTML === 'GET JOKE') {
        jokeSetup.innerHTML = jokeData.setup;
        jokeBtn.innerHTML = 'GET PUNCHLINE';
      } else if (jokeBtn.innerHTML === 'GET PUNCHLINE') {
        jokeDelivery.innerHTML = jokeData.delivery;
        jokeBtn.innerHTML = 'GET A NEW JOKE';
      } else if (jokeBtn.innerHTML.includes('NEW')) {
        jokeBtn.innerHTML = 'GET JOKE';
        jokeSetup.innerHTML = '';
        jokeDelivery.innerHTML = '';
      }
    });
  });
};

const events = () => {
  // document.querySelector('#get-joke').addEventListener('click', jokeCycle);
  jokeCycle();

  document.querySelector('#post-name').addEventListener('click', () => {
    // update this object with your name
    const payload = { name: 'YOUR NICKNAME' };
    postRequest(payload).then(console.warn);
  });
  document.querySelector('#patch-name').addEventListener('click', () => {
    // update this object with your name and firebaseKey that was logged in the console when you created your name in the database
    const payload = { name: 'YOUR FULL NAME', firebaseKey: '' };
    patchRequest(payload).then(console.warn);
  });
  document.querySelector('#delete-name').addEventListener('click', () => {
    const firebaseKey = '';
    deleteRequest(firebaseKey).then(console.warn);
  });
};

const startApp = () => {
  htmlStructure();
  events(); // ALWAYS LAST
};

startApp();
