var config = {
    apiKey: "AIzaSyBKpRG3Nycwy57Dmgpf334lg0KLjhyk2zs",
    authDomain: "myfirstweb-5a295.firebaseapp.com",
    databaseURL: "https://myfirstweb-5a295.firebaseio.com",
    projectId: "myfirstweb-5a295",
    storageBucket: "",
    messagingSenderId: "15515162687"
  };
  firebase.initializeApp(config);

var db=firebase.firestore();






function DocLogin(){
	
	
	var user=document.getElementById("Doc_username").value;
	var password=document.getElementById("Doc_password").value;
	
	
	
	
	
	db.collection("users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
				
			
			var mob=doc.data().mobile;
			var gender=doc.data().gender;
				var name=doc.data().Name;
			var pass=doc.data().password;
			
			
			
			if(mob==user && pass==password ){
				var name=doc.data().Name;
			localStorage.setItem( 'name', name );
			localStorage.setItem( 'gender', gender );
				window.location.href="comp.html";
			}
			
				
	});
	});
	
	
	
}


function login(){
	
	var x = localStorage['name'];
	
	var gender = localStorage['gender'];
	
	var head=document.getElementById("doc_heading");
	if(gender=="male"){
		head.innerHTML="Welcome Mr. "+x;
	}
	else{
		head.innerHTML="Welcome Ms. "+x;
	}
				
			}
	
	



function logout(){
	
	localStorage.removeItem( 'name' );
	localStorage.removeItem( 'gender' );
	
	window.location.replace("docLogin.html");

}




