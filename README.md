# Parse Server Email Template Adapter

[![npm version](https://badge.fury.io/js/parse-server-email-template-adapter.svg)](https://badge.fury.io/js/parse-server-email-template-adapter)

parse email adapter for sending html email templates with parse platform like (verificationEmail, passwordResetEmail) or a custom email template.
this adapter uses [nodemailer](https://nodemailer.com) as a dependancy.

for more about parse server: https://github.com/parse-community/parse-server.

## Installation

```sh
$ npm install --save parse-server-email-template-adapter
```

## Usage

adapter.js

```javascript

//adapter options
const options = {
  // ... nodemailer options,
  templates: {
    verificationEmail: path.join(__dirname, templatePath),
    passwordResetEmail: path.join(__dirname, templatePath)
  }
};

//import the module and pass the options
const adapter = require("parse-server-email-adapter")({...opt});

//export the options to be used in the parse server config
//export the sendMail function to be used in sending emails in cloud code
module.exports = {
  adapter.sendMail,
  options,
};
```
parse server config
```javascript
const path = require("path");
const mailAdapter = require(/*adapter.js path*/);
const parse = new ParseServer({
  //...parse config
  emailAdapter: {
    module: "parse-server-email-template-adapter",
    options: {
      ...mailAdapter.options
    }
  }
});
```

cloud code /cloud/main.js

```javascript
const mailAdapter = require(/*adapter.js path*/);
const path = require("path");

Parse.Cloud.define("sendMail", (req, res) => {
  mailAdapter
    .sendMail({
      to: req.params.to, // "foo <foo@example.com>"
      subject: req.params.subject, // email subject
      template: path.join(__dirname /*template path*/),
      templateData: {
        /*template data*/
      } // now you can use {{paramater}} in your template
    })
    .then(info => res.success("success"))
    .catch(err => res.error(err));
});
```