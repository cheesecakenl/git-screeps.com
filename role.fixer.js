var utilStructure = require('util.structure');

var roleFixer = {
    run: function (creep) {
        // default behaviour
        if (!creep.memory.gettingEnergy && !creep.memory.repairs) {
            creep.memory.gettingEnergy = true;

            creep.say('F < E');
        }
        if (!creep.memory.gettingEnergy && creep.carry.energy == 0) {
            creep.memory.gettingEnergy = true;
            creep.memory.repairs = false;

            creep.say('F < E');
        }
        if (creep.memory.gettingEnergy && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gettingEnergy = false;
            creep.memory.repairs = true;

            creep.say('Fixing');
        }
        if (creep.memory.repairs) {
            var damaged = utilStructure.findDamagedStructures(creep);
            if (damaged.length > 0) {
                if (creep.repair(damaged[0])) {
                    creep.moveTo(damaged[0]);
                }
            } else {
                var targets = utilStructure.findDropOffPoints(creep);
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
        if (creep.memory.gettingEnergy) {
            var targets = utilStructure.findStructuresWithEnergy(creep);
            if (targets.length > 3) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                var sources = utilStructure.findEnergySources(creep);
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }
        }
    }
};

module.exports = roleFixer;