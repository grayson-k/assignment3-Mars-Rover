class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      }
      
      // Check if message.commands is defined and ensure it is an array
      let commands = [];
      if (message.commands) {
         commands = Array.isArray(message.commands) ? message.commands : [message.commands];
      }

      if(commands.length > 0) {
         for(let i = 0; i < commands.length; i++) {
            if(commands[i].commandType === 'STATUS_CHECK') {

               let statusCheckReturn = {
                  completed: true,
                  roverStatus: {
                     mode: this.mode,
                     generatorWatts: this.generatorWatts,
                     position: this.position,
                  }
               }

               response.results.push(statusCheckReturn);
            } else if(commands[i].commandType === 'MODE_CHANGE'){
               if(commands[i].value === 'LOW_POWER') {
                  this.mode = 'LOW_POWER';
               } else if (commands[i].value === 'NORMAL') {
                  this.mode = 'NORMAL';
               }

               let modeChangeReturn = {
                  completed: true,
               }

               response.results.push(modeChangeReturn);
            } else if(commands[i].commandType === 'MOVE') {
               let moveReturn = {
                  completed: false,
               };

               if(this.mode === 'LOW_POWER') {
                  moveReturn.completed = false;
               } else if (this.mode === 'NORMAL') {
                  this.position = commands[i].value;
                  moveReturn.completed = true;
               }
               
               response.results.push(moveReturn);
            } else {
               response.results.push(commands[i]);
            }
         }
      }

      return response;
   }
}

module.exports = Rover;