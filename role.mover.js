var utilStructure = require('util.structure');

var roleMover = {
    run: function (creep) {
        // default behaviour
        if (!creep.memory.gettingEnergy && !creep.memory.moving) {
            creep.memory.gettingEnergy = true;

            creep.say('M < E');
        }
        if (!creep.memory.gettingEnergy && creep.carry.energy == 0) {
            creep.memory.gettingEnergy = true;
            creep.memory.moving = false;

            creep.say('M < E');
        }
        if (creep.memory.gettingEnergy && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gettingEnergy = false;
            creep.memory.moving = true;

            creep.say('Moving');
        }

        if (creep.memory.gettingEnergy) {
            var containers = utilStructure.findContainersWithEnergy(creep);
            if (containers.length > 0) {
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
        if (creep.memory.moving) {
            var nonfull = utilStructure.findNonFullSpawnOrExtension(creep);
            if (nonfull.length > 0) {
                if (creep.transfer(nonfull[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nonfull[0]);
                }
            }
        }
    }
};

module.exports = roleMover;