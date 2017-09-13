let coins = 0;

let toIndia = 0;
let toAfrica = 0;
let toAsia = 0;
let toEurope = 0;
let toAmericas = 0;
let toAtlantis = 0;

let toIndiaCost = 10;
let toAfricaCost = 100;
let toAsiaCost = 1000;
let toEuropeCost = 10000;
let toAmericasCost = 100000;
let toAtlantisCost = 1000000;

let toIndiaRevenue = 2;
let toAfricaRevenue = 4;
let toAsiaRevenue = 6;
let toEuropeRevenue = 8;
let toAmericasRevenue = 10;
let toAtlantisRevenue = 12;


let work = 0.5;

let savegame = null;

try {
    savegame = JSON.parse(localStorage.getItem("save"));
} catch (error) {
    console.log(error);
}

try {
    if (typeof savegame.coins !== "undefined") coins = savegame.coins;
    document.getElementById("coins").innerHTML = accounting.formatMoney(coins);

} catch (error) {
    document.getElementById("coins").innerHTML = accounting.formatMoney(0);
    console.log(error);
}


try {
    if (typeof savegame.toIndia !== "undefined") toIndia = savegame.toIndia;
    if (typeof savegame.toAfrica !== "undefined") toAfrica = savegame.toAfrica;
    if (typeof savegame.toAsia !== "undefined") toAsia = savegame.toAsia;
    if (typeof savegame.toEurope !== "undefined") toEurope = savegame.toEurope;
    if (typeof savegame.toAmericas !== "undefined") toAmericas = savegame.toAmericas;
    if (typeof savegame.toAtlantis !== "undefined") toAtlantis = savegame.toAtlantis;

    document.getElementById("toIndia").innerHTML = toIndia;
    document.getElementById("toAfrica").innerHTML = toAfrica;
    document.getElementById("toAsia").innerHTML = toAsia;
    document.getElementById("toEurope").innerHTML = toEurope;
    document.getElementById("toAmericas").innerHTML = toAmericas;
    document.getElementById("toAtlantis").innerHTML = toAtlantis;
} catch (error) {
    console.log(error);
}

try {
    var indiaCost = Math.floor(toIndiaCost * Math.pow(1.1, toIndia));
    document.getElementById("toIndiaCost").innerHTML = accounting.formatMoney(indiaCost);
    revenueGeneration(toIndia, toIndiaRevenue, 'toIndiaRevenue');    

    var africaCost = Math.floor(toAfricaCost * Math.pow(1.1, toAfrica));
    document.getElementById("toAfricaCost").innerHTML = accounting.formatMoney(africaCost);
    revenueGeneration(toAfrica, toAfricaRevenue, 'toAfricaRevenue');

    var asiaCost = Math.floor(toAsiaCost * Math.pow(1.1, toAsia));
    document.getElementById("toAsiaCost").innerHTML = accounting.formatMoney(asiaCost);
    revenueGeneration(toAsia, toAsiaRevenue, 'toAsiaRevenue');

    var europeCost = Math.floor(toEuropeCost * Math.pow(1.1, toEurope));
    document.getElementById("toEuropeCost").innerHTML = accounting.formatMoney(europeCost);
    revenueGeneration(toEurope, toEuropeRevenue, 'toEuropeRevenue');

    var americasCost = Math.floor(toAmericasCost * Math.pow(1.1, toAmericas));
    document.getElementById("toAmericasCost").innerHTML = accounting.formatMoney(americasCost);
    revenueGeneration(toAmericas, toAmericasRevenue, 'toAmericasRevenue');

    var atlantisCost = Math.floor(toAtlantisCost * Math.pow(1.1, toIndia));
    document.getElementById("toAtlantisCost").innerHTML = accounting.formatMoney(atlantisCost);
    revenueGeneration(toAtlantis, toAtlantisRevenue, 'toAtlantisRevenue');

} catch (error) {
    console.log(error);
}

var save = {
    coins: coins,
    toIndia: toIndia,
    toAfrica: toAfrica,
    toAsia: toAsia,
    toEurope: toEurope,
    toAmericas: toAmericas,
    toAtlantis: toAtlantis
}

chart();

revenueCalculation();

// Chart

function chart() {
    var data = [{
        values: [toIndia, toAfrica, toAsia, toEurope, toAmericas, toAtlantis],
        labels: ['India', 'Africa', 'Asia', 'Europe', 'Americas', 'Atlantis'],
        type: 'pie'
    }];
    
    var layout = {
      height: 300,
      width: 400
    };

    Plotly.newPlot('chart', data, layout);
}

function coinClick(number) {
    coins = coins + number;
    document.getElementById("coins").innerHTML = accounting.formatMoney(coins);
};

function revenueGeneration(region, revenue, revenueDiv) {
        
    if ( region > 0 ) {
        new_revenue = Math.floor(revenue * Math.pow(1.1, region));    
        coins = coins + new_revenue;
    } 
    else {
        new_revenue = 0;
    }
    
    document.getElementById("coins").innerHTML = accounting.formatMoney(coins);
    document.getElementById( revenueDiv ).innerHTML = accounting.formatMoney(new_revenue);
}

function revenueCalculation(){
    var total = toIndiaRevenue + toIndiaRevenue + toAfricaRevenue + toAsiaRevenue + toEuropeRevenue + toAmericasRevenue + toAtlantisRevenue;
    document.getElementById( "revenue" ).innerHTML = accounting.formatMoney(total);
}

