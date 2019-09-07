let collegeInput = document.getElementById("college");
let facultyInput = document.getElementById("faculty");
let majorInput = document.getElementById("major");
let cvyearInput = document.getElementById("cvyear");

let college_s = "";
let faculty_s = "";
let major_s = "";
let cvyear_s = "";

var first = getData("BOLIVIA");
var colleges = first[0];
var collegeCompletion = first[1];

var modifyInput = document.getElementById('hiddenInput');
var modifyCurriculum = false;
var second, cvyear, majors;
//===============================================================================
try {
autocomplete(document.getElementById("college"), collegeCompletion, 0);
} catch (err) {}

collegeInput.addEventListener('keyup', function (e) {
    collegeInput.value = collegeInput.value.toUpperCase();
    college_s = collegeInput.value;
    if (college_s != "" && faculty_s != "" && major_s != "" && cvyear_s != "") {
        checkData();
    }
    // else{
    //     document.getElementById("contact-submit").style.cursor = "not-allowed"; 
    //     document.getElementById("contact-submit").disabled = true;
    // }
});
collegeInput.addEventListener('focusout', function (e) {
    autocomplete(document.getElementById("faculty"), colleges[college_s], 1);
});
//===============================================================================
facultyInput.addEventListener('keyup', function (e) {
    facultyInput.value = facultyInput.value.toUpperCase();
    faculty_s = facultyInput.value;
    if (college_s != "" && faculty_s != "" && major_s != "" && cvyear_s != "") {
        checkData();
    }
});
facultyInput.addEventListener('focusout', function (e) {
    second = getData("BOLIVIA/" + college_s + '/' + faculty_s);
    cvyear = second[0];
    majors = second[1];

    autocomplete(document.getElementById("major"), majors, 2);
});
//===============================================================================
majorInput.addEventListener('keyup', function (e) {
    majorInput.value = majorInput.value.toUpperCase();
    major_s = majorInput.value;
    if (college_s != "" && faculty_s != "" && major_s != "" && cvyear_s != "") {
        checkData();
    }
});
majorInput.addEventListener('focusout', function (e) {
    autocomplete(document.getElementById("cvyear"), cvyear[major_s], 3);
});
//===============================================================================
cvyearInput.addEventListener('keyup', function (e) {
    cvyearInput.value = cvyearInput.value.toUpperCase();
    cvyear_s = cvyearInput.value;
    if (college_s != "" && faculty_s != "" && major_s != "" && cvyear_s != "") {
        checkData();
    }
});
//===============================================================================
function validate() {
    if(!modifyCurriculum) {
        alert('Creating new curriculum!');
        return true;
    }
    else 
        return confirm('Do you really want to modify this subject?');
}

function checkData() {
    const pathtodb = "BOLIVIA/" + college_s + '/' + faculty_s + '/' + major_s + '/' + cvyear_s;
    const curriculum = db.collection(pathtodb);
    curriculum.get()
        .then((docSnapshot) => {
            let exists = "";
            var submitButton = document.getElementById("contact-submit");
            docSnapshot.forEach(doc => {
                exists = doc.id;
            });
            if (exists != "") {
                console.log("Existe, existe!!!");
                submitButton.style.backgroundColor = "rgb(247,181,16)"; 
                submitButton.innerText = "Modify existent curriculum...";
                modifyCurriculum = true;
                modifyInput.value = true;
            } else {
                console.log("No existe, no existe!!!");
                submitButton.style.backgroundColor = "#6DA2D9"; 
                submitButton.innerText = "Create new curriculum...";
                modifyCurriculum = false;
                modifyInput.value = false;
            }
        });
}