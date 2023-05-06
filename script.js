const ARRAY_PRICE_UBER_X = [2, 2.5, 2.2];
const WAITING_PRICE_UBER_X = 0.5;


const ARRAY_PRICE_UBER_SUV = [2.2, 2.7, 2.4];
const WAITING_PRICE_UBER_SUV = 0.7;



const ARRAY_PRICE_UBER_BLACK = [2.4, 2.9, 2.6];
const WAITING_PRICE_UBER_BLACK = 0.9;


function getEle(id) {
    return document.getElementById(id);
}


function checktypeOfCar() {
    var uberX = getEle('uberX');
    var uberSUV = getEle('uberSUV');
    var uberBlack = getEle('uberBlack');
    if (uberX.checked) {
        return 'uberX';
    } else if (uberSUV.checked) {
        return 'uberSUV';
    } else if (uberBlack.checked) {
        return 'uberBlack';
    }

}
// 3 MINUTES ++=> WAITING PRICE INCREASE
function totalWaitingPrice(waitingTime, waitingPrice) {
    var totalWaitingPrice = 0;
    if (waitingTime >= 3) {
        totalWaitingPrice = Math.round(waitingTime / 3.0) * waitingPrice;
    }
    return totalWaitingPrice;
}

function ridingPrice(numOfKm, arrayCars, waitingTime, waitingPrice) {
    var waitingPrice = totalWaitingPrice(waitingTime, waitingPrice);

    //3 Cases:

    // Calculate Km 
    if (numOfKm <= 1) {
        var ridingPrice = arrayCars[0] * numOfKm + waitingPrice;
        return ridingPrice;

    } else if (numOfKm > 1 && numOfKm <= 20) {
        var ridingPrice = arrayCars[0] * 1 + (numOfKm - 1) * arrayCars[1] + waitingPrice;
        return ridingPrice;

    } else if (numOfKm > 20) {
        var ridingPrice = arrayCars[0] * 1 + 19 * arrayCars[1] + (numOfKm - 20) * arrayCars[2] + waitingPrice;
        ridingPrice = Math.round(ridingPrice * 100) / 100;
        ridingPrice = ridingPrice.toFixed(2);
        return ridingPrice;
    }
}
function amountCharged() {
    var valueData = getValuedata();
    var numOfKm = valueData[0];
    var waitingTime = valueData[1];
    var typeOfCar = checktypeOfCar();
    var totalPrice = 0;




    switch (typeOfCar) {
        case "uberX":
            totalPrice = ridingPrice(numOfKm, ARRAY_PRICE_UBER_X, waitingTime, WAITING_PRICE_UBER_X);
            break;
        case "uberSUV":
            totalPrice = ridingPrice(numOfKm, ARRAY_PRICE_UBER_SUV, waitingTime, WAITING_PRICE_UBER_SUV);

            break;
        case "uberBlack":
            totalPrice = ridingPrice(numOfKm, ARRAY_PRICE_UBER_BLACK, waitingTime, WAITING_PRICE_UBER_BLACK);
            break;
        default:
            alert("Please choose type of car!");
    }

    return totalPrice;


}

function renderRowDetailofKm(typeOfCar, arrayKm, arrayCars, tblBody) {
    for (var i = 0; i < arrayKm.length; i++) {
        var tr = document.createElement("tr");

        var tdtypeOfCar = document.createElement("td");
        var tdgoingKm = document.createElement("td");
        var tdpriceByKm = document.createElement("td");
        var tdtotalPrice = document.createElement("td");

        tdtypeOfCar.innerHTML = typeOfCar;
        tdgoingKm.innerHTML = arrayKm[i] + "km";
        tdpriceByKm.innerHTML = arrayCars[i];
        tdtotalPrice.innerHTML = arrayKm[i] * arrayCars[i];

        tr.appendChild(tdtypeOfCar);
        tr.appendChild(tdgoingKm);
        tr.appendChild(tdpriceByKm);
        tr.appendChild(tdtotalPrice);

        tblBody.appendChild(tr);


    }
}

