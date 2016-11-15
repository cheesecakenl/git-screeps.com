var utilEnergy = require('util.energy');

var utilSpawner = {
    spawn: function() {
        var totalEnergy = utilEnergy.totalEnergyInSpawnAndExtensions();
        var totalEnergyInContainers = utilEnergy.totalEnergyInContainers();

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

        var minHarvesters = 5;
        var minMovers = 2;
        var minBuilders = 4;
        var minFixers = 1;
        var minAttackers = 0;
        var minUpgraders = 3;
        var minClaimers = 0;

        if (harvesters.length < minHarvesters && totalEnergy >= 400) {
            totalEnergy -= 400;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'harvester'});
            console.log('Created harvester named ' + newName);
        } else if (movers.length < minMovers && totalEnergy >= 250) {
            totalEnergy -= 250;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'mover'});
            console.log('Created mover named ' + newName);
        } else if (builders.length < minBuilders && totalEnergy >= 250) {
            totalEnergy -= 250;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            console.log('Created builder named ' + newName);
        } else if (fixers.length < minFixers && totalEnergy >= 250) {
            totalEnergy -= 250;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'fixer'});
            console.log('Created fixer named ' + newName);
        } else if (attackers.length < minAttackers && totalEnergy >= 130) {
            totalEnergy -= 130;

            var newName = Game.spawns['Spawn1'].createCreep([ATTACK, MOVE], undefined, {role: 'attacker'});
            console.log('Created attacker named ' + newName);
        } else if(upgraders.length < minUpgraders && totalEnergy >= 400) {
            totalEnergy -= 400;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
            console.log('Created upgrader named ' + newName);
        } else if (claimers.length < minClaimers && totalEnergy >= 650) {
            totalEnergy -= 650;

            var newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE], undefined, {role: 'claimer'});
            console.log('Created claimer named ' + newName);
        }
    }
};

module.exports = utilSpawner;