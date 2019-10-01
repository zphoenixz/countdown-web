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
    res.render("home", {hola:"holitas"});
});

app.get("/studyplan-data", function (req, res) {
    res.render("studyplan-data", {hola:"holitas"});
});

app.post("/studyplan-data", function (req, res) {
    var college = req.body.college.replace(/\s+/g,'');
    var faculty = req.body.faculty.replace(/\s+/g,'');
    var major = req.body.major.replace(/\s+/g,'');
    var cvyear = req.body.cvyear.replace(/\s+/g,'');
    var modify = req.body.modify;

    var firebaseKey = process.env.DB_API_KEY;

    res.redirect(url.format({
        pathname: "/studyplan-graph",
        query: {
            college: college,
            faculty: faculty,
            major: major,
            cvyear: cvyear,
            modify: modify
            // fbkey: firebaseKey
        }
    }));
})

app.get("/studyplan-graph", function (req, res) {
    console.log(req.query);
    res.render("studyplan-graph", req.query);
});

app.post("/studyplan-graph", function (req, res) {
    var nonparsed = req.body.curriculum;
    var parsed = JSON.parse(nonparsed)

    res.redirect("studyplan-success");
});

app.get("/studyplan-success", function (req, res) {
    res.render("studyplan-success");
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