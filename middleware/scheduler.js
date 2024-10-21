const cron = require("node-cron");
const sendNotifications = require("./notification");

// Schedule the task to run every 2 minutes
cron.schedule("0 * * * *", () => {
  console.log(`Running notification job at ${new Date().toISOString()}...`);
  sendNotifications();
});
