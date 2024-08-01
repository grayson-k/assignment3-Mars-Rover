class Message {
   constructor(name, commands) {
      if (!name) {
         throw('Error: Please pass in a constructor!');
      }
      this.name = name;
      this.commands = commands;
   }
}

module.exports = Message;