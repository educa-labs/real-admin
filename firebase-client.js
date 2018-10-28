// Firebase configuration
var config = {
    apiKey: "AIzaSyAjtsL_IYJsZuLbgPxiIcQda_uAoaWvCvE",
    authDomain: "real-7a78c.firebaseapp.com",
    databaseURL: "https://real-7a78c.firebaseio.com",
    projectId: "real-7a78c",
    storageBucket: "real-7a78c.appspot.com",
    messagingSenderId: "148709888943"
};
firebase.initializeApp(config);

var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

// Load designers
db.collection("designers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        data = doc.data();
        var tr = document.createElement("tr")
        var id = document.createElement("th")
        id.appendChild(document.createTextNode(doc.id))
        var nickname = document.createElement("td")
        nickname.append(document.createTextNode(data.nickname))
        var eMail = document.createElement("td")
        eMail.append(document.createTextNode(data.eMail))
        var instagram = document.createElement("td")
        instagram.append(document.createTextNode(data.instagram))
        tr.append(id);
        tr.append(nickname); 
        tr.append(eMail); 
        tr.append(instagram); 
        $('#designers').append(tr)
    });
});

// db.collection("designers").doc('u5ESVhRmZKWMjPtix1uI').get().then(function(doc){
//     console.log(doc.data().nickname)
// })

const uploadImage = function(){

}

const createDesigner = function(){
    const eMail = document.getElementById('emailInput').value;
    const image = "";
    const nickname = document.getElementById('nicknameInput').value;
    const instagram = document.getElementById('instagramInput').value;
    const linkedin = document.getElementById('linkedinInput').value;
    const description = document.getElementById('descriptionInput').value;
    const newDesigner = {
        eMail,
        image,
        instagram,
        linkedin,
        nickname,
        description
    }
    db.collection("designers").add(newDesigner)
    .then(()=>{
       alert("New designer added."); 
    })
    .catch(()=>{
       alert("You are not logged in."); 
    })
    console.log(newDesigner);
}


// Test authentication
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        document.getElementById('loginForm').style = 'display:none';
        document.getElementById('designersContainer').style = ''
        // ..s.
    } else {
        document.getElementById('loginForm').style = "";
        document.getElementById('designersContainer').style = 'display:none'
        // User is signed out.
        // ...
    }
  });

function login(){
    const mail = document.getElementById('mailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    firebase.auth().signInWithEmailAndPassword(mail, password).then(user => {
        alert("Bienvenid@ "+mail)
        // Get the user's ID token as it is needed to exchange for a session cookie.
        // console.log(user.getToken());
        // console.log(user);
    })
    .catch(() => {
        console.log('Credenciales invalidas')
    })
}

function logout(){
    firebase.auth().signOut().then(function() {
        console.log('SUccessfully signed out')
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
}
