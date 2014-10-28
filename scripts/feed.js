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
			reloadFeeds(feeds);
		};
	} else if (type === "DeleteFeed"){
			ret =  function(id){
			feeds=feedx;
			console.log(feeds);
			feeds.splice(id,1);	
			console.log(feeds);
			var myNode = document.getElementById("loadFeeds");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}			
			reloadFeeds(feeds);
		};
	} 
	return ret;
}


function reloadFeeds(feedsArray){		
	var element = document.getElementById("loadFeeds");	
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}	
	var feeds = feedsArray;	
	feedx=feeds;
	var div = document.createElement("div");	
	var emptyRow,emptyColumn,userFeed,userFeedText,userFeedDelete,userFeedDate,img,node,input,node1,index,userIcon;
		for(var i=0,l=feeds.length;i<l;i++){				
			emptyRow = getElement("div","emptyRow");
			emptyColumn = getElement("div","emptyColumn");
			userFeed = getElement("div","userFeed");
			userFeedText = getElement("div","UserFeedText");
			userFeedDelete = getElement("div","UserFeedDelete");
			userFeedDate = getElement("div","UserFeedDate");
			userIcon = getElement("div","userIcon");
			img = document.createElement("img");		
			img.setAttribute("src", "../images/user.jpg");
			img.setAttribute("height", "40px");
			img.setAttribute("width", "40px");
			userIcon.appendChild(img);
			userIcon.setAttribute("id", "img1");
			node = document.createElement("a");
			if(feeds[i] instanceof URLFeed){
				node.setAttribute("href", feeds[i].getFeed());		
			}
			node.setAttribute("id", "txt");
			node.innerHTML=feeds[i].getFeed();
			userFeedText.appendChild(node);
			input = document.createElement("input");		
			input.setAttribute("type", "button");
			input.setAttribute("onclick", ("deleteFeeds("+i+")"));
			input.setAttribute("id", "but");
			userFeedDelete.appendChild(input);
			node1 = document.createTextNode(getDateString(feeds[i].time));
			userFeedDate.appendChild(node1);
			userFeed.setAttribute("id", "feedDiv");
			userFeed.appendChild(userIcon);
			userFeed.appendChild(userFeedText);
			userFeed.appendChild(userFeedDelete);
			userFeed.appendChild(userFeedDate);
			div.appendChild(emptyRow);
			div.appendChild(emptyColumn);
			div.appendChild(userFeed);
		}
	element.appendChild(div);
}

function getElement(type,styleClass){
	var element = document.createElement(type);
	element.setAttribute("class",styleClass);
	return element;
}

function getDateString(date){
	return (date.getMonth()+1) +"/"+ (date.getDate()) + "/"+(date.getFullYear()) + " " + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() )+":"+(date.getMinutes()) + " " + (date.getHours() > 12 ? "PM" : "AM" );
}

