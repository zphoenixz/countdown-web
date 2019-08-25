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
  // db.collection('ucb').get().then((snapshot) => {
  //   snapshot.docs.forEach(doc => {
  //     console.log(doc.data());
  //   });
  // });


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

      db.doc(collectedData.college + '/' + collectedData.faculty + '/' + collectedData.major + '/' +collectedData.cvyear).set(collectedData.curriculum).then(function (resp) {
        console.log(resp);

        document.getElementById('malla').submit();
        document.getElementById("loader").className = "loader loader-curtain";
      });
    }
  }