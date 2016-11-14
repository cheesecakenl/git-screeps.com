var utilStructure = {
    findEnergySources: function (creep) {
        var targets = creep.room.find(FIND_SOURCES);
        if (targets != undefined && targets.length > 0) {
            return targets;
        }

        return {}
    },

    findDropOffPoints: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });

        if (targets != undefined && targets.length > 0) {
            return targets;
        }

        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy < structure.storeCapacity;
            }
        });

        if (containers != undefined && containers.length > 0) {
            return containers;
        }

        return {}
    },

    findNonFullContainers: function (creep) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy < structure.storeCapacity;
            }
        });

        if (containers != undefined && containers.length > 0) {
            return containers;
        }

        return {}
    },

    findDamagedStructures: function (creep) {
        var damaged = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
            }
        });

        if (damaged != undefined && damaged.length > 0) {
            return damaged;
        }

        return {}
    },

    findStructuresWithEnergy: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && structure.energy >= 50;
            }
        });

        if (targets != undefined && targets.length > 0) {
            return targets;
        }

        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy > 0;
            }
        });

        if (containers != undefined && containers.length > 0) {
            return containers;
        }

        return {}
    },

    findConstructionSites: function (creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets != undefined && targets.length > 0) {
            return targets;
        }

        return {}
    },

    findContainersWithEnergy: function (creep) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.energy > 0;
            }
        });

        if (containers != undefined && containers.length > 0) {
            return containers;
        }

        return {}
    },

    findNonFullSpawnOrExtension: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });

        if (targets != undefined && targets.length > 0) {
            return targets;
        }

        return {}
    }
};

module.exports = utilStructure;