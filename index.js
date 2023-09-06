const express = require('express');
const path = require('path');
const port=8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded()); // parsing the form data in key value form -> middleware
app.use(express.static('assets')); // accessing the static file like css,js ,image etc.

var contactList = [
    {
        name:"Arpan",
        phone:"656562356"      
    },
    {
        name:"Ritesh",
        phone:"998442565"
    },
    {
        name:'Vinay',
        phone:'85296374'
    }
]

app.get('/',function(req,res){
    return res.render('home', {
        title:"Contacts List",
        contact_list : contactList
    });
});

app.get('/' ,function(req,res){
    Contact.find({}, function(err,contacts){
      if(err){
          console.log("error in fetchig from db");
          return;
      }
      return res.render('home',{
          title:"contacts List",
          contact_list:contacts
      });
    })
  })


     app.get('/practice',function(req,res){
        return res.render('practice',{
        title: "Let us play with ejs"
         });
    });
   
    app.post('/create-contact',function(req,res){
    contactList.push(req.body);
     return res.redirect('/');
   })

    app.post('/create-contact' , function(req,res){
       
        Contact.create( {
            name: req.body.name,
            phone: req.body.phone
        },  function(err,newContact){
            if(err){
                console.log('Error in creating a contact!')
                return;
            }
            // console.log('******',newContact);
            return res.redirect('back');
        })

        Contact.save();
        console.log(newContact);
        }); 
   
    app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params);
    let phone = req.params.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone === phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
        return res.redirect("back");
    }

    })
    app.get('/delete-contact/:name',function(req,res){
        console.log(req.params);
        let phone = req.params.name;
        let contactIndex = contactList.findIndex(contact => contact.name === name);
        if(contactIndex != -1){
            contactList.splice(contactIndex,1);
            return res.redirect("back");
        }
 })

app.listen(port,function(err){
    if(err){
        console.log("Error is running in the server",err);
    }

console.log("Yup! My express server is runnning on port:",port);
})



