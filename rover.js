class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
}

function receiveMessage(message) {
   let response = {
      messageName: message.name,
      results: []
   }

   if(message.commands) {
      for(let i = 0; i < message.commands.length; i++) {
         response.results.push(message.commands[i]);
      }
   }

   return response;
}

module.exports = {
   Rover,
   receiveMessage
};