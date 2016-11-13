/* Spawn stuff */
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'harvester'});

/* safe mode */
Game.spawns['Spawn1'].room.controller.activateSafeMode();

/* construction site */
Game.spawns['Spawn1'].room.createConstructionSite(22, 22, STRUCTURE_TOWER );
Game.spawns['Spawn1'].room.createConstructionSite(22, 22, STRUCTURE_EXTENSION );
Game.spawns['Spawn1'].room.createConstructionSite(13, 21, STRUCTURE_CONTAINER );
	
/* Write memory */
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';
Game.creeps['Builder1'].memory.role = 'builder';

/* Filter and console */
var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
console.log('Harvesters: ' + harvesters.length);

/* Spawn based on number of harvesters */
if(harvesters.length < 2) {
	var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
	console.log('Spawning new harvester: ' + newName);
}

/* Suicide creep */
Game.creeps['Harvester1'].suicide();

/* Clear memory */
for(var name in Memory.creeps) {
	if(!Game.creeps[name]) {
		delete Memory.creeps[name];
		console.log('Clearing non-existing creep memory:', name);
	}
}

/* Towers stuff */
var tower = Game.getObjectById('afdb8a271da00ba2065726d1');
if(tower) {
	var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: (structure) => structure.hits < structure.hitsMax
	});
	if(closestDamagedStructure) {
		tower.repair(closestDamagedStructure);
	}

	var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if(closestHostile) {
		tower.attack(closestHostile);
	}
}

