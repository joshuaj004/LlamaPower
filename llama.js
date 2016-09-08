////////// Sounds //////////
var soundsOn = true;
var hum = new Audio('sounds/hum.mp3');
var baby = new Audio('sounds/baby.mp3');
var scream = new Audio('sounds/scream.mp3');
var fight = new Audio('sounds/fight.mp3');
var mom = new Audio('sounds/mom.mp3');
var growling = new Audio('sounds/growling.mp3');
//////////////////////////////
////////// Misc Vars /////////
var prestige = 0;
var hums = 0;
var humMultiplier = 1;
////////////////////////////
////////// Buttons /////////
var cria = {
    name: "cria",
    baseCost: 15,
    quantity: 0,
    multiplier: 0.1
}

var adolescent = {
    name: "adolescent",
    baseCost: 100,
    quantity: 0,
    multiplier: 1
}

var alpaca = {
    name: "alpaca",
    baseCost: 1100,
    quantity: 0,
    multiplier: 8
}

var llama = {
    name: "llama",
    baseCost: 12000,
    quantity: 0,
    multiplier: 47
}

var pasture = {
        name: "pasture",
        baseCost: 130000,
        quantity: 0,
        multiplier: 260
    }
    ///////////////////////////////
    ////////// Purchasing /////////
function generalBuy(item) {
    // Calculate cost of the item
    var itemCost = Math.floor(item.baseCost * Math.pow(1.15, item.quantity));
    // Check that you can afford the item
    if (hums >= itemCost) {
        if (soundsOn) {
            if (item.name == 'cria') {
                baby.play();
            } else if (item.name == 'adolescent') {
                scream.play();
            } else if (item.name == 'alpaca') {
                fight.play();
            } else if (item.name == 'llama') {
                mom.play();
            } else if (item.name == 'pasture') {
                growling.play();
            }
        }
        // Increase the quantity of the item
        item.quantity++;
        // Subtract the cost from the hums
        hums -= itemCost;
        // Adjust the shown hums
        $("#" + item.name + "s").html(item.quantity);
        // Adjust the shown items
        $("#hums").html(nFormatter(hums, 3));
    };
    // Calculate the new item cost
    nextItemCost = Math.floor(item.baseCost * Math.pow(1.15, item.quantity));
    // Display the new item cost
    $("#" + item.name + "Cost").html(nFormatter(nextItemCost, 3));
    // Handle the Hums/sec
    $("#" + item.name + "Hums").html(nFormatter(item.quantity * item.multiplier, 3));
}
/////////////////////////////
////////// Upgrades /////////
var upgrades = {
    upgrade1: false,
    upgrade2: false,
    upgrade3: false,
    upgrade4: false,
    upgrade5: false,
    upgrade6: false,
    upgrade7: false,
    upgrade8: false,
    upgrade9: false,
    upgrade10: false,
    upgrade11: false,
    upgrade12: false,
    upgrade13: false
}

function upgradeNum1(cost, reload = false) {
    if (upgradeSetter(cost, 1)) {
        upgrades.upgrade1 = true;
        humMultiplier = 2;
        rateDoubler(cria, cria.multiplier * 2);
    }
}

function upgradeNum2(cost, reload = false) {
    if (upgradeSetter(cost, 2)) {
        upgrades.upgrade2 = true;
        humMultiplier = 4;
        rateDoubler(cria, cria.multiplier * 2);
    }
}

function upgradeNum3(cost, reload = false) {
    if (upgradeSetter(cost, 3)) {
        upgrades.upgrade3 = true;
        rateDoubler(adolescent, adolescent.multiplier * 2);
    }
}

function upgradeNum4(cost, reload = false) {
    if (upgradeSetter(cost, 4)) {
        upgrades.upgrade4 = true;
        rateDoubler(adolescent, adolescent.multiplier * 2);
    }
}

function upgradeNum5(cost, reload = false) {
    if (upgradeSetter(cost, 5)) {
        upgrades.upgrade5 = true;
        humMultiplier = 8;
        rateDoubler(cria, cria.multiplier * 2);
    }
}

function upgradeNum6(cost, reload = false) {
    if (upgradeSetter(cost, 6)) {
        upgrades.upgrade6 = true;
        rateDoubler(alpaca, alpaca.multiplier * 2);
    }
}

function upgradeNum7(cost, reload = false) {
    if (upgradeSetter(cost, 7)) {
        upgrades.upgrade7 = true;
        rateDoubler(adolescent, adolescent.multiplier * 2);
    }
}

function upgradeNum8(cost, reload = false) {
    if (upgradeSetter(cost, 8)) {
        upgrades.upgrade8 = true;
        rateDoubler(alpaca, alpaca.multiplier * 2);
    }
}

function upgradeNum9(cost, reload = false) {
    if (upgradeSetter(cost, 9)) {
        upgrades.upgrade9 = true;
        humMultiplier = 16;
        rateDoubler(cria, cria.multiplier * 2);
    }
}

function upgradeNum10(cost, reload = false) {
    if (upgradeSetter(cost, 10)) {
        upgrades.upgrade10 = true;
        rateDoubler(llama, llama.multiplier * 2);
    }
}

function upgradeNum11(cost, reload = false) {
    if (upgradeSetter(cost, 11)) {
        upgrades.upgrade11 = true;
        rateDoubler(alpaca, alpaca.multiplier * 2);
    }
}

function upgradeNum12(cost, reload = false) {
    if (upgradeSetter(cost, 12)) {
        upgrades.upgrade12 = true;
        rateDoubler(llama, llama.multiplier * 2);
    }
}

