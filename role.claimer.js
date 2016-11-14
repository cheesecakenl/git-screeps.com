var roleClaimer = {
    run: function(creep) {
        var claimFlag = Game.flags.ClaimFlag;

        if (creep.pos.roomName === claimFlag.pos.roomName) {
            this.claim(creep);
        } else {
            creep.moveTo(claimFlag);
        }
    },

    claim: function(creep) {
        // Can attacj with 5x CLAIM
        if (creep.getActiveBodyparts(CLAIM) > 4) {
            if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                creep.say('Attacking');
            }
        } else {

            // Can only claim more rooms when corresponding Global Control Level
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                creep.say('Claiming');
            } else {
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                    creep.say('Reserving');
                }
            }
        }
    }
};

module.exports = roleClaimer;