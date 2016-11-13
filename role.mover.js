var roleMover = {
    
    run: function(creep) {
        
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
	    } else {
	        creep.memory.full = false;
	    }
	    
        // scan containers
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy > 0 && structure.store.energy < structure.store.storeCapacity;
            }
        });
        
        if (containers.length > 0) {
            creep.memory.containerAvailable = true;
        } else {
            creep.memory.containerAvailable = false;
        }
        
        if (creep.memory.containerAvailable && !creep.memory.full) {
            if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }    
        }
        
        // when empty go harvest
        if (!creep.memory.containerAvailable && !creep.memory.full) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }   
        }
        
        // bring to spawn or extension
        if (!creep.memory.containerAvailable && creep.memory.full) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            
            if (targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    creep.memory.full = false;
                }
            }
        }
	}
};

module.exports = roleMover;