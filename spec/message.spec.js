const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    // Test 4 - Error if there is name is not passed in first param
    it('throws error if a name is NOT passed into the constructor as the first parameter', function() {
        expect(function () {
            new Message();
        }).toThrow("Error: Please pass in a constructor!");
    });

    // Test 5 - Name in message is set correctly
    it('constructor sets name', function() {
        let test = new Message('testName');
        expect(test.name).toBe('testName');
    });

    // Test 6 - Array of commands is passed correctly
    it('contains a commands array passed into the constructor as the 2nd argument', function() {
        let arr = ['message 1', 'message 2', 'message 3'];
        let test = new Message('testName', arr);
        expect(test.commands).toStrictEqual([ 'message 1', 'message 2', 'message 3' ]);
    });

});
