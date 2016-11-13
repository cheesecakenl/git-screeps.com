var roleFixer = {
    
    run: function(creep) {
        
        if (creep.memory.fixing && creep.carry.energy < creep.carryCapacity) {
            creep.memory.fixing = false;
	    }
	    
	    if(!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.fixing = true;
	        creep.say('fixing');
	    }
	    
	    if (creep.memory.fixing) { // fix
	        var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < 250000;
                }
            });
            
            if (containers.length > 0) {
                if (creep.repair(containers[0])) {
                    creep.moveTo(containers[0]);
                }
            }
            
	    } else { // harvest
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleFixer;