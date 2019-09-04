  // Your web app's Firebase configuration
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

  function onSubmit() {
    if (confirm('Esta seguro de guardar los datos (se cerrara esta ventana)?')) {
      var graph = createGraph(targets, connectors);
      var collectedData = {
        college: college,
        faculty: faculty,
        major: major,
        cvyear: cvyear,
        curriculum: graph
      };
      var jsonCollectedData = JSON.stringify(collectedData)
      input.value = jsonCollectedData;

      document.getElementById("loader").className = "loader loader-curtain is-active";

      db.doc('BOLIVIA/' + collectedData.college).set(
        JSON.parse('{"'+ collectedData.faculty +'":"' + collectedData.faculty + '"}')
      , { merge: true });
      db.doc('BOLIVIA/' + collectedData.college + '/' + collectedData.faculty + '/' + collectedData.major).set(
        JSON.parse('{"'+ collectedData.cvyear +'":"' + collectedData.cvyear + '"}')
      ,{ merge: true });


      db.collection('BOLIVIA/' + collectedData.college + '/' + collectedData.faculty + '/' + collectedData.major + '/' + collectedData.cvyear).add(collectedData.curriculum).then(function (resp) {
        document.getElementById('malla').submit();
        document.getElementById("loader").className = "loader loader-curtain";
      }).catch(function (error) {
        document.getElementById("loader").className = "loader loader-curtain";
        // alert('Ocurrio un error al subir los datos, intenta mas tarde.')
        console.error("Error writing document: ", error);
      });
    }
  }