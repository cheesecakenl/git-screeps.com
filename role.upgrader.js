var utilStructure = require('util.structure');

var roleUpgrader = {
    run: function (creep) {
        // default behaviour
        if (!creep.memory.gettingEnergy && !creep.memory.upgrading) {
            creep.memory.gettingEnergy = true;

            creep.say('U < E');
        }
        if (!creep.memory.gettingEnergy && creep.carry.energy == 0) {
            creep.memory.gettingEnergy = true;
            creep.memory.upgrading = false;

            creep.say('U < E');
        }
        if (creep.memory.gettingEnergy && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gettingEnergy = false;
            creep.memory.upgrading = true;

            creep.say('Upgrading');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        if (creep.memory.gettingEnergy) {
            var containers = utilStructure.findContainersWithEnergy(creep);
            if (containers.length > 3) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
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

module.exports = roleUpgrader;