const express=require('express');
const hbs=require('hbs');
const fs =require('fs');
const port= process.env.PORT||3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('upperCase',(txt)=>{
  return txt.toUpperCase();
});
app.use((req,res,next)=>{
  var log=new Date().toString();
  var logTxt=`${log}: ${req.method} ${req.url} \n`;
  fs.appendFile('server.log',logTxt,(error)=>{
    if(error){
      console.log(error);
    }
  });
  // res.render('maintenance.hbs',{
  //   welcomeMessage:`We'll be wight back`,
  //   pageTitle: `Maintenance Title`
  // });
  next();
});
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');


app.get('/',(request,response)=>{
  // response.send('<h1>Hello Express</h1>');
  response.render('home.hbs',{
      welcomeMessage:'Welcome to you our site',
      pageTitle: 'Home Page'
  })
});

app.get('/about',(req,resp)=>{
  resp.render('about.hbs',{
    pageTitle: 'About Page'
  })
});
app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects Place'
  })
});

app.get('/contact',(req,resp)=>{
  resp.send('<h1>Contact Page</h1>')
});
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
