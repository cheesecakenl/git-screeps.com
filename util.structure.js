var utilStructure = {

    createExtension: function (spawnName, x, y) {
        Game.spawns[spawnName].room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
    },

    findEnergySources: function () {
        return creep.room.find(FIND_SOURCES);
    },

    findDropOffPoints: function () {

    }
};

module.exports = utilStructure;