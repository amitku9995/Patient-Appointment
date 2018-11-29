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


var d = new Date();
var i=1;


var xmarq=document.getElementById("marq");
db.collection("patient").orderBy("time")
    .onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            if (change.type === "added"  ) {
				var sft=change.doc.data().shift;
				var status=change.doc.data().Status;
				var date=change.doc.data().date.getDate();
				var month=change.doc.data().date.getMonth();
				var year=change.doc.data().date.getFullYear();
				var tm=d.getHours();
				
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="morning" && tm<=13 ){
				
					if(status==1){
						xmarq.innerHTML="<b>Current Patient: "+x+"</b>";
				
					}
					else{
						i++;
					}
				
                }
				
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="evening" && tm>13 ){
					if(status==1){
				xmarq.innerHTML="<b>Current Patient: "+i+++"</b>";
				
					}
					else{
						i++;
					}
					
                }
				
            }
			
			
			
			
			if ( change.type === "modified") {
				var rowvalue = localStorage['valueupadte'];
				
				var sft=change.doc.data().shift;
				var status=change.doc.data().Status;
				var date=change.doc.data().date.getDate();
				var month=change.doc.data().date.getMonth();
				var year=change.doc.data().date.getFullYear();
				var tm=d.getHours();
				
				
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="morning" && tm<=13 ){
				if(status==1){
					xmarq.innerHTML="<b>Current Patient: "+rowvalue+"</b>";
					}
					
				
                }
				
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="evening" && tm>13 ){
					if(status==1){
				
				
				xmarq.innerHTML="<b>Current Patient: "+rowvalue+"</b>";

					}
					
                }
				
				
            }
					
	});
	});
	
			
			