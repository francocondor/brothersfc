// Initialize Firebase
var config = {
    apiKey: "AIzaSyADHuP77OrL75fYe0mZ1TBZFCyVJp3HkGk",
    authDomain: "first-fc.firebaseapp.com",
    databaseURL: "https://first-fc.firebaseio.com",
    projectId: "first-fc",
    storageBucket: "first-fc.appspot.com",
    messagingSenderId: "159330438742"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = "main.html";
      // User is signed in.
    }
});


var provider = new firebase.auth.GoogleAuthProvider();
var providerFb = new firebase.auth.FacebookAuthProvider();

$('#btn-google').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            guardarDatos(result.user);
            // window.location.href = "main.html";
            // $('#login_div').hide();
            // $('#chat').show();
        });
});

$('#btn-facebook').click(function () {
    firebase.auth()
        .signInWithPopup(providerFb)
        .then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        });
});

function guardarDatos(user) {
    // console.log(user);
    // console.log(user.photoURL);
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        // foto: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
        foto: user.photoURL,
        email: user.email
    }
    // console.log(usuario);
    firebase.database().ref("usuarios/" + user.uid).set(usuario)
}