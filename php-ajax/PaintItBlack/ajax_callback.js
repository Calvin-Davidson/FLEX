let controlScript = "jsonWrite.php";
let jsonFile = "drawing.json";
let preloadJsonFile = "preload.json";

function makeAjaxCall(url, methodType) {
    let promiseObj = new Promise(function (resolve, reject) {
        console.log(url); // debug
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open(methodType, url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    console.log("xmlhttp done successfully");// debug
                    let serverResponse = xmlhttp.responseText; //server antwoord met string
                    console.log(serverResponse); // debug
                    resolve(serverResponse); // wordt via return promiseObj teruggegeven
                } else {
                    reject(xmlhttp.status);
                    console.log("xmlhttp failed"); // debug
                }
            } else {
                console.log("xmlhttp processing going on"); // debug
            }
        }
        console.log("request sent succesfully"); // debug
    });
    return promiseObj;
}

function errorHandler(statusCode) {
    console.log("failed with status", status);
}

function serverWriteJson(x, y, color) {
    console.log("Updating server map");

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

    let httplink = "http://29150.hosts2.ma-cloud.nl/PHP/PaintItBlack/PHP/jsonWrite.php?x=" + x + "&y=" + y + "&color=" + color;

    console.log(httplink);
    xmlhttp.open("POST", httplink, true)
    xmlhttp.send()
}

function serverGetJson() {
    console.log("Bezig met de map opvragen.");

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let jsonObj = JSON.parse(this.responseText);
            readJson(jsonObj);
        }
    }

    let httplink = "http://29150.hosts2.ma-cloud.nl/PHP/PaintItBlack/PHP/jsonRead.php";

    console.log(httplink);
    xmlhttp.open("POST", httplink, true)
    xmlhttp.send()
}

function preload() {

}
