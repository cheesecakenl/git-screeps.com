var utilEnergy = require('util.energy');

var utilSpawner = {
    spawn: function() {
        var totalEnergyInSpawnAndExtensions = utilEnergy.totalEnergyInSpawnAndExtensions();

        this.harvesters(totalEnergyInSpawnAndExtensions);
        this.movers(totalEnergyInSpawnAndExtensions);
        this.builders(totalEnergyInSpawnAndExtensions);
        this.fixers(totalEnergyInSpawnAndExtensions);
        this.attackers(totalEnergyInSpawnAndExtensions);
        this.upgraders(totalEnergyInSpawnAndExtensions);
        this.claimers(totalEnergyInSpawnAndExtensions);

        var totalEnergyInContainers = utilEnergy.totalEnergyInContainers();

        if (totalEnergyInContainers > 1000) {
            this.spawnUpgrader();
        }
    },

    spawnMover: function() {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'mover'});
        console.log('Created mover named ' + newName);
    },

    spawnUpgrader: function() {
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'upgrader'});
        console.log('Created upgrader named ' + newName);
    },

    spawnClaimer: function() {
        var newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE], undefined, {role: 'claimer'});
        console.log('Created claimer named ' + newName);
    },

    harvesters: function (totalEnergy) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (harvesters.length < 5 && totalEnergy >= 400) {
            totalEnergy -= 400;

            this.spawnMover();
        }
    },

    movers: function(totalEnergy) {
        var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
        if (movers.length < 1 && totalEnergy >= 250) {
            totalEnergy -= 250;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'mover'});
            console.log('Created mover named ' + newName);
        }
    },

    builders: function(totalEnergy) {
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < 1 && totalEnergy >= 250) {
            totalEnergy -= 250;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            console.log('Created builder named ' + newName);
        }
    },

    fixers: function(totalEnergy) {
        var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        if (fixers.length < 1 && totalEnergy >= 250) {
            totalEnergy -= 250;

            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'fixer'});
            console.log('Created fixer named ' + newName);
        }
    },

    attackers: function(totalEnergy) {
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        if (attackers.length < 0 && totalEnergy >= 130) {
            totalEnergy -= 130;

            var newName = Game.spawns['Spawn1'].createCreep([ATTACK, MOVE], undefined, {role: 'attacker'});
            console.log('Created attacker named ' + newName);
        }
    },

    upgraders: function(totalEnergy) {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < 5 && totalEnergy >= 400) {
            totalEnergy -= 400;

            this.spawnUpgrader();
        }
    },

    claimers: function(totalEnergy) {
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        if (claimers.length < 4 && totalEnergy >= 650) {
            totalEnergy -= 650;

            this.spawnClaimer();
        }
    }
};

module.exports = utilSpawner;