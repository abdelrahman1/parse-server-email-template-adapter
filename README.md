# Parse Server Email Template Adapter

parse email adapter for sending templated html emails of parse platform (verificationEmail,  passwordResetEmail), also it could be used to send custom templated emails in parse cloud code or in your custom Apis

for more about parse server: https://github.com/parse-community/parse-server.

## Installation
```sh
$ npm install --save parse-server-email-template-adapter
```

## Usage

```javascript
const parse = new ParseServer({
   //...
   emailAdapter: {
      module: "parse-server-generic-email-template-adapter",
      options: {
         // ... nodemailer options,
         templates:{
           verificationEmail:path.join(__dirname,templatePath),
           passwordResetEmail:path.join(__dirname,templatePath)          
         }
      }
   }
});
```
```javascript
const emailAdapter = require("parse-server-email-adapter")({
  ...opt
});
emailAdapter.sendMail({
  to:"foo <foo@example.com>",
  subject://email subject,
  template://template path ,
  templateData:// data to be parsed
}).then(info => res.success('sent')).catch(err=>res.error(err));
```