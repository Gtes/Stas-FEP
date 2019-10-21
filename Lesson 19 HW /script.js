'use strict';

const galleryItemTemplate = document.getElementById('galleryItemTemplate').innerHTML;
const paginationPageElement = document.getElementById('paginationPageElementTemplate').innerHTML;

const galleryPagination = document.querySelector('.gallery-pagination');
const galleryContainer = document.getElementById('gallery');
const galleryPhotosContainer = document.getElementById('gallery-photos-container');

const fetchGalleryUrl = fetch('https://jsonplaceholder.typicode.com/photos?_limit=500');

galleryContainer.addEventListener('click', galleryContainerEvent);
galleryPagination.addEventListener('click', paginationEvents);


const PER_PAGE_ITEMS = 50;
let fullGalleryPhotosData;

fetchGalleryUrl.then((response) => {
    response.json()
        .then(init)
});


function init(data) {
    fullGalleryPhotosData = JSON.stringify(data);
    fullGalleryPhotosData = JSON.parse(fullGalleryPhotosData);

    renderGallery(generateGalleryPageData(fullGalleryPhotosData, initialPage));
    renderPagination(fullGalleryPhotosData);
}

//pagination handling
let initialPage = function () {
    if (!localStorage.getItem('lastPage')) {
        
        return 1
    } else {
        return localStorage.getItem('lastPage');
    }
}();

function generatePaginationItem(el) {
    return paginationPageElement
        .replace('{{pageNumber}}', el)
        .replace('{{pageNumberText}}', el);
}


function renderPagination(data) {
    let galleryLength = data.length / PER_PAGE_ITEMS;

    for (let i = 0; i < galleryLength; i++) {
        galleryPagination.innerHTML += (generatePaginationItem(i + 1));
    }
}


function savePage(targetPage) {
    let lastPage = localStorage.setItem('lastPage', targetPage);
    return lastPage;
}


function addTargetActiveClass(el){
    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active')
        el.classList.add('active')
    } else {
        el.classList.add('active')
    }

}


function paginationEvents(e) {
    switch (true) {
        case e.target.classList.contains('gallery-pagination-page'):
            let pageNumber = e.target.dataset.pageNumber;
            savePage(pageNumber);

            addTargetActiveClass(e.target)

            let pageGalleryData = generateGalleryPageData(fullGalleryPhotosData, pageNumber);
            renderGallery(pageGalleryData);
            
            break;
    }
}


//gallery handling
function generateGalleryItem(el) {
    return galleryItemTemplate.replace('{{photoTitleText}}', el.title)
        .replace('{{thumbnailUrl}}', el.thumbnailUrl)
        .replace('{{url}}', el.url);
}


function generateGalleryPageData(data, target) {
    let galleryDataSlice = data.slice(target * PER_PAGE_ITEMS - PER_PAGE_ITEMS, target * PER_PAGE_ITEMS);
    return galleryDataSlice;
}


function renderGallery(data) {
    galleryPhotosContainer.innerHTML = data.map(generateGalleryItem).join('');
}


function galleryContainerEvent(e) {
    const fullViewBackground = document.querySelector('.fullViewBackground');
    const bigImage = document.querySelector('.bigImage');
    

    switch (true) {
        case e.target.classList.contains('galleryImage'):
            let hrefMy = e.target.parentElement.href;
            bigImage.src = hrefMy;
            bigImage.classList.add('activeBigImg');
            fullViewBackground.classList.add('activeBigImg');

            e.preventDefault();

            document.body.classList.add('overflow');

            break;

        case e.target.classList.contains('bigImage'):
        case e.target.classList.contains('fullViewBackground'):
            document.body.classList.remove('overflow');
            hideFullView();
            break;
    }

    function hideFullView() {
        fullViewBackground.classList.remove('activeBigImg');
        bigImage.classList.remove('activeBigImg');
    }

}