function expandIndia() {
    var cost = Math.floor(toIndiaCost * Math.pow(1.1, toIndia)); //works out the cost of this cursor
    if (coins >= cost) { //checks that the player can afford the cursor
        toIndia = toIndia + 1; //increases number of cursors
        coins = coins - cost; //removes the cookies spent

        document.getElementById("toIndia").innerHTML = toIndia; //updates the number of cursors for the user
        document.getElementById('coins').innerHTML = accounting.formatMoney(coins); //updates the number of cookies for the user
    };

    var nextCost = Math.floor(toIndiaCost * Math.pow(1.1, toIndia)); //works out the cost of the next cursor
    document.getElementById("toIndiaCost").innerHTML = accounting.formatMoney(nextCost); //updates the cursor cost for the user
};

function expandAfrica() {
    var cost = Math.floor(toAfricaCost * Math.pow(1.1, toAfrica)); //works out the cost of this cursor
    if (coins >= cost) { //checks that the player can afford the cursor
        toAfrica = toAfrica + 1; //increases number of cursors
        coins = coins - cost; //removes the cookies spent

        document.getElementById("toAfrica").innerHTML = toAfrica; //updates the number of cursors for the user
        document.getElementById('coins').innerHTML = accounting.formatMoney(coins); //updates the number of cookies for the user
    };

    var nextCost = Math.floor(toAfricaCost * Math.pow(1.1, toIndia)); //works out the cost of the next cursor
    document.getElementById("toAfricaCost").innerHTML = accounting.formatMoney(nextCost); //updates the cursor cost for the user
};

function expandAsia() {
    var cost = Math.floor(toAsiaCost * Math.pow(1.1, toAsia)); //works out the cost of this cursor
    if (coins >= cost) { //checks that the player can afford the cursor
        toAsia = toAsia + 1; //increases number of cursors
        coins = coins - cost; //removes the cookies spent

        document.getElementById("toAsia").innerHTML = toAsia; //updates the number of cursors for the user
        document.getElementById('coins').innerHTML = accounting.formatMoney(coins); //updates the number of cookies for the user
    };

    var nextCost = Math.floor(toAsiaCost * Math.pow(1.1, toAsia)); //works out the cost of the next cursor
    document.getElementById("toAsiaCost").innerHTML = accounting.formatMoney(nextCost); //updates the cursor cost for the user
};

function expandEurope() {
    var cost = Math.floor(toEuropeCost * Math.pow(1.1, toEurope)); //works out the cost of this cursor
    if (coins >= cost) { //checks that the player can afford the cursor
        toEurope = toEurope + 1; //increases number of cursors
        coins = coins - cost; //removes the cookies spent

        document.getElementById("toEurope").innerHTML = toEurope; //updates the number of cursors for the user
        document.getElementById('coins').innerHTML = accounting.formatMoney(coins); //updates the number of cookies for the user
    };

    var nextCost = Math.floor(toEuropeCost * Math.pow(1.1, toEurope)); //works out the cost of the next cursor
    document.getElementById("toEuropeCost").innerHTML = accounting.formatMoney(nextCost); //updates the cursor cost for the user
};

function expandAmericas() {
    var cost = Math.floor(toAmericasCost * Math.pow(1.1, toAmericas)); //works out the cost of this cursor
    if (coins >= cost) { //checks that the player can afford the cursor
        toAmericas = toAmericas + 1; //increases number of cursors
        coins = coins - cost; //removes the cookies spent

        document.getElementById("toAmericas").innerHTML = toAmericas; //updates the number of cursors for the user
        document.getElementById('coins').innerHTML = accounting.formatMoney(coins); //updates the number of cookies for the user
    };

    var nextCost = Math.floor(toAmericasCost * Math.pow(1.1, toAmericas)); //works out the cost of the next cursor
    document.getElementById("toAmericasCost").innerHTML = accounting.formatMoney(nextCost); //updates the cursor cost for the user
};

function expandAtlantis() {
    var cost = Math.floor(toAtlantisCost * Math.pow(1.1, toAtlantis)); //works out the cost of this cursor
    if (coins >= cost) { //checks that the player can afford the cursor
        toAtlantis = toAtlantis + 1; //increases number of cursors
        coins = coins - cost; //removes the cookies spent

        document.getElementById("toAtlantis").innerHTML = toAtlantis; //updates the number of cursors for the user
        document.getElementById('coins').innerHTML = accounting.formatMoney(coins); //updates the number of cookies for the user
    };

    var nextCost = Math.floor(toAtlantisCost * Math.pow(1.1, toAtlantis)); //works out the cost of the next cursor
    document.getElementById("toAtlantisCost").innerHTML = accounting.formatMoney(nextCost); //updates the cursor cost for the user
};

window.setInterval(function () {
    //console.log(save);

    revenueGeneration(toIndia, toIndiaRevenue, 'toIndiaRevenue');
    revenueGeneration(toAfrica, toAfricaRevenue, 'toAfricaRevenue');
    revenueGeneration(toAsia, toAsiaRevenue, 'toAsiaRevenue');
    revenueGeneration(toEurope, toEuropeRevenue, 'toEuropeRevenue');
    revenueGeneration(toAmericas, toAmericasRevenue, 'toAmericasRevenue');
    revenueGeneration(toAtlantis, toAtlantisRevenue, 'toAtlantisRevenue');


}, 5000);

window.setInterval(function () {

    //console.log("I save now");

    save = {
        coins: coins,
        toIndia: toIndia,
        toAfrica: toAfrica,
        toAsia: toAsia,
        toEurope: toEurope,
        toAmericas: toAmericas,
        toAtlantis: toAtlantis
    }

    //console.log(save);
    
    revenueCalculation();

    chart();

    localStorage.setItem("save", JSON.stringify(save));
}, 10000);
