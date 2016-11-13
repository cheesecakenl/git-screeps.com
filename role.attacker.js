var roleAttacker = {
    run: function(creep) {
	    //creep.say('defending');
        creep.moveTo(creep.room.controller);
	}
};

module.exports = roleAttacker;