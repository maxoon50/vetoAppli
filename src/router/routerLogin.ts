const express = require('express');
const routerLogin = express.Router();


let noMoreLogin = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    } else {
        next();
    }    
};


routerLogin.get('/',noMoreLogin, (req, res)=>{
    res.redirect('/login');
});

// routerLogin.route('/login')
//     .get(noMoreLogin, (req, res)=>{
//      res.render("login.ejs", {user : false});
//     })
//     .post((req, res)=>{
//      persoBLL.login(req.body.nom, req.body.password).then((response)=>{
//         req.session.user = response;
//         res.redirect('/home');
//     }, (error)=>{
//         var user={
//             nom : req.body.nom,
//             password: req.body.password,
//          };
//         res.render("login.ejs", {user : user});
//     });
// });
routerLogin.route('/login')
    .get(noMoreLogin, (req, res)=>{
     res.render("login.ejs", {user : false});
    });


routerLogin.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');   
        req.session.user = null;
    }
    res.redirect('/');
});


export = routerLogin;