var util = require("./util.js");
var config = require("./config.js")
// If we don't call both these at the same time, stuff breaks.
user.logOn(logOnOptions)

user.on('loggedOn', () => { 
	user.setPersona(SteamUser.Steam.EPersonaState.Online, botName)
    user.gamesPlayed([730])	
    console.log("We're logged on and we appear to be playing CS:GO")
})
user.on('friendsList', () => {
	console.log("We've got our Friends List")
	friends = Object.keys(user.myFriends)
	
	group.getMembers(function(error, results) {
		if(error)	throw error;
		
		console.log("We've got our Main Groups Members")
		FriendsNotMembers = friends.diff(results).diff(membersToExclude)
		console.log("Here's a list of Friends that are not Members")
		console.log(FriendsNotMembers)

		
		if(FriendsNotMembers.length > 0) {
			
			console.log("Time to kick bots friends who have left the group")
			
			for(var i = 0; i <= FriendsNotMembers.length; i ++) {
				
				if(!util.inArray(FriendsNotMembers[i], membersToExclude)) {
				
					user.removeFriend(FriendsNotMembers[i])
					console.log(FriendsNotMembers[i]  + 'has been removed from the friendslist')
					util.waitSeconds(timeToWait) // When we've removed someone, we're going to wait a couple of seconds before doing it again

				}
			}
				
		}else{	
		
			console.log("Nothing to do, There's no one on our friends list who isn't a member")
			
		}
		
	
		MembersNotFriends = results.diff(friends).diff(membersToExclude)
		console.log("Here's a list of Members that are not Friends")
		console.log(MembersNotFriends)
		
		if(MembersNotFriends.length > 0) {
			
			console.log("Lets start sending invites")
			for(var j = 0; j < MembersNotFriends.length; j++) {
			
				user.addFriend(MembersNotFriends[j], function(error, friend) { 
			
					if(!error) {
						console.log("Friend request has been sent too " + friend + " SteamID " + MembersNotFriends[j])
					}else{
						console.log( "We attempted a friend request it failed -  " + error)
						// You can't prtint out who it failed on, the callbacks slower than the loop
	
					}				
				})
			}
			
		}
				
	

	})
})


Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) === -1;
    })
}
