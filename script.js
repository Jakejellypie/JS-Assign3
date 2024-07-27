//Creating variables in Javascript for all the elements
//creating a var to store the button to add items to the ul
const addButton = document.getElementById('add-todo');
//creating a var that represents the input text-field where the user will type their item that they want to add
const todoInput = document.getElementById('todo-input');
//creating a var to represent the ul that will contain the newely added li items in the todo list.
const todoList = document.getElementById('todo-list');
//creating a var to contain the ding sound for the button
const buttonSound = document.getElementById('button-sound');
//creating a var to contain the error sound which will play when user clicks on add on an empty input field.
const errorSound = document.getElementById('error-sound');


//addoing an event listener to add the function 'addTodoItem' when the addButton is clicked.
    addButton.addEventListener('click', () => {
        //creating a var that contains the text Node of the textField.
        const todoText = todoInput.value.trim();
        //if the textNode is not empty then the 'addTodoItem' function will add the written item into the todoList li.
        if (todoText) {
            addTodoItem(todoText);
            //resetting the textField afterwards/
            todoInput.value = '';
            //play the ding sound
            buttonSound.play();
            // Disable the button
            addButton.disabled = true;
            addButton.classList.add('button-interval');
        
            // Re-enable the button when the sound finishes
            buttonSound.onended = () => {
                addButton.disabled = false;
                addButton.classList.remove('button-interval');
            };
        }
        else if(todoText == false){
            alert("The textfield is empty");
            errorSound.play();
            addButton.disabled = true;
            addButton.classList.add('button-interval');

            errorSound.onended = () => {
                addButton.disabled = false;
                addButton.classList.remove('button-interval');
            };
        }

    });

// Creating an addTodoItem function that will add the written textField input into the todoList ul.
function addTodoItem(todoText) {
    // Creating a new list item element
    const todoItem = document.createElement('li');
    // Giving it a className of 'todo-item' for styling and identification purposes
    todoItem.className = 'todo-item';
    
    // Creating a checkbox input element that will be associated with each li
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // Setting the input type to 'checkbox'
    // Adding an event listener to the checkbox to toggle the 'completed' class on the todoItem when checked/unchecked
    checkbox.addEventListener('change', () => {
        todoItem.classList.toggle('completed');
        // Calling the function to move completed items to the bottom of the list
        moveCompletedToBottom();
    });

    // Creating a span element to hold the text of the to-do item
    const span = document.createElement('span');
    span.textContent = todoText; // Setting the text content of the span to the provided to-do text

    // Creating a button element for deleting the to-do item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; // Setting the button's text to 'Delete'
    deleteButton.className = 'delete-btn'; // Giving the button a className of 'delete-btn' for styling
    // Adding an event listener to the delete button to remove the todoItem from the list when clicked
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(todoItem);
    });

    // Appending the checkbox, span, and delete button to the todoItem li element
    todoItem.appendChild(checkbox);
    todoItem.appendChild(span);
    todoItem.appendChild(deleteButton);

    // Appending the newly created todoItem to the todoList ul element
    todoList.appendChild(todoItem);
}

// Creating a function to move completed to-do items to the bottom of the list
function moveCompletedToBottom() {
    // Selecting all list items with the class 'completed'
    const completedItems = document.querySelectorAll('.todo-item.completed');

    // Looping through each completed item
    for (let i = 0; i < completedItems.length; i++) {
        // Appending each completed item to the end of the todoList
        todoList.appendChild(completedItems[i]);
    }
}


