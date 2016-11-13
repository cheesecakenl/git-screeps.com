var utilEnergy = {
    totalEnergyInSpawnAndExtensions: function () {
        var totalEnergy = 0;

        for (var name in Game.rooms) {
            var myRoom = Game.rooms[name];
            var energyCount = myRoom.energyAvailable;

            totalEnergy += energyCount;
        }

        return totalEnergy;
    }
};

module.exports = utilEnergy;