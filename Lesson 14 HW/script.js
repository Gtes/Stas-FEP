const TABSET_CONTAINER_CLASS = 'my-tabset-container';
const TABSET_TITLE_CLASS = 'tabset-heading';
const TABSET_ACTIVE_CLASS = 'active'

class Tabset {
    constructor(el) {
        this.el = el;
        this.bindClasses();
        this.bindEventListeners();
    }

    bindClasses() {
        this.el.classList.add(TABSET_CONTAINER_CLASS);
        this.el.children[0].classList.add(TABSET_ACTIVE_CLASS);
    }

    bindEventListeners() {
        this.el.addEventListener('click', this.onElementClick);
    }

    static isElementToggled(el) {
        return el.classList.contains(TABSET_ACTIVE_CLASS);
    }

    static showElement(el) {
        return el.classList.add(TABSET_ACTIVE_CLASS);
    }

    static hideElement(el) {
        return el.classList.remove(TABSET_ACTIVE_CLASS);
    }

    onElementClick(e) {
        console.log('clicked', e.target);
        if (e.target.classList.contains(TABSET_TITLE_CLASS)) {
            const isVisible = Tabset.isElementToggled(e.target.parentElement)

            if (!isVisible) {
                for (let i = 0; i < this.children.length; i++) {
                    Tabset.hideElement(this.children[i]);
                }

                console.log(e.target.parentElement.classList);

                // if () {

                //     console.log('haha');
                //     var style = document.createElement('style');
                //     document.head.appendChild(style);
                //     style.sheet.insertRule('.my-tabset-container .active .tabset-body  {border-radius: 5px 0px 5px 5px;}');
                // }

                Tabset.showElement(e.target.parentElement)
            }




        }
    }

}

const acc = new Tabset(
    document.getElementById('container')
)