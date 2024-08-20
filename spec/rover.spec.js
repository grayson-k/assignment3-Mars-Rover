const Rover = require('../rover.js');
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
    let test = new Rover().receiveMessage(testMessage);
    expect(test.message).toBe("Test 8 Message Name");
  });

  // Test 9 - recieveMessage respose contains 2 commands sent
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let arrCommands = [new Command("Test Command 1"), new Command("Test Command 2")];
    let testMessage = new Message("Test 9 Message Name", arrCommands);
    expect(new Rover().receiveMessage(testMessage).results.length).toBe(arrCommands.length);
  });

  // Test 10 - response to status check commmand
  it('responds correctly to the status check command', function() {
    let testCommand = new Command('STATUS_CHECK');
    let testMessage = new Message('Test 10 Message Name', testCommand);
    let testRover = new Rover(75674);
    expect(testRover.receiveMessage(testMessage)).toStrictEqual({"message": "Test 10 Message Name", "results": [{"completed": true, "roverStatus": {"generatorWatts": 110, "mode": "NORMAL", "position": 75674}}]})
  });

  // Test 11 - response to mode change commmand
  it('responds correctly to the mode change command', function() {
    let testCommand = new Command('MODE_CHANGE', 'NORMAL');
    let testMessage = new Message('Test 11 Message', testCommand);
    let testRover = new Rover(43243);
    expect(testRover.receiveMessage(testMessage).results).toStrictEqual([{completed: true}]);
    expect(testRover.mode).toBe('NORMAL');
  });

  // Test 12 - response when trying to move on low power
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 213213)]
    let testMessage = new Message('Test 12 Message', testCommands);
    let testRover = new Rover(32324);
    expect(testRover.receiveMessage(testMessage).results).toStrictEqual([ { completed: true }, { completed: false } ]);
  });

  // Test 13 - respond with new position after move
  it('responds with the position for the move command', function() {
    let testCommand = new Command('MOVE', 1921321);
    let testMessage = new Message('Test 13 Message', testCommand);
    let testRover = new Rover(323023);
    expect(testRover.receiveMessage(testMessage).results).toStrictEqual([{ completed: true }]);
  });
});

