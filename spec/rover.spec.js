const { Rover, receiveMessage } = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {

  // Test 7 - New rover creation and default values
  it('constructor sets position and default values for mode and generatorWatts', function() {
    let test = new Rover(75674);
    expect(test.position).toBe(75674);
    expect(test.mode).toBe('NORMAL');
    expect(test.generatorWatts).toBe(110);
  });

  // Test 8 - recieveMessage respose contains the message
  it('response returned by receiveMessage contains the name of the message', function() {
    let testMessage = new Message("Test 8 Message Name");
    let test = receiveMessage(testMessage);
    expect(test.messageName).toBe("Test 8 Message Name");
  });

  // Test 9 - recieveMessage respose contains 2 commands sent
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let arrCommands = [new Command("Test Command 1"), new Command("Test Command 2")];
    let testMessage = new Message("Test 9 Message Name", arrCommands);
    console.log(receiveMessage(testMessage).results.length);
    expect(receiveMessage(testMessage).results.length).toBe(2);
  });

  // // Test 10
  // it('responds correctly to the status check command', function() {
  //   let testCommand = new Command('STATUS_CHECK');
  // });

});
