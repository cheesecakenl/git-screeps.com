var utilCreep = require('util.creep');
var utilSpawner = require('util.spawner');
var utilTower = require('util.tower');

module.exports.loop = function () {
    /* Clear memory */
    utilCreep.clearMemory();

    /* Spawn */
    utilSpawner.spawn();

    /* Towers */
    utilTower.run('5828a4d713d23ac76339de6b');

    /* Creeps */
    utilCreep.run();
}