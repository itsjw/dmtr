var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = require('../mailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DMTR' });
});

router.post('/', function(req, res, next) {  
  var msg = req.body.message ? req.body.message : '';
  var phone = req.body.phone ? req.body.phone : 'Sem telefone.';
  var email = req.body.email ? req.body.email : '';
  var name = req.body.name ? req.body.name : 'Sem nome';

  var message = {
    from: 'No-Reply <noreplydmtr@gmail.com>',
    to: 'Contato DMTR <contato@dmtr.co>',
    subject: '[DMTR] '+ name,
    replyTo: email,
    text: 'Mensagem: ' + msg + '\nEmail: ' + email + '\nTelefone: ' + phone
  };

  transporter.sendMail(message, function(error, info) {
    if(error) {
      console.log(error.message);
      res.status(500).json({message: 'Falha ao enviar mensagem.'});
    }
    
    console.log(info);
    res.status(200).json({message: 'Mensagem enviada com sucesso.'});
    transporter.close();
  });
});

module.exports = router;
