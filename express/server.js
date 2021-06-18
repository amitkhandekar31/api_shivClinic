'use strict';

require('dotenv').config()

const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));
// 
	router.post('/api/form',(req,res)=>{

	  var nodemailer = require('nodemailer');

	  var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	     user: process.env['REACT_APP_EMAIL'],
	      pass: process.env['REACT_APP_PWD']
	     
	    }
	  });

	  let mailOptions = {
	      
	      from   : '"Shiv Clinic" <shivclinic83@gmail.com>', // sender address
	      to     : req.body.email, // list of receivers
	      subject: req.body.subject, // Subject line
	      text   : req.body.text, // plain text body
	      html   : req.body.mail // html body
	    };

	 
	  transporter.sendMail(mailOptions, (error, info) => {
	      console.log('in mail');
	      if (error) {
	        
	        console.log("send mail error",error);
	        return "Failed";
	      }
	      if(info){
	        console.log('in info');
	        // return "Success";
	        res.status(200).json({ 
	          
	          message: "Success",
	          // return "Success",
	        });
	      }
	      res.render('index');
	    });

	  // console.log('ress',req.body)


	}) 
// 

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
