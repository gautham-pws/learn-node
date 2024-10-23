// scheduler

import cron from "node-cron";
import sendNotifications from "./notification.js";

// task runs every 24 hour
cron.schedule("0 * * * *", () => {
  console.log(`Running notification job at ${new Date().toISOString()}...`);
  sendNotifications();
});
