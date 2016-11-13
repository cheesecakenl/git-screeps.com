var utilStructure = require('util.structure');

var roleHarvester = {
    run: function (creep) {
        // default behaviour
        if (!creep.memory.harvesting && !creep.memory.dropOff) {
            creep.memory.harvesting = true;

            creep.say('Harvesting');
        }
        if (!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.memory.dropOff = false;

            creep.say('Harvesting');
        }
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.memory.dropOff = true;

            creep.say('Drop off');
        }
        if (creep.memory.harvesting) {
            var sources = utilStructure.findEnergySources(creep);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        if (creep.memory.dropOff) {
            var targets = utilStructure.findDropOffPoints(creep);
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;