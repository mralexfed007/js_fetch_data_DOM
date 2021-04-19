'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
let phonesArr = [];
const resArr = [];
const body = document.querySelector('body');
const request = (url) => {
  return fetch(`${BASE_URL}${url}`);
};

const getPhones = () => {
  return new Promise((resolve, reject) => {
    request('/phones.json').then(response => {
      if (!response.ok) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Error - ${response.status}`);
      } else {
        resolve(response.json());
      }
    });
  });
};

function getPhonesDetails(idPhoneArr) {
  return new Promise((resolve, reject) => {
    idPhoneArr.forEach(id => {
      if (!phonesArr.find(phone => phone.id === id)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Once of searching id wasn`t find');
      } else {
        resArr.push(phonesArr.find(phone => phone.id === id));
      }
    });
    resolve(resArr);
  });
};

getPhones().then(res => {
  phonesArr = res;

  const getDetails = getPhonesDetails(
    ['motorola-xoom-with-wi-fi', 'samsung-gem', 'dell-venue']);

  return getDetails;
}).then(res => {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  table.insertAdjacentHTML('afterbegin', `
  <thead>
    <tr>
      <td>Age</td>
      <td>ID</td>
      <td>imageUrl</td>
      <td>Name</td>
      <td>Snippet</td>
    </tr>
  </thead>
  `);
  table.append(tbody);

  for (const phone of res) {
    tbody.insertAdjacentHTML('beforeend', `
    <tr>
      <td>${phone.age}</td>
      <td>${phone.id}</td>
      <td>${phone.imageUrl}</td>
      <td>${phone.name}</td>
      <td>${phone.snippet}</td>
    </tr>
    `);
  }
  body.append(table);
})
  .catch(error => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(error);
    }, 5000);
  });
