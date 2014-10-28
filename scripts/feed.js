function Feed(id,type){
	this.id=id;;
	this.type=type;	
}
Feed.prototype.getID = function(){
	return this.id;
};
Feed.prototype.getType = function(){
	return this.type;
};

function TextFeed(id,text){
	this.id = id;
	this.text = text;
	this.time= new Date();
}
TextFeed.prototype = Object.create(Feed.prototype);
TextFeed.prototype.getFeed = function(){
	return this.text;
}
function URLFeed(id,url){
	this.url=url;
	this.time= new Date();
}
URLFeed.prototype = Object.create(Feed.prototype);
URLFeed.prototype.getFeed = function(){
	return this.url;
}
var feedx = [];
function addFeed(id){	
	var ele = document.getElementById(id).value;
	document.getElementById(id).value = "";	
	var feed;
	if(ele.length > 4 && (ele.substring(0,4).toUpperCase() == "HTTP" || ele.substring(0,3).toUpperCase() == "WWW")){
		if(ele.substring(0,3).toUpperCase() == "WWW") {
			ele ="http://"+ele;
		}
		feed = new URLFeed(1,ele);
	} else {
		feed = new TextFeed(1,ele);
	}
	createFeedsService(feed);
}

function deleteFeeds(id){
	deleteFeedsService(id);
}
var createFeedsService = service("CreateFeed");
var deleteFeedsService = service("DeleteFeed");
function User(userName){
	this.feeds = [];
}

function service(type){
	var currentUser=new User("Vinoth");
	var feeds = currentUser.feeds;
	var ret;
	
	if(type === "CreateFeed"){	
		ret =  function(feed){
			feeds.push(feed);			
			loadFeeds(feeds);
		};
	} else if (type === "DeleteFeed"){
			ret =  function(id){
			feeds=feedx;			
			feeds.splice(id,1);			
			loadFeeds(feeds);
		};
	} 
	return ret;
}


function getDateString(date){
	return (date.getMonth()+1) +"/"+ (date.getDate()) + "/"+(date.getFullYear()) + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() )+":"+(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM" );
}

function loadFeeds(feedsArray) 
{
	
		var feeds = feedsArray;	
		feedx=feeds;
		var img,node,inputButton;
		var myTableDiv = document.getElementById("myDynamicTable");	
		myTableDiv.innerHTML = "";	
		
		var table = document.createElement('TABLE');
		table.border='1';
		table.align ="center";
		table.setAttribute("id","one");
	   
		var tableBody = document.createElement('TBODY');
		table.appendChild(tableBody);
		 
		for(var i=0,l=feeds.length;i<l;i++){	
		   var tr = document.createElement('TR');
		   if(i%2 == 0){
			  tr.setAttribute("id", "cellone");
		   }else{
			  tr.setAttribute("id", "celltwo");
		   }
		  
		   tableBody.appendChild(tr);
		  
		   for (var j=0; j<4; j++){
			   var td = document.createElement('TD');
			   td.width='250';
				
				if(j==0)
				{	
					img = document.createElement("img");		
					img.setAttribute("src", "../images/user.jpg");
					img.setAttribute("height", "40px");
					img.setAttribute("width", "40px");
					td.appendChild(img);
				}else if(j==1){
					node = document.createElement("a");
					if(feeds[i] instanceof URLFeed){
						node.setAttribute("href", feeds[i].getFeed());		
					}
					node.setAttribute("id", "txt");
					node.innerHTML=feeds[i].getFeed();
					td.appendChild(node);
				}else if(j==2){
					td.appendChild(document.createTextNode(getDateString(feeds[i].time)));					
				}else{
				
					inputButton = document.createElement("img");		
					inputButton.setAttribute("src", "../images/delete1.jpg");
					inputButton.setAttribute("height", "50px");
					inputButton.setAttribute("width", "50px");
					inputButton.setAttribute("onclick", ("deleteFeeds("+i+")"));
				
					inputButton.id="deleteButton";
					inputButton.name="deleteButton";
					//inputButton.addEventListener("click", deleteFeeds(i));
				
					//inputButton.onclick="javascript:deleteFeeds("+i+")";				
					td.appendChild(inputButton)				
				}	   
			  
			   tr.appendChild(td);
		   }
		}
		myTableDiv.appendChild(table);
   
}

