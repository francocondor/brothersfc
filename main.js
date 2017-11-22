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
    if (!user) {
        window.location.href = "index.html";
        // No user is signed in.
    } else {
        $('#user-name').html(user.displayName);
        $('#user-pic').attr('src',user.photoURL);        
        fotosContactos();
        listenerChat();
    }
});

$('#btn-cerrar-sesion').click(function () {
    firebase.auth().signOut();
});

function fotosContactos() {
    firebase.database().ref("usuarios")
        .on("child_added", function (s) {
            var user = s.val();
            $('#contactos').append("<img height='60' width='60' src='" + user.foto + "'></img>");
        })
}

function listenerChat() {
    firebase.database().ref("chat_family")
        .on("child_added", function (s) {
            var msj_bd = s.val();
            var msj_send = "friend";
            if (msj_bd.uid == firebase.auth().currentUser.uid) {
                var msj_send = "self";
            }
            $('#chat_family_fb').append(
            `<div class="chat ` + msj_send + `">
                <div class="user-photo">
                    <img class="user-photo" src="`+ msj_bd.foto + `">
                </div>
                <p class="chat-message"><strong class="primary-font">`+ msj_bd.nombre + `</strong>:`+ msj_bd.mensaje + `</p>
            </div>`);

            
            // <small class="pull-right text-muted">
            //     <span class="glyphicon glyphicon-asterisk Tiempo">
            //         `+ msj_bd.fecha + `
            //     </span>
            // </small>
        })
}

$('#btnEnviar').click(function () {
    var txtMensaje = $('#mensaje').val();
    if (firebase.auth().currentUser == null) {
        alert('No has iniciado sesión');
        return;
    }
    if (txtMensaje == null || txtMensaje.trim().length == 0) {
        alert('Debes escribir un mensaje');
        return;
    }
    var usuario_family = firebase.auth().currentUser;
    var formatofecha = new Date();
    var d = formatofecha.getUTCDate();
    var m = formatofecha.getMonth() + 1;
    var y = formatofecha.getFullYear();
    var h = formatofecha.getHours();
    var min = formatofecha.getMinutes();

    Fecha = d + "/" + m + "/" + y + " " + h + ":" + min;

    var msj = {
        uid: usuario_family.uid,
        nombre: usuario_family.displayName,
        mensaje: txtMensaje,
        foto: usuario_family.photoURL,
        fecha: Fecha
    }
    firebase.database().ref("chat_family")
        .push(msj)
        .then($('#mensaje').val(null))
});