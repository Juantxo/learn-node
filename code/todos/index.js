const fs = require('fs').promises;


class Todos {

    constructor() {
        this.todos = [];
    }
    // returns a copy of the array that’s used by the class
    list() {
        return [...this.todos];
    }

    // adds a new TODO item
    add(title) {
        let todo = {
            title: title,
            completed: false,
        }
        this.todos.push(todo);
    }
    // mark items as completed.
    complete(title) {

        if (this.todos.length === 0) {
            throw new Error("You have no TODOs stored. Why don't you add one first?");
        }

        let todoFound = false;

        this.todos.forEach((todo) => {
            if (todo.title === title) {
                todo.completed = true;
                todoFound = true;
                return;
            }
        });
        if (!todoFound) {
            throw new Error(`No TODO was found with the title: "${title}"`);
        }
    }

    saveToFile() {
        let fileContents = 'Title,Completed\n';
        this.todos.forEach((todo) => {
            fileContents += `${todo.title},${todo.completed}\n`
        });
        // We now return the result of the writeFile() promise.
        return fs.writeFile('todos.csv', fileContents);
    }

}


module.exports = Todos;
