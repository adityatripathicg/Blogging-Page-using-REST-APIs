const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
let posts = [
    {
        id: uuidv4(),
        username : "cg",
        content : "I love Coding"
    },
    {
        id: uuidv4(),
        username : "scg",
        content : "I also love Coding"
    },
];
app.get("/posts",(req,res)=>{
    //res.send("app working");
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
        //res.send("app working");
        res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    //res.send("app working");
    let {username , content} = req.body;
    let id = uuidv4();
    console.log(id);
    posts.push({id, username, content});
    console.log(posts);
    res.redirect("http://localhost:3000/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    //res.send("Request Working");
    let post = posts.find((p) => id === p.id);
    //console.log(posts);
    //console.log(post);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    //console.log(id);
    //console.log(newcontent);
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    //res.send("Patch Request Working");
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    //let post = posts.find((p) => id === p.id);
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
    //res.send("Delete Success");
});
app.listen(port,()=>{
    console.log("App listening to port :3000");
});