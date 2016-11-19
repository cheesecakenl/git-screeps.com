var utilEnergy = require('util.energy');
var utilParts = require('util.parts');

var utilSpawner = {
    spawn: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        var minHarvesters = 3;
        var minMovers = 1;
        var minBuilders = 2;
        var minFixers = 0;
        var minAttackers = 0;
        var minUpgraders = 3;
        var minClaimers = 0;

        var totalEnergy = utilEnergy.totalEnergyInSpawnAndExtensions();
        var totalEnergyInContainers = utilEnergy.totalEnergyInContainers();
        var totalCapacity = utilEnergy.totalEnergyCapacityInSpawnAndExtensions();

        var minEnergy = utilParts.calcMinEnergy(totalCapacity);
        var partsLevel = utilParts.calcPartLevel(totalCapacity);

        var basicParts = utilParts.getBasicCreepParts(totalCapacity);
        var attackParts = utilParts.getAttackCreepParts(totalCapacity);
        var claimParts = utilParts.getClaimCreepParts(totalCapacity);

        if (harvesters.length < minHarvesters && totalEnergy >= minEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep(basicParts, undefined, {role: 'harvester'});
            console.log('Created harvester named ' + newName);
        } else if (movers.length < minMovers && totalEnergy >= minEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep(basicParts, undefined, {role: 'mover'});
            console.log('Created mover named ' + newName);
        } else if (builders.length < minBuilders && totalEnergy >= minEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep(basicParts, undefined, {role: 'builder'});
            console.log('Created builder named ' + newName);
        } else if (fixers.length < minFixers && totalEnergy >= minEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep(basicParts, undefined, {role: 'fixer'});
            console.log('Created fixer named ' + newName);
        } else if (attackers.length < minAttackers && totalEnergy >= minEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep(attackParts, undefined, {role: 'attacker'});
            console.log('Created attacker named ' + newName);
        } else if(upgraders.length < minUpgraders && totalEnergy >= minEnergy) {
            var newName = Game.spawns['Spawn1'].createCreep(basicParts, undefined, {role: 'upgrader'});
            console.log('Created upgrader named ' + newName);
        } else if (claimers.length < minClaimers && totalEnergy >= minEnergy + (600 * partsLevel)) {
            var newName = Game.spawns['Spawn1'].createCreep(claimParts, undefined, {role: 'claimer'});
            console.log('Created claimer named ' + newName);
        }
    }
};

module.exports = utilSpawner;