function upgradeNum13(cost, reload = false) {
    if (upgradeSetter(cost, 13)) {
        upgrades.upgrade13 = true;
        rateDoubler(pasture, pasture.multiplier * 2);
    }
}

function upgradeSetter(cost, upgradeNum, reload = false) {
    if (hums >= cost || reload == true) {
        if (!reload) hums -= cost;
        upgradeBackgroundDisabler(upgradeNum);
        return true;
    }
    return false;
}

function upgradeBackgroundDisabler(number) {
    $("#upgrade" + number).addClass("gradientBackground");
    $("#upgrade" + number + "Button").prop('disabled', true);
}

function rateDoubler(item, itemMultiplier) {
    item.multiplier = itemMultiplier;
    generalRefresh(item);
}

function upgradeHandler() {
    var i = 1;
    for (var key in upgrades) {
        if (upgrades[key]) upgradeSetter(0, i, true);
        i++;
    }
}
/////////////////////////
////////// Hums /////////
function humClick(number, repetition = false) {
    if (!repetition) {
        hums += humMultiplier * number;
    } else {
        hums += number
    }
    $('#hums').html(nFormatter(hums, 3));
    $('#totalHums').html(getTotalHums());
    $('#humMultiplier').html(humMultiplier);
    document.title = nFormatter(hums, 3) + ' Hums - Llama Clicker';
    if (!repetition) {
        if (soundsOn) hum.play();
        //console.log($('#hums').html())
    }
};

function getTotalHums() {
    var tempTotal = cria.quantity * cria.multiplier + adolescent.quantity * adolescent.multiplier + alpaca.quantity * alpaca.multiplier + llama.quantity * llama.multiplier;
    return nFormatter(tempTotal, 3);
}

function calculateNextCost(item) {
    return Math.floor(item.baseCost * Math.pow(1.15, item.quantity));
}
/////////////////////////
////////// Misc /////////
function niceDecimals(number) {
    return Math.round(number * 1000000) / 1000000;
}

// http://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
function nFormatter(num, digits) {
    var si = [{
            value: 1E18,
            symbol: "E"
        }, {
            value: 1E15,
            symbol: "P"
        }, {
            value: 1E12,
            symbol: "T"
        }, {
            value: 1E9,
            symbol: "G"
        }, {
            value: 1E6,
            symbol: "M"
        }, {
            value: 1E3,
            symbol: "k"
        }],
        rx = /\.0+$|(\.[0-9]*[1-9])0+$/,
        i;
    for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, "$1");
}

function toggleSound(autoLoad = false) {
    if (!autoLoad) {
        soundsOn = !soundsOn;
    }
    if (soundsOn) {
        $("#toggleSound").attr("class", "btn btn-success");
    } else {
        $("#toggleSound").attr("class", "btn btn-danger");
    }

}
/////////////////////////////////////////////
////////// Intervals and page loads /////////
// Call this on page load for the various items
function generalRefresh(item) {
    $('#' + item.name + 's').html(nFormatter(item.quantity, 3));
    $('#' + item.name + 'Cost').html(nFormatter(calculateNextCost(item), 3));
    $('#' + item.name + 'Hums').html(nFormatter(item.quantity * item.multiplier, 3));
}

window.setInterval(function() {
    humClick(cria.multiplier * cria.quantity, true);
    humClick(adolescent.multiplier * adolescent.quantity, true);
    humClick(alpaca.multiplier * alpaca.quantity, true);
    humClick(llama.multiplier * llama.quantity, true);
    humClick(pasture.multiplier * pasture.quantity, true);
}, 1000);

window.setInterval(function() {
    saveGame(false);
}, 30000);

window.onload = function() {
        $("#success-alert").hide();
        $("#warning-alert").hide();
        var savegame = JSON.parse(localStorage.getItem("save"));
        if (typeof savegame.hums !== "undefined") hums = savegame.hums;
        if (typeof savegame.cria !== "undefined") cria = savegame.cria;
        if (typeof savegame.adolescent !== "undefined") adolescent = savegame.adolescent;
        if (typeof savegame.alpaca !== "undefined") alpaca = savegame.alpaca;
        if (typeof savegame.llama !== "undefined") llama = savegame.llama;
        if (typeof savegame.pasture !== "undefined") pasture = savegame.pasture;
        if (typeof savegame.humMultiplier !== "undefined") humMultiplier = savegame.humMultiplier;
        if (typeof savegame.prestige !== "undefined") prestige = savegame.prestige;
        if (typeof savegame.soundsOn !== "undefined") soundsOn = savegame.soundsOn;
        if (typeof savegame.upgrades !== "undefined") upgrades = savegame.upgrades;
        $("#hums").html(nFormatter(hums, 3));
        $("#humMultiplier").html(humMultiplier);
        toggleSound(true);
        upgradeHandler();
        generalRefresh(cria);
        generalRefresh(adolescent);
        generalRefresh(alpaca);
        generalRefresh(llama);
        generalRefresh(pasture);
    }
    //////////////////////////////
    ////////// Save Game /////////
function saveGame(manualSaved = true) {
    var save = {
        hums: hums,
        cria: cria,
        adolescent: adolescent,
        alpaca: alpaca,
        llama: llama,
        pasture: pasture,
        prestige: prestige,
        humMultiplier: humMultiplier,
        soundsOn: soundsOn,
        upgrades: upgrades
    }
    localStorage.setItem("save", JSON.stringify(save));
    $("#success-alert").alert();
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").slideUp(500);
    });
}

function deleteGame() {
    localStorage.removeItem("save");
    $("#warning-alert").alert();
    $("#warning-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#warning-alert").slideUp(500);
        window.location.reload()
    });
}
//////////////////////////////
