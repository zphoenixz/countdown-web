const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

// const item1 = new Item({
//     name: "Welcome to your todolist!"
// });
// const item2 = new Item({
//     name: "Hit the + button to add a new item."
// });
// const item3 = new Item({
//     name: "<-- Hit this to delete an item."
// });
// const defaultItems = [item1, item2, item3];
// const listSchema = {
//     name: String,
//     items: [itemsSchema]
// };


app.get("/", function (req, res) {
    res.render("index");
});

app.post("/", function (req, res) {

    // const itemName = req.body.newItem;
    // const listName = req.body.list;
    // const item = new Item({
    //     name: itemName
    // });

    // if (listName === "Today") {
    //     item.save();
    //     res.redirect("/");
    // } else {
    //     res.redirect("/" + listName);
    // }
    res.redirect("/malla");
})

app.get("/malla", function (req, res) {
    res.render("malla");
});

app.post("/malla", function (req, res) {
    console.log(req.body.curriculum);
    res.render("malla");
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

;

// app.post("/delete", function (req, res) {
//     const checkedItemId = req.body.checkbox;
//     const listName = req.body.listName;

//     if (listName === "Today") {
//         console.log("Successfully deleted checked item.");
//         res.redirect("/");
//     } else {
//         res.redirect("/" + listName);
//     }
// });

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});