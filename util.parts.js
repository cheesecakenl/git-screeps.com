var utilParts = {

    getBasicCreepParts: function(capacity) {
        var partsLevel = this.calcPartLevel(capacity);

        var arr = [];

        for (i = 0; i < partsLevel; i++) {
            arr.push(WORK, CARRY, MOVE, MOVE);
        }

        return arr;
    },

    getAttackCreepParts: function(capacity) {
        var partsLevel = this.calcPartLevel(capacity);

        var arr = [];

        for (i = 0; i < partsLevel; i++) {
            arr.push(ATTACK, MOVE);
        }

        return arr;
    },

    getClaimCreepParts: function(capacity) {
        var partsLevel = this.calcPartLevel(capacity);

        var arr = [];

        for (i = 0; i < partsLevel; i++) {
            arr.push(CLAIM, MOVE);
        }

        return arr;
    },

    calcPartLevel: function(capacity) {
        // MOVE 50
        // WORK	100
        // CARRY 50
        // ATTACK 80
        // RANGED_ATTACK 150
        // HEAL 250
        // CLAIM 600
        // TOUGH 10

        // work, carry, move, move
        // attack, move
        // claim move
        var partsLevel = Math.floor(capacity / 250);
        if (partsLevel < 1 ? 1 : partsLevel);

        return partsLevel;
    },

    calcMinEnergy: function(capacity) {
        var partsLevel = this.calcPartLevel(capacity);

        return partsLevel * 250;
    }
};

module.exports = utilParts;