'use strict';

const usersURL = 'https://jsonplaceholder.typicode.com/users/'

const userList = document.querySelector('.user-list');
const userDetails = document.querySelector('.user-details');

const userListItemTemplate = document.getElementById('user-list-item-template').innerHTML;
const userDetailsTemplate = document.getElementById('user-details-template').innerHTML;


userList.addEventListener('click', userListEvent);


fetch(usersURL)
    .then(response => response.json())
    .then(json => {
        renderUserListItems(json);
    }).then(() => {
        let firstUserID = userList.firstElementChild.getAttribute('data-id');
        fetchUserDetails(firstUserID);
    })
    .catch(error => {
        console.error('Error loading');
    });


function renderUserListItems(list) {
    const usersHtml = list.map(elem => {
        return userListItemTemplate.replace('{{id}}', elem.id)
            .replace('{{name}}', elem.name)
            .replace('{{username}}', elem.username);
    })

    return userList.innerHTML = usersHtml.join('');
}

function renderUserDetails(el) {
    const userDetailsHtml = userDetailsTemplate.replace('{{id}}', el.id)
        .replace('{{email}}', el.email)
        .replace('{{street}}', el.address.street)
        .replace('{{suite}}', el.address.suite)
        .replace('{{city}}', el.address.city)
        .replace('{{zipcode}}', el.address.zipcode)
        .replace('{{phone}}', el.phone)
        .replace('{{website}}', el.website)
        .replace('{{name}}', el.company.name)
        .replace('{{catchPhrase}}', el.company.catchPhrase)
        .replace('{{bs}}', el.company.bs);

    return userDetails.innerHTML = userDetailsHtml;
}

function fetchUserDetails(userID) {
    fetch(usersURL + userID)
        .then(response => response.json())
        .then(json => {
            renderUserDetails(json);
        });
}

function userListEvent(e) {
    const targetUserID = e.target.getAttribute('data-id')

    switch (true) {
        case e.target.classList.contains('user-list-item'):
            fetchUserDetails(targetUserID);
            break;

    }
}