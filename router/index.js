const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.use(express.json());

router.get('*', (req, res) => {
  res.send('THE RISE OFFICIAL SERVER');
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops!An Error occured.');
});


//POST REQUESTS
router.post('/login', (req, response) => {

    const username = req.body.username;
    const password = req.body.password;

  User.findOne({username:username})
  .then(user => {
    if(user){
      bcrypt.compare(password, user.password, function(err, res) {
        if (res) {
          return response.send({success: 'true',type:"username", msg:"You are logged in."});
        }else{
          return response.send({success: 'false',type:"password", msg:"Passwords do not match"});   
        }
      });
    }else if (!user){
        response.send({success : "none", msg:"User does not exist"})
    }

  }).catch(e => console.log(e,'Something went wrong!'))
  
});


router.post('/register', (req, res) => {

  const password = req.body.password;

  let userData = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  User.findOne({username: req.body.username})
  .then(user => {
    if(user){
      res.send({success : 'false', msg : 'Username already exists'})
    }else{
        const newUser = new User(userData)
        const hashing = async (password) => {
          const salt = await bcrypt.genSalt(10)
          newUser.password  = await bcrypt.hash(password, salt);
          newUser.save()
          .then(user => res.send({success : 'true', msg : 'Account Created'}));
      }
      
      hashing(password);
    }
  })
  
  
})

router.post('/bookmarkquote', (req, res) => {

  const quote = req.body.quote;
  const author = req.body.author;
  const username = req.body.username;

  const quoteJSON = {
    quote: quote,
    author : author
  };
  
  User.findOneAndUpdate({username:username}, { $push : {quotes : quoteJSON}}, (err, done) => {
    if(done){
      res.send({success : true, msg:"Added to Favourites"})
    }else{
      res.send({success : false, msg: "Try Again"})
    }
  })

})

router.post('/getuser', (req, res) => {

  const username = req.body.username;

  User.findOne({username : username}, (err, user) => {
    if(!user){res.send({msg:'Try Again'})}
    else{
      res.send(user)
    }
  })
})

router.post('/deletequote', (req, res) => {

  const {username, _id} = req.body;

  User.updateOne({username:username}, {
    $pull : {quotes : {
      _id : _id
    }}
  },
    (err, done) => {
      if (done){
        res.send({success : 'true', msg:'Removed one quote from favourites'})
      }else res.send({success : 'false', msg: 'Try Again'})
    }
  )

})

module.exports = router;

