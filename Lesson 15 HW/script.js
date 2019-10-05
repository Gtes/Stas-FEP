'use strict';

class Table {
    static TABLE_CONTAINER_CLASS = "my-table-container";
    static TABLE_ADD_PERSON_FORM = document.getElementById("addPersonForm");
    static TABLE_ADD_PERSON_BUTTON = document.getElementById("addPerson");

    constructor(el) {
        this.el = el;
        this.tableBody = this.el.getElementsByTagName("tbody")[0];

        this.wrapTable();
        this.addListeners();
    }


    addListeners() {
        this.tableBody.addEventListener("click", this.controlPersons);
    }


    wrapTable() {
        let wrapper = document.createElement("div");
        wrapper.classList.add(Table.TABLE_CONTAINER_CLASS);

        this.el.parentNode.insertBefore(wrapper, this.el);
        wrapper.appendChild(this.el);
    }


    controlPersons(el) {
        switch (true) {
            case el.target.classList.contains("deletePersonBtn"):
                Table.removePerson(el.target.parentElement.parentElement);
                break;

            case el.target.classList.contains("addPersonButton"):
                Table.addPersonRow();
                break;
        }
    }


    static generateTableCell(el) {
        const newCell = document.createElement("td");
        newCell.append(el);

        return newCell;
    }


    static generateDeletePersonBtn() {
        let deletePersonBtn = document.createElement("button");
        deletePersonBtn.innerHTML = "Delete";
        deletePersonBtn.classList.add("deletePersonBtn");

        return deletePersonBtn;
    }


    static getPersonData() {
        const TABLE_PERSON_NAME = document.getElementById("personName").value;
        const TABLE_PERSON_LAST_NAME = document.getElementById("personLastName").value;
        const TABLE_PERSON_PHONE = document.getElementById("phoneNumber").value;

        if (TABLE_PERSON_NAME == "" || 
            TABLE_PERSON_LAST_NAME == "" || 
            TABLE_PERSON_PHONE == "" || 
            isNaN(TABLE_PERSON_PHONE)) {

            return false;
            
        } else {
            const personData = {
                name: Table.generateTableCell(TABLE_PERSON_NAME),
                lastName: Table.generateTableCell(TABLE_PERSON_LAST_NAME),
                phoneNumber: Table.generateTableCell(TABLE_PERSON_PHONE),
                deletePersonButton: Table.generateTableCell(Table.generateDeletePersonBtn())
            };
            return personData;
        }
    }


    static addPersonRow() {
        let newRow = document.createElement("tr");

        if (Table.getPersonData()) {
            for (let i of Object.values(Table.getPersonData())) {
                newRow.appendChild(i);
                Table.TABLE_ADD_PERSON_FORM.parentNode.insertBefore(
                    newRow,
                    Table.TABLE_ADD_PERSON_FORM
                );
            }
        } else {
            alert('Complete all fields! Phone must be numbers only');
        }
    }

    
    static removePerson(el) {
        el.remove();
    }

}

const tab = new Table(document.getElementById("userTable"));