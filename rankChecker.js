var util = require("./util.js");
var config = require("./config.js")
user.logOn(logOnOptions)
var oldSteamID
user.on('loggedOn', () => { 
	user.setPersona(SteamUser.Steam.EPersonaState.Online, botName)
    user.gamesPlayed([730])	
    console.log("We're logged on and we appear to be playing CS:GO")
})

user.on('friendsList', () => {
	var friends = Object.keys(user.myFriends);
	console.log("We've got our friends list")

})

csgo.on('connectedToGC', function(err) {
		console.log("The Game Coordinator is UP")
})

user.on('user', function(steamID, userObject){
	

	var steamIDstring = steamID.toString()
	if(steamIDstring != oldSteamID){  
	
		if(csgo.haveGCSession) {

			db.findOne({ steamID: steamIDstring }, function (err, doc) { 		
			
				if (err)
						console.log(err)		
					
				if(util.isEmpty(doc)){
						
					util.addToDatabase(steamID, "insert")
					
				}else if(util.daysBetween(doc.time, new Date()) >  daysToUpdateRanks){
						
					util.addToDatabase(steamID, "update")
					
				}else{
					console.log(steamID + " last update:  " + util.getDateTime(doc.time))
						
				}
			
			})
		}
		  
		  oldSteamID = steamIDstring

	}
	user.removeListener('user' + steamID, function(err) {
		if (err)
			console.log(err)
	})
})


