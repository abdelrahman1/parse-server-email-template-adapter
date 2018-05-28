const nodeMailer = require("nodemailer");
const parser = require("./parser");
const path = require("path");

const adapter = opt => {
  //set defaults
  const templates = opt.templates || {};

  //create nodemailer transporter
  let transporter = nodeMailer.createTransport(opt);

  //transporter verification
  const verifyTransporter = () => {
    return new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });
  };

  //
  const sendMail = mail => {
    return new Promise((resolve, reject) => {
      //parse template
      parser(mail.template, mail.templateData)
        .then(html => {
          let mailOptions = {
            from: opt.from,
            to: [mail.to],
            subject: mail.subject,
            html
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              reject(error);
            } else {
              resolve(info);
            }
          });
        })
        .catch(error => reject(error));
    });
  };

  //sendVerificationEmail interface
  sendVerificationEmail = data => {
    return new Promise((resolve, reject) => {
      const { user, appName } = data;
      sendMail({
        to: user.get("email") || user.get("username"),
        subject: "Please verify your E-mail with " + appName,
        template:
          templates.verificationEmail ||
          path.join(__dirname, "../templates/verificationEmail.html"),
        templateData: data
      })
        .then(success => {
          resolve(success);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  //sendPasswordResetEmail interface
  sendPasswordResetEmail = data => {
    return new Promise((resolve, reject) => {
      const { user, appName } = data;
      sendMail({
        to: user.get("email") || user.get("username"),
        subject: "Reset your password with " + appName,
        template:
          templates.passwordResetEmail ||
          path.join(__dirname, "../templates/passwordResetEmail.html"),
        templateData: data
      })
        .then(success => {
          resolve(success);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return {
    sendMail,
    verifyTransporter,
    sendVerificationEmail,
    sendPasswordResetEmail
  };
};

module.exports = adapter;
