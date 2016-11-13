var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    
	    if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
	    } else {
	        creep.memory.full = false;
	    }

	    if (creep.carry.energy > 0) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            // scan containers
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy > 0;
                }
            });
            
            if (containers.length > 0) {
                creep.memory.containerAvailable = true;
            } else {
                creep.memory.containerAvailable = false;
            }
            
            if (creep.memory.containerAvailable) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }    
            }
        
            // when empty go harvest
            if (!creep.memory.containerAvailable) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }   
            }
        }
	}
};

module.exports = roleUpgrader;