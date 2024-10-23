import {User, Products} from "../models";

async function sendNotifications() {
  try {
    // Get the current date
    const now = new Date();

    // Find products added in the last 24 hours
    const newProducts = await Products.find({
      createdAt: {
        $gte: new Date(now.setDate(now.getDate() - 1 * 60 * 1000)), // Get products from the last 24 hours
      },
    });

    // Find users who have opted for notifications
    const users = await User.find({notifications: true});

    // Create a transporter for sending emails (using console transport for mock)
    // const transporter = nodemailer.createTransport({
    //   // Using a console transport to log emails
    //   sendMail: (mailOptions, callback) => {
    //     console.log("Mock Email Sent:");
    //     console.log("From:", mailOptions.from);
    //     console.log("To:", mailOptions.to);
    //     console.log("Subject:", mailOptions.subject);
    //     console.log("Text:", mailOptions.text);
    //     // Call the callback to simulate success
    //     callback(null, true);
    //   },
    // });

    // Prepare and send notifications
    users.forEach(async (user) => {
      if (newProducts.length > 0) {
        const productNames = newProducts
          .map((product) => product.name)
          .join(", ");

        const mailOptions = {
          from: "gpg.pws@gmail.com",
          to: user.email,
          subject: "New Products Added!",
          text: `Hello ${user.name},\n\nNew products have been added: ${productNames}\n\nCheck them out!`,
        };
        console.log("🚀 ~ users.forEach ~ mailOptions:", mailOptions);

        // Send the email
        // await transporter.sendMail(mailOptions);
      }
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
}

export default sendNotifications;
