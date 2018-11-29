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


var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


  
    function myfun(){
    
  var x=document.getElementById("name").value;
  var mob=document.getElementById("mob").value;
  var dat=document.getElementById("datepicker2").value;
  var d=new Date();
  var t=new Date(d.toLocaleString());
  var dt=new Date(dat);
  var phoneRGEX = /[789][0-9]{9}/;
  var r=confirm("Name : "+x+"\nMobile Number : "+mob);
  if(r==true){
  
  if(phoneRGEX.test(mob) && mob.length==10){
  localStorage.setItem( 'name', x );
  localStorage.setItem( 'mobile', mob );
  localStorage.setItem( 'time', dt );
  var sft = document.querySelector('input[name="shift"]:checked').value;
db.collection("patient").add({
    Name: x,
	Mobile: mob,
	time: t,
	Status: 0,
	shift: sft,
	date: dt
	
    
})
.then(function(docRef) {
	alert("Thank You your Appointment is successfully register. ");
    console.log("Document written with ID: ", docRef.id);
	window.location.href="thank.html";
	
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  }
  else{
	  alert("Enter valid Mobile Number");
  }
  }
  }
  
function mynum(){
	
	var x = localStorage['name'];
	localStorage.removeItem( 'name' );
	var w = localStorage['mobile'];
	localStorage.removeItem( 'mobile' );
	var tm = localStorage['time'];
	localStorage.removeItem( 'time' );
	var t=new Date(tm);
	
	var i=0,j=0;
	var y=document.getElementById("numb");
	db.collection("patient").orderBy("time")
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var date=doc.data().date.getDate();
				var month=doc.data().date.getMonth();
				var year=doc.data().date.getYear();
				var sft=doc.data().shift;
				if(date==t.getDate() && month==t.getMonth() && year==t.getYear()&& sft=="evening"){
				i++;
				y.innerHTML="Your Appointment number is "+i;
                }
				if(date==t.getDate() && month==t.getMonth() && year==t.getYear()&& sft=="morning"){
				j++;
				y.innerHTML="Your Appointment number is "+j;
                }
				
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
	
}
/*Get Week Number*/
function getWeekNumber(d) {
    
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    
    return [d.getUTCFullYear(), weekNo];
}

/*end week number*/


/*Last Sven*/
function last7(){
	var i=0,j=0;
	
	var y=document.getElementById("tab");
	var head=document.getElementById("head");
	head.style.visibility="hidden";
	y.style.display="none";
	var t1=document.getElementById("tab1");
	t1.style.visibility="visible";
	while(t1.rows.length > 0) {
		t1.deleteRow(0);
	}
	
	
	var todayweek = getWeekNumber(new Date());
	
	
	
	var d = new Date();
  t1.innerHTML="<tr style=background:#2bc9ff><th>Date</th><th>Name</th><th>Mobile</th><th>Shift</th></tr>";
  db.collection("patient").orderBy("time")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
			var lastweek=getWeekNumber(doc.data().date);
            var date=doc.data().date.getDate();
				var month=doc.data().date.getMonth();
				var year=doc.data().date.getFullYear();
				if(todayweek[1]-lastweek[1]==0 || todayweek[1]-lastweek[1]==1){
					
				if( doc.data().Status==0){
					
					i++;
				t1.innerHTML+="<tr style=background:#324DFF;color:white><td>"+date+"/"+month+"/"+year+"</td><td>"+doc.data().Name+"</td><td>"+doc.data().Mobile+"</td><td >"+doc.data().shift+"</td></tr>";
				}
				else if( doc.data().Status==1){
					j++;
				t1.innerHTML+="<tr style=background:#3AFF2D;><td>"+date+"/"+month+"/"+year+"</td><td>"+doc.data().Name+"</td><td>"+doc.data().Mobile+"</td><td >"+doc.data().shift+"</td></tr>";
				}
				
				

                }
				head.innerHTML="Patient Status: &nbsp;&nbsp;&nbsp;&nbsp;Absent "+i+"&nbsp;&nbsp;"+"Present "+j;
				head.style.visibility="visible";
				
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
	
	
	
  }
	

/*end last seven*/
  
  
function myFunction(){
	var y=document.getElementById("tab");
	var head=document.getElementById("head");
	head.style.visibility="hidden";
	y.style.display="none";
	var t1=document.getElementById("tab1");
	t1.style.visibility="visible";
	while(t1.rows.length > 0) {
		t1.deleteRow(0);
	}
	var name=document.getElementById("search").value;
	if(name==""){
		alert("Enter Patient Name");
	}
	var todayweek = getWeekNumber(new Date());
	
	
	
	var d = new Date();
  t1.innerHTML="<tr style=background:#2bc9ff><th>Date</th><th>Name</th><th>Mobile</th><th>Shift</th></tr>";
  db.collection("patient").orderBy("time")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
			var lastweek=getWeekNumber(doc.data().date);
            var date=doc.data().date.getDate();
				var month=doc.data().date.getMonth();
				var year=doc.data().date.getFullYear();
				if(todayweek[1]-lastweek[1]==0 || todayweek[1]-lastweek[1]==1){
					
				if(name==doc.data().Name&& doc.data().Status==0){
					
					
				t1.innerHTML+="<tr style=background:#324DFF;color:white><td>"+date+"/"+month+"/"+year+"</td><td>"+doc.data().Name+"</td><td>"+doc.data().Mobile+"</td><td >"+doc.data().shift+"</td></tr>";
				}
				else if(name==doc.data().Name&& doc.data().Status==1){
					
				t1.innerHTML+="<tr style=background:#3AFF2D;><td>"+date+"/"+month+"/"+year+"</td><td>"+doc.data().Name+"</td><td>"+doc.data().Mobile+"</td><td >"+doc.data().shift+"</td></tr>";
				}
				
				

                }
				
				
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  
  
  function m(){

var i=0,j=0;
var d = new Date();
var y=document.getElementById("marq");

db.collection("patient").orderBy("time")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
				
				var date=doc.data().date.getDate();
				var month=doc.data().date.getMonth();
				var status=doc.data().Status;
				var sft=doc.data().shift;
				var year=doc.data().date.getFullYear();
				var tm=d.getHours();
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="evening" && tm>13 ){
					
				if(status==1){
				
				++i;
				i+=j;

					}
					else{
						++j;
					}
					y.innerHTML="<p style=color:white>Current Patient Number "+(i)+"</p>";
		}

		if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="morning" && tm<13 ){
					
				if(status==1){
				y.innerHTML="<p style=color:white>Current Patient Number "+i+"</p>";
				i++;
					}
		}

});
});
setTimeout(function() {
  location.reload();
}, 500000);

}

  
  
  
  
  
  function mystatus(){
  
  var x=document.getElementById("pformname").value;
  var m=document.getElementById("pformmob").value;
  localStorage.setItem( 'name', x );
  localStorage.setItem( 'mobile', m );
  window.location.href="status.html";
  }
  
  
  function patientstatus(){
	
	var x = localStorage['name'];
	localStorage.removeItem( 'name' );
	var m = localStorage['mobile'];
	localStorage.removeItem( 'mobile' );
	var y=document.getElementById("pname");
	var y1=document.getElementById("pmob");
	var tab=document.getElementById("ptab");
	y.innerHTML="Patient Name : "+x;
	y1.innerHTML="Patient Mobile : "+m;
	db.collection("patient").orderBy("time")
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
				var date=doc.data().date.getDate();
				var nm=doc.data().Name;
				var mb=doc.data().Mobile;
				var month=doc.data().date.getMonth();
				month=month+1;
				var year=doc.data().date.getFullYear();
				var dt=date+"/"+month+"/"+year;
				var st=doc.data().Status;
				
				if(st==1 && nm==x && m==mb){
				tab.innerHTML+="<tr><td>"+dt+"</td><td>"+doc.data().shift+"</td><td>success</td></tr>";
				}
				else if(st==0 && nm==x && m==mb){
					tab.innerHTML+="<tr><td>"+dt+"</td><td>"+doc.data().shift+"</td><td>Pending</td></tr>";
				}
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
	
}




    function patientbycompounder(){
    
  var x=document.getElementById("name").value;
  var mob=document.getElementById("mob").value;
  var d=new Date();
  var t=new Date(d.toLocaleString());
  var phoneRGEX = /[6789][0-9]{9}/;
  var r=confirm("Name : "+x+"\nMobile Number : "+mob);
  if(r==true){
  if(phoneRGEX.test(mob) && mob.length==10){
  var sft = document.querySelector('input[name="shift"]:checked').value;
db.collection("patient").add({
    Name: x,
	Mobile: mob,
	time: t,
	Status: 0,
	shift: sft,
	date: t
	
    
})
.then(function(docRef) {
	alert("Thank You, your Appointment is successfully register. ");
    console.log("Document written with ID: ", docRef.id);
	window.location.href="AssistantDashboard.html";
	
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  }
  else{
	  alert("Enter valid Mobile Number");
  }
  }
  }



  
  var rowvalue;
  function addRowHandlers() {
  var table = document.getElementById("tab");

  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
      return function() {
		  var cell = row.getElementsByTagName("td")[0];
		  var id = cell.innerHTML;
		  var c = row.getElementsByTagName("td")[1];
		  var idn = c.innerHTML;
		  var ccc = row.getElementsByTagName("td")[2];
		  var idnn = ccc.innerHTML;
		  var status123 = row.getElementsByTagName("td")[3];
		  var status123 = status123.innerHTML;
		  localStorage.setItem( 'valueupadte', id );
		  rowvalue=id;
		if (confirm("Serial Number : " + id+"  "+idn+"  "+idnn)) {
        
		
		  
	db.collection("patient").where("Name","==",idn).where("Mobile","==",idnn)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var da=doc.id;
			
		
		db.collection("patient").doc(da).update({
		Status: 1
		
    
})

})
	})
	
	for(i=0;i<4;i++){
	row.getElementsByTagName("td")[i].style.background = "#3AFF2D";
	}
	
	row.getElementsByTagName("td")[3].innerHTML = "Success13"
	
    } 
	
		  
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}


