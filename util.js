var exports = module.exports = {};


/* -----------------------------------
--------- ARRAY STUFF  ---------------
------------------------------------*/

exports.inArray = function(needle, haystack) {
	var length = haystack.length;
		for (var i = 0; i < length; i++) {
			if (haystack[i] == needle)
				return true;
			}
			return false;
}
/* -----------------------------------
--------- Object STUFF  ---------------
------------------------------------*/
exports.isEmpty = function(obj) { 
	
	for(var key in obj) { 

		if(obj. hasOwnProperty(key)) return false;
	
	} 
	
	return true; 
}
/* -----------------------------------
--------- DATABASE STUFF  ----------
------------------------------------*/

exports.addToDatabase = function (steamID, method){
	// This function does alot more than just 'AddToDatabase' - This really should be refactored
	user.getPersonas([steamID], (personas) => {				
	
		var gamePlayed = personas[steamID].game_played_app_id
		var playerName = personas[steamID].player_name
						
		if(gamePlayed == "730"){
			
			// If they're in CS:GO lets get their rank
			csgo.requestPlayersProfile(steamID, function(profile)  {	
			
				if(method == "insert") {
					
					// We'll pass insert if we've no record of the steamID in our database
					db.insert({  steamID: steamID.toString(), rank: profile.ranking.rankId, time: +new Date() });
					console.log( playerName + " ( " + steamID.toString() + " ) is rank " + mmRanks[profile.ranking.rankId] + ". This has been added to our database")
				
				}else if(method == "update") {
					
					// We'll pass update if we've already got a record but we want to amend it
					player = { rank: profile.ranking.rankId, time: +new Date() }
					db.update({ steamID: steamID.toString() }, { $set: {  rank: profile.ranking.rankId , time: + new Date() }}, {}, function(err, numReplaced) { 
					
					if(err) {
						
						console.log(err)
						
					}else{
						console.log( playerName + " ( " + steamID.toString() + " ) is rank " + mmRanks[profile.ranking.rankId] + ". This has been updated")
					}
					})
				
				}				
			
			})				    					
		
		}					
	
	})
// 6 Closing Braces??? Refactor me please!!111
} 


/* -----------------------------------
--------- TIME STUFF  ---------------
------------------------------------*/

exports.waitSeconds = function(iMilliSeconds) {
	
    var counter= 0
        , start = new Date().getTime()
        , end = 0;
    while (counter < iMilliSeconds) {
		
        end = new Date().getTime();
        counter = end - start;
    
	}
	
}
exports.getDateTime = function(timestamp) {
	var date = new Date(timestamp);

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "/" + month + "/" + year + " - " + hour + ":" + min + ":" + sec;

}
exports.treatAsUTC = function(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}
exports.daysBetween = function(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (exports.treatAsUTC(endDate) - exports.treatAsUTC(startDate)) / millisecondsPerDay;
}


/* -----------------------------------
--------- GROUP STUFF ---------------
------------------------------------*/

exports.addToGroup = function(steamID, groupToAdd) {
					user.inviteToGroup(steamID, groupToAdd)
					console.log(steamID  + " has been invited too group " + groupToAdd)
}
exports.cleanUpGroup = function(steamID, rank) {
			if(!exports.inArray(steamID, membersToExclude)){
				
					if(exports.inArray(steamID, leMembers) && (rank < 15 || !exports.inArray(steamID,mainGroup)) ){
						// If they're in the LE group and their ranks below LE kick 'em
						community.kickGroupMember(groupsToInvite['le'], steamID, function(err) { 
							if(err){
								console.log(err)
							}else{
								console.log(steamID + " Kicked from LE")
							}
						})
					}
					if(exports.inArray(steamID, mgMembers) && (((rank  > 14 || rank < 11  )) || !exports.inArray(steamID,mainGroup))){
						community.kickGroupMember(groupsToInvite['mgs'], steamID, function(err) { 
							if(err){
								console.log(err)
							}else{
								console.log(steamID + " Kicked from LE")
							}
						})
					 // If they're in the MG group and their rank is greater than 14 or below 11  kick em
					}
					if(exports.inArray(steamID, novaMembers) && ((rank > 10 || rank <  7 ) || !exports.inArray(steamID,mainGroup))){
						community.kickGroupMember(groupsToInvite['novas'], steamID, function(err) { 
							if(err){
								console.log(err)
							}else{
								console.log(steamID + " Kicked from Novas")
							}
						})
					// If they're in the nova group and their ranks is greater  than 10 or less than 6
					}
					if(exports.inArray(steamID, silverMembers) && (rank > 6 || !exports.inArray(steamID,mainGroup)) ){
						community.kickGroupMember(groupsToInvite['silvers'], steamID, function(err) { 
							if(err){
								console.log(err)
							}else{
								console.log(steamID + " Kicked from Silvers")
							}
						})
						// if their ranks greater than 6 they shouldn't be a silver
						
					}
				//	exports.waitSeconds(timeToWait)
			}
}
exports.sendGroupInvites = function(callBackCount) {
	
			if(callBackCount < 5){
				setTimeout(exports.sendGroupInvites, 1000) // If we haven't got all our callbacks from our Group checks, kick the function off again in a second
				return
		
			}else{
		
				db.find({}, function (err, records) { 
						
						if(err) console.log(err)
						
						for(member = 0; member <= records.length-1; member++) {
							
							// exports.waitSeconds("1")
							if(!exports.inArray(records[member].steamID, mainGroup)){
							
								exports.cleanUpGroup(records[member].steamID, records[member].rank)
								db.remove({ steamID: records[member].steamID }, { multi: true }, function (err, numRemoved) {
							
									if(err){
										console.log(err)
									}else{
										console.log("Non-member  dropped" + numRemoved + " documents have been removed associated with them")	
									}
									
								})
								
							}else{	
							
								if(records[member].rank > 14 && !exports.inArray(records[member].steamID, leMembers)){
									
						
									exports.addToGroup(records[member].steamID, groupsToInvite['le'])
									
								}else if(records[member].rank <= 14 && records[member].rank > 10 && !exports.inArray(records[member].steamID, mgMembers)){ 
												
									exports.addToGroup(records[member].steamID, groupsToInvite['mgs'])
									// invite to the MG group
					
								}else if(records[member].rank <= 10 && records[member].rank > 6 && !exports.inArray(records[member].steamID, novaMembers)){
							
									exports.addToGroup(records[member].steamID, groupsToInvite['novas'])
									// invite to the Nova group
					
								}else if(records[member].rank  <= 6 && !exports.inArray(records[member].steamID, silverMembers)){
						
									exports.addToGroup(records[member].steamID, groupsToInvite['silvers'])
									// invite to the Silver Group 
				
								}else{
						
									console.log(records[member].steamID + " is already in the correct group")
							
								}
								
								exports.cleanUpGroup(records[member].steamID, records[member].rank)
							
							}
							
						}
				})
			}
			
}