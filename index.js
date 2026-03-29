const express=require('express');
const app=express();
const path=require("path");

app.set('view engine','ejs');
app.set('views' , path.join(__dirname,'/views'));

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended : true}));

const port=8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


let posts=[                                                           //posts data stored in an array
    {
        username:"kanannayyar",
        content:"this is my first post"
    },
    {
        username:"ajaynayyar",
        content:"Hard work is the key to success"

    }
];

//implementing index route: GET/posts
//to view all posts
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//implementing create route: POST/posts
//add new posts

//implemented using 2 routes:
//1) serve the form: GET/posts/new
//2) add the new posts POST/posts