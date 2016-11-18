var utilStructure = require('util.structure');

var utilEnergy = {
    totalEnergyInSpawnAndExtensions: function () {
        var totalEnergy = 0;

        for (var name in Game.rooms) {
            var myRoom = Game.rooms[name];
            var energyCount = myRoom.energyAvailable;

            totalEnergy += energyCount;
        }

        return totalEnergy;
    },

    totalEnergyCapacityInSpawnAndExtensions: function () {
        var totalEnergy = 0;

        for (var name in Game.rooms) {
            var myRoom = Game.rooms[name];
            var energyCount = myRoom.energyCapacityAvailable;

            totalEnergy += energyCount;
        }

        return totalEnergy;
    },

    totalEnergyInContainers: function() {
        var total = 0;

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role == 'harvester') {
                var containers = utilStructure.findContainersWithEnergy(creep);

                for (var i in containers) {
                    var container = containers[i];

                    total += container.store.energy;
                }

                break;
            }
        }

        return total;
    }
};

module.exports = utilEnergy;