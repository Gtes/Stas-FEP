function getState() {
    const data = localStorage.getItem('todo');
    return data ? JSON.parse(data) : [];
}


function saveState() {
    console.log(lisOfTodos)
    localStorage.setItem('todo', JSON.stringify(this.lisOfTodos));
}

export {getState,saveState}