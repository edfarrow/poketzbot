var config = require("./config.js")
var util = require("./util.js");
user.logOn(logOnOptions)

user.on('loggedOn', () => { 
	user.setPersona(SteamUser.Steam.EPersonaState.Online, botName)
    user.gamesPlayed([730])	
    console.log("We're logged on and we appear to be playing CS:GO")
})
user.on('webSession', function(sessionID, cookies) {
		
	community.setCookies(cookies)
	console.log("We've got our websession and set our cookies")
	console.log("Now we're gonna get our group members")
	callBackCount = 0;
		
community.getGroupMembers(groupsToInvite['maingroup'], function(error, members) { 
		if(error)
			throw error;
	
		console.log("Got Main")
		callBackCount++;
		
		return mainGroup = members
	
	});
community.getGroupMembers(groupsToInvite['silvers'], function(error, members) { 
		if(error)
			throw error;
		
		console.log("Got Silvers")
		callBackCount++;
		
		return silverMembers = members

	});
community.getGroupMembers(groupsToInvite['novas'], function(error, members) { 
		if(error)
			throw error;
		
		console.log("Got Novas")
		callBackCount++;
		
		return novaMembers = members

	});
community.getGroupMembers(groupsToInvite['mgs'], function(error, members) { 
		if(error)
			throw error;
		
		console.log("Got MGs")
		callBackCount++;
	
		return mgMembers = members

	});
community.getGroupMembers(groupsToInvite['le'], function(error, members) { 
		if(error)
			throw error;
		
		console.log("Got LE")
		callBackCount++
		
		return leMembers = members
	});

	util.sendGroupInvites(callBackCount)
	

});
