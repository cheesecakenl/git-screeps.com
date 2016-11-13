var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleFixer = require('role.fixer');
var roleMover = require('role.mover');

module.exports.loop = function () {
    /* Clear memory */
    for(var name in Memory.creeps) {
    	if(!Game.creeps[name]) {
    		delete Memory.creeps[name];
    	}
    }
    
    var totalEnergy = 0;
    for(var name in Game.rooms) {
        var myRoom = Game.rooms[name];
    	var energyCount = myRoom.energyAvailable;
    	
    	totalEnergy += energyCount;
    }
    
    /* Spawn */
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 3 && totalEnergy >= 550) {
        totalEnergy -= 550;
        
    	var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester'});
    	console.log('Created harvester named ' + newName);
    }
    
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    if (movers.length < 2 && totalEnergy >= 400) {
        totalEnergy -= 400;
        
    	var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'mover'});
    	console.log('Created mover named ' + newName);
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 3 && totalEnergy >= 400) {
        totalEnergy -= 400;
        
    	var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
    	console.log('Created builder named ' + newName);
    }
    
    var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
    if (fixers.length < 2 && totalEnergy >= 400) {
        totalEnergy -= 400;
        
    	var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'fixer'});
    	console.log('Created fixer named ' + newName);
    }
    
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    if (attackers.length < 2 && totalEnergy >= 130) {
        totalEnergy -= 130;
        
    	var newName = Game.spawns['Spawn1'].createCreep([ATTACK, MOVE], undefined, {role: 'attacker'});
    	console.log('Created attacker named ' + newName);
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 6 && totalEnergy >= 550) {
        totalEnergy -= 550;
        
    	var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
    	//console.log('Created upgrader named ' + newName);
    }
    
    //console.log('Harvesters: ' + harvesters.length + ', Builders: ' + builders.length + ', Upgraders: ' + upgraders.length + ' Attackers: ' + attackers.length + ' Fixers: ' + fixers.length);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
        if(creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
    }
}