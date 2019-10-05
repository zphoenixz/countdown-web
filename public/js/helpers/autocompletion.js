var firebaseConfig = {
    apiKey: "AIzaSyDgwBYKRyffOGTX2aXAVqcfPddv9Dzgw8E",
    authDomain: "schedules-6415d.firebaseapp.com",
    databaseURL: "https://schedules-6415d.firebaseio.com",
    projectId: "schedules-6415d",
    storageBucket: "schedules-6415d.appspot.com",
    messagingSenderId: "576534115494",
    appId: "1:576534115494:web:c72bfea28c2d98c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

$(document).ready(function() {
    $('select').niceSelect();
});

function getData(path){
    var collegess = {}
    var collegeCompletionn = []
    
    db.collection(path).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (parent) {
            childs = []
            collegeCompletionn.push(parent.id);

            var data = parent.data()
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var faculty = data[key];
                    childs.push(faculty);
                }
            }
            collegess[parent.id] = childs;
        });
    });

    return [collegess, collegeCompletionn]
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    var a, b, i, val 
    
    /*execute a function when someone writes in the text field:*/

    inp.addEventListener('focusin', function (e) {
        var object = this;
        a, b, i, val = this.value;
        closeAllLists();
                createItems(a, b, i, val, object); 
    });

    inp.addEventListener("input", function (e) {
        a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        createItems(a, b, i, val, this) 
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function createItems(a, b, i, value, object) {
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", object.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        object.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                b.className = 'autocomplete_div';
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, value.length) + "</strong>";
                b.innerHTML += arr[i].substr(value.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    var val = this.getElementsByTagName("input")[0].value
                    inp.value = val;
                    var event = new Event('keyup');
                    inp.dispatchEvent(event)
                    var event = new Event('focusout');
                    inp.dispatchEvent(event)
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    
                });
                a.appendChild(b);
            }
        }
    }

    function start(){
        
    }

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
}
