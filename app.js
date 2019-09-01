require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const url = require('url'); 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("index", {hola:"holitas"});
});

app.post("/", function (req, res) {
    var college = req.body.college.replace(/\s+/g,'');
    var faculty = req.body.faculty.replace(/\s+/g,'');
    var major = req.body.major.replace(/\s+/g,'');
    var cvyear = req.body.cvyear.replace(/\s+/g,'');

    var firebaseKey = process.env.DB_API_KEY;

    res.redirect(url.format({
        pathname: "/malla",
        query: {
            college: college,
            faculty: faculty,
            major: major,
            cvyear: cvyear,
            // fbkey: firebaseKey
        }
    }));
})

app.get("/malla", function (req, res) {
    console.log(req.query);
    
    res.render("malla", req.query);
});

app.post("/malla", function (req, res) {
    var nonparsed = req.body.curriculum;
    var parsed = JSON.parse(nonparsed)

    res.redirect("success");
    // res.status(204).send();
});

app.get("/success", function (req, res) {
    // console.log(req.query);
    res.render("success");
});
// app.get("/:customListName", function (req, res) {
//     const customListName = _.capitalize(req.params.customListName);


//     if (true) {
//         //Create a new list
//         const list = new List({
//             name: customListName,
//             items: defaultItems
//         });
//         res.redirect("/" + customListName);
//     } else {
//         res.render("list", {
//             listTitle: foundList.name,
//             newListItems: foundList.items
//         });
//     }
// });
app.get("/about", function (req, res) {
    res.render("about");
});

let port = process.env.PORT;
if(port == null || port == "")
    port = 3000;

app.listen(port);