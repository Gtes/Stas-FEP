class Gallery {
    constructor(gallery) {
        this.gallery = gallery;
        this.getListItems = gallery.querySelectorAll('li');
        this.currentSlide = 0;

        this.slider = () => {
            this.getListItems[this.currentSlide].classList.add('li-hidden');
            this.currentSlide = (this.currentSlide + 1) % this.getListItems.length;
            this.getListItems[this.currentSlide].classList.remove('li-hidden');
            setTimeout(this.slider, 3000);
        }

        this.next = () => {
            if (this.currentSlide == this.getListItems.length-1) {
                this.getListItems[this.currentSlide].classList.add('li-hidden');
                this.currentSlide = 0;
                this.getListItems[this.currentSlide].classList.remove('li-hidden');
            } else {
                this.getListItems[this.currentSlide].classList.add('li-hidden');
                this.currentSlide = (this.currentSlide + 1);
                this.getListItems[this.currentSlide].classList.remove('li-hidden');
            }

        }

        this.prev = () => {
            if (this.currentSlide == 0) {
                this.getListItems[this.currentSlide].classList.add('li-hidden');
                this.currentSlide = this.getListItems.length - 1;
                this.getListItems[this.currentSlide].classList.remove('li-hidden');
            } else {
                this.getListItems[this.currentSlide].classList.add('li-hidden');
                this.currentSlide = (this.currentSlide - 1);
                this.getListItems[this.currentSlide].classList.remove('li-hidden');
            }


        }

    }

    hidePhotos() {
        this.getListItems.forEach(element => {
            element.classList.add('li-hidden');
        });
    }

    displayFirstSilde() {
        this.getListItems[this.currentSlide].classList.remove('li-hidden');
    }

    runSlideshow() {
        setTimeout(this.slider, 3000);
    }

    createGalleryWrapper() {
        let myGalleryContainer = document.querySelector('#container');
        let galleryWrapper = document.createElement('div')
        document.body.appendChild(galleryWrapper);
        galleryWrapper.appendChild(myGalleryContainer);
    }



    initGallery() {
        this.createGalleryWrapper();
        this.hidePhotos();
        this.displayFirstSilde();
        this.runSlideshow();
    }
}

const myGallery = new Gallery(
    document.getElementById('container')
);


const nextButton = document.getElementById('nextSlide');
const prevButton = document.getElementById('prevSlide');

nextButton.addEventListener('click', myGallery.next);

prevButton.addEventListener('click', myGallery.prev);

myGallery.initGallery();








/* Опциональное задание - реализовать такие методы */

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();