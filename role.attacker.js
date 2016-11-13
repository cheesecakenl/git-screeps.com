var roleAttacker = {
    run: function(creep) {
        // default behaviour
        if (!creep.memory.defending) {
            creep.memory.defending = true;

            creep.say('Defending');
        }

        if (creep.memory.defending) {
            creep.moveTo(creep.room.controller);
        }
	}
};

module.exports = roleAttacker;