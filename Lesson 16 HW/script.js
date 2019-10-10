'use strict';

const galleryItemTemplate = document.getElementById('galleryItemTemplate').innerHTML;
const imgtest = document.getElementById('imgtest').innerHTML;

const galleryContainer = document.getElementById('gallery');
const fullImage = document.getElementById('fullImage');
const fullview = document.getElementById('fullView');

const galleryUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=50'

galleryContainer.addEventListener('click', galleryContainerEvent);


fetch(galleryUrl)
    .then(response => response.json())
    .then(json => {
        galleryContainer.innerHTML += json.map(generateGalleryItem).join('');
    })
    .catch(error => {
        console.error('Error loading');
        galleryContainer.innerHTML = '<h1>Error Loading</h1>';
    });


function generateGalleryItem(el) {
    return galleryItemTemplate.replace('{{photoTitleText}}', el.title)
                                .replace('{{thumbnailUrl}}', el.thumbnailUrl)
                                .replace('{{url}}', el.url);    

}

function galleryContainerEvent(e){
    // console.log(e.target);
    if (e.target.classList.contains('galleryImage') ){
        console.log(e.target.parenElement.href);
        document.getElementById('fullView').innerHTML = imgtest.replace('{{imageUrl}}', );
        e.stopPropagation();
    }
    e.stopPropagation();
    
    

}