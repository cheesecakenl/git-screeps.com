var utilStructure = require('util.structure');

var roleBuilder = {
    run: function (creep) {
        // default behaviour
        if (!creep.memory.gettingEnergy && !creep.memory.building) {
            creep.memory.gettingEnergy = true;

            creep.say('B < E');
        }
        if (!creep.memory.gettingEnergy && creep.carry.energy == 0) {
            creep.memory.gettingEnergy = true;
            creep.memory.building = false;

            creep.say('B < E');
        }
        if (creep.memory.gettingEnergy && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gettingEnergy = false;
            creep.memory.building = true;

            creep.say('Building');
        }

        if (creep.memory.building) {
            var targets = utilStructure.findConstructionSites(creep);
            if (targets.length > 0) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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

module.exports = roleBuilder;