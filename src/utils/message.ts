import cron from "node-cron";
import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0231b166b704b9",
    pass: "eb73e7e3aed65e",
  },
});

const userInfo = [
  "example@gmail.com",
  "sid@gmail.com",
  "sample@gmail.com",
  "sider@gmail.com",
];

export const sendLoginMessage = async () => {
  try {
    cron.schedule(
        "30 4 * * *",
      () => {
        for (let i = 0; i < userInfo.length; i++) {
          const mailOptions = {
            from: "your-email@gmail.com",
            to: `${userInfo[i]}`,
            subject: "Daily Reminder",
            text: "Market is open now. You can login now",
          };
          transport.sendMail(mailOptions, (err) => {
            if (err) {
              console.log("Error");
            }
          });
        }
      },
      {
        timezone: "Asia/Kolkata",
      }
    );
  } catch (error) {
    console.log(error);
    return;
  }
};

export const sendLogOutMessage = async () => {
  try {
    cron.schedule(
      "30 7 * * *",
      () => {
        for (let i = 0; i < userInfo.length; i++) {
            const mailOptions = {
              from: "your-email@gmail.com",
              to: `${userInfo[i]}`,
              subject: "Daily Reminder",
              text: "Market is close now. You can logout now",
            };
            transport.sendMail(mailOptions, (err) => {
              if (err) {
                console.log("Error");
              }
            });
          }
      },
      {
        timezone: "Asia/Kolkata",
      }
    );
  } catch (error) {
    console.log(error);
    return;
  }
};
