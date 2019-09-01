let ul = document.querySelector('#list');


addBtn.addEventListener('click', clearList);
addBtn.addEventListener('click', updateList);
addBtn.addEventListener('click', countListItems);


function clearList() {
    /* get li elements from the list UL */
    const listItems = ul.querySelectorAll('li')
    
    /* remove child li[i] element from li parrent node UL */
    for(let i = 0; i < listItems.length; i++){
        listItems[i].parentNode.removeChild(listItems[i]);
    }
    
}


function updateList() {
    const getcountValue = document.querySelector('#count').value;

    for (let i = 0; i < getcountValue; i++) {
        const li = document.createElement('li');
        ul.append(li);
    }
}


function countListItems() {
    for (let i in ul.children) {
        ul.children[i].innerHTML = +i + 1;
    }
}