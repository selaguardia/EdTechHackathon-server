const express = require("express");
const router = express.Router();
// Will be used to securely handle user passwords
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// Sign Up GET Route
router.get('/signup', (req, res) => {
  return res.send('Sign up page')
})

// Sign Up POST Route
router.post('/signup', async (req, res) => {
  try {
    console.log('SIGNUP POST REACHED!')
    // check if user exists
    const foundUser = await User.exists({
      $or: [{ email: req.body.email },],
    });

    // if user DOES exist, redirect to login
    if (foundUser) {
      console.log('foundUser', foundUser);
      return res.redirect("/login");
    }

    // if user DOES NOT exist
    // create a salt
    const salt = await bcrypt.genSalt(10);
    console.log('salt', salt)
    // hash password
    console.log('1',req.body)
    console.log('2',req.body.password)
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log('reqbody', req.body);
    req.body.password = hash; 

    // create user
    const createdUser = await User.create(req.body);
    console.log("created User",createdUser);

    // redirect to login
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// Login GET Route
router.get('/login', (req, res) => {
  return res.send('Login page')
})

// Login POST Route
router.post('/login', async (req, res) => {
  try {
    console.log('foundUser==>', req);
    // check if user exists
    const foundUser = await User.findOne({ email: req.body.email });
    
    // if user does not exist
    // redirect to register
    if (!foundUser) {
      return res.redirect("/register");
    }

    // if user does exist
    // compare passwords
    // NOTE Authentication
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    
    // if passwords DO NOT match
    // send password invalid
    if (!match) {
      return res.send("Sorry, password is invalid");
    }

    // if passwords DO match
    // add the user info to the session
    // NOTE Credentials
    req.session.currentUser = {
      id: foundUser._id,
    };
    // redirect to menu
    return res.redirect("/admin/menu");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }

});

// Logout GET
router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});



module.exports = router;