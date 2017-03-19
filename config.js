membersToExclude = ['76561198173245159', '76561197984564966', '76561198039679747', '76561198363815495','76561198005724451']  // These are people you don't want to add, remove or kick form your friends list or any of the sub groups - Admins, Staffers, Mag,  Other Bots, etc - They're ignored, everywhere.
groupsToInvite = {
	maingroup:"103582791437108197", // This is your seed group - it will contain ALL of your members
	silvers:"103582791457277310",  // These are your Members of each respective rank group
	novas:"103582791457277320",
	mgs:"103582791457277323",
	le:"103582791457277333"
	}
logOnOptions = { 
	accountName: '',
	password: ''
}
daysToUpdateRanks = 7
botName = "[SF-BOT] Rincewind" // The bots name.
databaseName = "ranks"  // The name of the flat-file, If you've been running this for a while you'll already have one.. if you want to start over - rename this.

// Don't touch anything under here -- 
Datastore = require('nedb')  // Load up our database 
db = new Datastore({filename: databaseName, autoload: true}); 

SteamUser = require('steam-user')
user = new SteamUser()

GlobalOffensive  = require('globaloffensive')
csgo = new GlobalOffensive(user)

steamGroup = require('steam-group')
group = steamGroup.fromId64(groupsToInvite['maingroup'])

SteamCommunity = require('steamcommunity')
community = new SteamCommunity();

user.on('error', function(e) {
	if(SteamUser.EResult.LogonSessionReplaced = 1){
		console.log("We've been logged in somewhere else.")
		// We've logged in elsewhere - either one of the other .js has started a new session or we logged in with  a steam client
		process.exit() // fail gracefully for our log files
	}else{
		throw e
		// If its not an error we're expecting we'll bomb out
	}
});
	
mmRanks = [  
	"UNRANKED",
	"SILVER I",
	"SILVER II",
	"SILVER III",
	"SILVER IIII",
	"SILVER ELITE",
	"SILVER ELITE MASTER",
	"GOLD NOVA I",
	"GOLD NOVA II",
	"GOLD NOVA III",
	"GOLD NOVA MASTER",
	"MASTER GUARDIAN I",
	"MASTER GUARDIAN II",
	"MASTER GUARDIAN ELITE",
	"DISTINGUISHED MASTER GUARDIAN",
	"LEGENDARY EAGLE",
	"LEGENDARY EAGLE MASTER",
	"SUPREME MASTER FIRST CLASS",
	"THE GLOBAL ELITE"
]
