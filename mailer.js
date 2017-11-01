var nodemailer = require('nodemailer');

var mailConfig;
mailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'noreplydmtr@gmail.com',
      pass: '@dmtr123@'
  }
}

var transporter = nodemailer.createTransport(mailConfig);

module.exports = transporter