/*LogIn Begin*/


function assistantLogin(){
	
	var username=document.getElementById("assistant_username").value;
	alert("h");
	var user_password=document.getElementById("assistant_password").value;
	
	var head=document.getElementById("assistant_heading");
	
	db.collection("users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
				
			
			var mob=doc.data().mobile;
			
			var pass=doc.data().password;
			if(mob==username && pass==user_password){
				var gender=doc.data().gender;
				var name=doc.data().Name;
				if(gender=="male"){
					head.innerHTML="Welcome Mr. "+name;
				}
				else{
					head.innerHTML="Welcome Ms. "+name;
				}
				
				window.open("AssistantDashboard.html");
			}
			else{
				alert("Enter Valid UserName and Password");
			}
				
	});
	});
}


function mar(xmarqvalue){
	alert("hii");
	
	xmarq.innerHTML="<p>Current Patient: "+xmarqvalue+"</p>";
}





/*Login End*/

  
  
var i=1;
var d = new Date();
var y1=document.getElementById("head");
var xmarq=document.getElementById("marq");

var y=document.getElementById("tab");
var mark=document.getElementById("sp");


var cdate=document.getElementById("cdate");
var cshift=document.getElementById("cshift");
mo=d.getMonth()+1;
var j=1;

cdate.innerHTML=d.getDate()+"/"+mo+"/"+d.getFullYear();

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
				if(status==0){
				y.innerHTML+="<tr style=background:#0091FF;color:white><td>"+i+++"</td><td>"+change.doc.data().Name+"</td><td>"+change.doc.data().Mobile+"</td><td><button style='padding: 3px 35px;font-size: 24px;text-align: center;cursor: pointer;outline: none;color: #fff;background-color: #4CAF50;border: none;border-radius: 15px;'>Click</button></td></tr>";
				var m=document.getElementById("myhead");
				
				cshift.innerHTML="Shift : "+sft;
				y1.innerHTML="Total Number of patients are :  "+--i;
				
				i++;
					}
					else{
						y.innerHTML+="<tr style=background:#3AFF2D;><td>"+i+++"</td><td>"+change.doc.data().Name+"</td><td>"+change.doc.data().Mobile+"</td><td>Success</td></tr>";
				
				cshift.innerHTML="Shift : "+sft;
				y1.innerHTML="Total Number of patients are :  "+--i;
				
				i++;
				
					}
				
                }
				
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="evening" && tm>13 ){
					if(status==0){
				y.innerHTML+="<tr style=background:#324DFF;color:white><td>"+i+++"</td><td>"+change.doc.data().Name+"</td><td>"+change.doc.data().Mobile+"</td><td><button style='padding: 3px 35px;font-size: 24px;text-align: center;cursor: pointer;outline: none;color: #fff;background-color: #4CAF50;border: none;border-radius: 15px;'>Click</button></td></tr>";
				var m=document.getElementById("myhead");
				
				cshift.innerHTML="Shift : "+sft;
				y1.innerHTML="Total Number of patients are :  "+--i;
				i++;
					}
					else{
						y.innerHTML+="<tr style=background:#3AFF2D;><td>"+i+++"</td><td>"+change.doc.data().Name+"</td><td>"+change.doc.data().Mobile+"</td><td>Success</td></tr>";
				
				cshift.innerHTML="Shift : "+sft;
				y1.innerHTML="Total Number of patients are :  "+--i;
				xmarq.innerHTML="<p>Current Patient: "+i+"</p>";
				i++;
					}
                }
				
            }
			
			
			
			
			
			
			if ( change.type === "modified") {
				//var rowvalue = localStorage['valueupadte'];
				addRowHandlers();
				y.deleteRow(rowvalue);
				var sft=change.doc.data().shift;
				var status=change.doc.data().Status;
				var date=change.doc.data().date.getDate();
				var month=change.doc.data().date.getMonth();
				var year=change.doc.data().date.getFullYear();
				var tm=d.getHours();
				var row123=y.insertRow(rowvalue);
				row123.style.background = "#3AFF2D";
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="morning" && tm<=13 ){
				if(status==1){
				row123.innerHTML+="<tr style=background:#3AFF2D;><td>"+rowvalue+"</td><td>"+change.doc.data().Name+"</td><td>"+change.doc.data().Mobile+"</td><td>Success</td></tr>";
				
					}
					
				
                }
				
				if(date==d.getDate() && month==d.getMonth() && year==d.getFullYear() && sft=="evening" && tm>13 ){
					if(status==1){
				row123.innerHTML+="<tr style=background:#3AFF2D;><td>"+rowvalue+"</td><td>"+change.doc.data().Name+"</td><td>"+change.doc.data().Mobile+"</td><td>Success</td></tr>";
				
				
				xmarq.innerHTML="<p>Current Patient: "+rowvalue+"</p>";

					}
					
                }
				
				
            }
			
			
			
			
	});
	});
	
	
	 
	 
	 
