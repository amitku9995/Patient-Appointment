var config = {
    apiKey: "AIzaSyChMzQN74af6PKYlEpBWsinXgqvonmtLzA",
    authDomain: "miniproject-6e84e.firebaseapp.com",
    databaseURL: "https://miniproject-6e84e.firebaseio.com",
    projectId: "miniproject-6e84e",
    storageBucket: "miniproject-6e84e.appspot.com",
    messagingSenderId: "310817447988"
  };
  firebase.initializeApp(config);

var db=firebase.firestore();






function assistantLogin(){
	
	
	var user=document.getElementById("assistant_username").value;
	var password=document.getElementById("assistant_password").value;
	
	
	
	
	
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
				window.location.href="AssistantDashboard.html";
			}
			
				
	});
	});
	
	
	
}


function login(){
	
	var x = localStorage['name'];
	
	var gender = localStorage['gender'];
	
	var head=document.getElementById("assistant_heading");
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
	
	window.location.replace("AssLogin.html");

}




