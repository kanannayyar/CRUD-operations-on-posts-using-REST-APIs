const express=require('express');
const app=express();
const path=require("path");
const { v4 : uuidv4 } = require("uuid");                  //using uuid package for post IDs
const methodOverride=require("method-override")

app.set('view engine','ejs');
app.set('views' , path.join(__dirname,'/views'));

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended : true}));

app.use(methodOverride("_method"));

const port=8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


let posts=[                                                           //posts data stored in an array
    {
        id: uuidv4(),                                                 //id using uuid package
        username:"kanannayyar",
        content:"this is my first post"
    },
    {
        id: uuidv4(),
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
//1) serve the form: GET/posts/new -> form will send post request
//2) add the new posts(to the posts array): POST/posts
app.get("/posts/new",(req,res)=>{
    res.render("newPost.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");                                  //sends a new get request to /posts
});

//implementing view route: to see a particular post
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("viewPost.ejs",{post});
});

//implementing update route: to update a particular post
app.get("/posts/:id/edit",(req,res)=>{                                            //edit route
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id );
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id", (req,res)=>{                                             //update route
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find( (p)=> id === p.id );
    post.content=newContent;
    res.redirect("/posts");
});