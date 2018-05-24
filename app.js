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
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        setTimeout(function () {
            console.log('REDIRECCIONANDOOOOO.........');
            window.location.href = "main.html";
        }, 3000);
        // User is signed in.
    }
});


var provider = new firebase.auth.GoogleAuthProvider();
var providerFb = new firebase.auth.FacebookAuthProvider();
providerFb.addScope('public_profile');

// firebase.auth().signOut();
$('#btn-google').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            guardarDatos(result.user);
            // window.location.href = "main.html";
            // $('#login_div').hide();
            // $('#chat').show();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var errorEmail = error.email;
            var credential = error.credential;

            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('Es el mismo usuario');
            }
        });
});

$('#btn-facebook').click(function () {
    firebase.auth()
        .signInWithPopup(providerFb)
        .then(function (result) {
            guardarDatos(result.user);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var errorEmail = error.email;
            var credential = error.credential;
            
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('Es el mismo usuario');
            }
        });
});
console.log('He vuelto :) amigos');
function guardarDatos(user) {
    console.log(user);
    console.log('GUARDANDO DATOSSSSSSSS!');
    // console.log(user.photoURL);
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        // foto: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
        foto: user.photoURL,
        email: user.email
    }
    console.log('casiii por guardar');
    firebase.database().ref("usuarios/" + user.uid).set(usuario);
    console.log('GUARDADOOO');
}