function renderRowWaitingtime(waitingTime, waitingPrice, tblBody) {

    var tr = document.createElement("tr");

    var tdTitle = document.createElement("td");
    var tdWaitingtime = document.createElement("td");
    var tdPricebyMinute = document.createElement("td");
    var tdTotalprice = document.createElement("td");

    tdTitle.innerHTML = "Waiting time ";
    tdWaitingtime.innerHTML = waitingTime;
    tdPricebyMinute.innerHTML = waitingPrice;
    tdTotalprice.innerHTML = totalWaitingPrice(waitingTime, waitingPrice);

    tr.appendChild(tdTitle);
    tr.appendChild(tdWaitingtime);
    tr.appendChild(tdPricebyMinute);
    tr.appendChild(tdTotalprice);

    tblBody.appendChild(tr);

}

function renderRowTotal(totalPrice, tblBody) {
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdtotalTitle = document.createElement("td");
    tdtotalTitle.setAttribute("colspan", 3);
    var tdtotalPrice = document.createElement("td");

    tdtotalTitle.innerHTML = "Amount Charged";
    tdtotalPrice.innerHTML = totalPrice;

    trTotal.appendChild(tdtotalTitle);
    trTotal.appendChild(tdtotalPrice);

    tblBody.appendChild(trTotal);
}

function printInvoice(typeOfCar, numOfKm, waitingPrice, waitingTime, arrayCars, totalPrice) {
    var tblBody = getEle("tblBody");
    var totalPrice = amountCharged();
    tblBody.innerHTML = "";

    if (numOfKm <= 1) {
        renderRowDetailofKm(typeOfCar, [1], arrayCars, tblBody);
    } else if (numOfKm > 1 && numOfKm <= 20) {
        renderRowDetailofKm(typeOfCar, [1, numOfKm - 1], arrayCars, tblBody);

    } else if (numOfKm > 20) {
        renderRowDetailofKm(typeOfCar, [1, 19, numOfKm - 20], arrayCars, tblBody);

    }

    // Waiting time
    if (waitingTime >= 3) {
        renderRowWaitingtime(waitingTime, waitingPrice, tblBody);
    }

    // AMOUNT CHARGED
    renderRowTotal(totalPrice, tblBody);
}


getEle("btnCalculate").onclick = function () {
    var printtotalPrice = getEle("printtotalPrice");
    var divtotalPrice = getEle("divtotalPrice");
    var totalPrice = amountCharged();
    divtotalPrice.style.display = "block";
    printtotalPrice.style.display = "inline-block";
    printtotalPrice.innerHTML = totalPrice;

}

getEle("printtotalPrice").style.display = "none";
getEle("divtotalPrice").style.display = "none";

getEle('btnInvoicedetail').onclick = function () {
    var valueData = getValuedata();
    var numOfKm = valueData[0];
    var waitingTime = valueData[1];
    var totalPrice = amountCharged();
    var typeOfCar = checktypeOfCar();
    switch (typeOfCar) {
        case "uberX":
            printInvoice(typeOfCar, numOfKm, WAITING_PRICE_UBER_X, waitingTime, ARRAY_PRICE_UBER_X, totalPrice)
            break;
        case "uberSUV":
            printInvoice(typeOfCar, numOfKm, WAITING_PRICE_UBER_SUV, waitingTime, ARRAY_PRICE_UBER_SUV, totalPrice)

            break;
        case "uberBlack":
            printInvoice(typeOfCar, numOfKm, WAITING_PRICE_UBER_BLACK, waitingTime, ARRAY_PRICE_UBER_BLACK, totalPrice)

            break;


    }



}


function getValuedata() {
    var valueData = [];
    var numOfKm = getEle('numOfKm').value;
    numOfKm = parseFloat(numOfKm);
    valueData.push(numOfKm);
    var waitingTime = getEle('waitingTime').value;
    waitingTime = parseFloat(waitingTime);
    valueData.push(numOfKm);
    return valueData;


}


