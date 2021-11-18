const Todos = require('./index');
const assert = require('assert').strict;
const fs = require('fs');
/*

describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
    [Test Code]
    });
});

*/

// https://mochajs.org/#getting-started

describe("integration test", function () {
    it("should be able to add and complete TODOs", function () {
        // verify it has no items in todos
        let todos = new Todos();

        assert.strictEqual(todos.list().length, 0);

        todos.add("run code");
        assert.strictEqual(todos.list().length, 1);
        assert.deepStrictEqual(todos.list(), [{
            title: "run code", completed: false
        }]);


        todos.add("test everything");
        assert.strictEqual(todos.list().length, 2);
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: false },
                { title: "test everything", completed: false }
            ]
        );
        todos.complete("run code");
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: true },
                { title: "test everything", completed: false }
            ]
        );


    });
});

describe("complete()", function () {


    it("should fail if there are no TODOs", function () {
        let todos = new Todos();

        // we define the error we are expecting to receive when we call the complete() function.
        const expectedError = new Error("You have no TODOs stored. Why don't you add one first?");

        //  Its first argument is a function that contains the code that throws the error. The second argument is the error we are expecting to receive.
        assert.throws(() => {
            todos.complete("doesn't exist");
        }, expectedError);
    });
});

// async / await
describe("saveToFile()", function () {
    // Hooks to Improve Test Cases
    beforeEach(function () {
        this.todos = new Todos();
        this.todos.add("save a CSV");
    });

    afterEach(function () {
        if (fs.existsSync("todos.csv")) {
            fs.unlinkSync("todos.csv");
        }
    });


    // Test Cases
    it("should save a single TODO without error", async function () {
        // let todos = new Todos();
        // todos.add("save a CSV");

        await this.todos.saveToFile();
        // we first check that our file exists
        assert.strictEqual(fs.existsSync('todos.csv'), true);
        // We then create a variable to store our expected value
        let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);

    });

    // let’s add a second test to confirm that our file is saved correctly when we have a completed a TODO item.

    it("should save a single TODO that's completed", async function () {
        //let todos = new Todos();
        //todos.add("save a CSV");
        this.todos.complete("save a CSV");
        await this.todos.saveToFile();

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,true\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });


});