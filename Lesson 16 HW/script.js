'use strict';

const galleryItemTemplate = document.getElementById('galleryItemTemplate').innerHTML;
const galleryContainer = document.getElementById('gallery');
const galleryUrl = 'https://jsonplaceholder.typicode.com/photos?_limit=50'

galleryContainer.addEventListener('click', galleryContainerEvent);


fetch(galleryUrl)
    .then(response => response.json())
    .then(json => {
        galleryContainer.innerHTML += json.map(generateGalleryItem).join('');//вынести из gallery сслыка на удаленный HTML через innerHTML
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

function galleryContainerEvent(e) {
    const fullViewBackground = document.querySelector('.fullViewBackground');
    const bigImage = document.querySelector('.bigImage');

    switch (true) {
        case e.target.classList.contains('galleryImage'):
            let hrefMy = e.target.parentElement.href;
            bigImage.src = hrefMy;
            bigImage.classList.add('active');
            fullViewBackground.classList.add('active');

            e.preventDefault();

            break;

        case e.target.classList.contains('bigImage'):
        case e.target.classList.contains('fullViewBackground'):
            hideFullView();
            break;
    }

    function hideFullView() {
        fullViewBackground.classList.remove('active');
        bigImage.classList.remove('active');
    }

}