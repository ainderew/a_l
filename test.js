const fs = require('fs');
const cron = require('node-cron');

const n = new Date().getHours();
if (n === 22) {
  fs.writeFileSync('./e.js', 's');
}

// ...

// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function () {
  console.log('running a task every minute');
});
