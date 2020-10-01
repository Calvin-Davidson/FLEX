let apiLink = "http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam";

const Button1 = document.getElementById("activate1");
const Button2 = document.getElementById("activate2");
const Button3 = document.getElementById("activate3");


Button1.addEventListener("click", function () {
    console.log("Showing raw data")
    MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
        ClearOutput();

        document.getElementById("Information").innerHTML += JSONresponse;
    });
});

Button2.addEventListener("click", function () {
    console.log("Showing formatted data")
    MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
        ClearOutput();

        let weatherObject = JSON.parse(JSONresponse);
        let completeData = "";
        for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
            console.log(`${key}: ${value}`);
            completeData += key + " : " + value + " <br> ";
            document.getElementById("Information").innerText += key + " : " + value + "\n";
        }
    });
});

Button3.addEventListener("click", function () {
    console.log("Showing wanted data")
    MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
        ClearOutput();

        let weatherObject = JSON.parse(JSONresponse);
        document.getElementById("Information").innerText += "Plaats: " + weatherObject.liveweer[0].plaats;
        document.getElementById("Information").innerText += "\ntemperatuur : " + weatherObject.liveweer[0].temp;
        document.getElementById("Information").innerText += "\ngem-temperatuur : " + weatherObject.liveweer[0].gtemp;
        document.getElementById("Information").innerText += "\nverwachting : " + weatherObject.liveweer[0].verw;
        document.getElementById("Information").innerText += "\n\nkans op weerslag : " + weatherObject.liveweer[0].d0neerslag + "%";

        document.getElementById("plaatje").src = "iconen-weerlive/" + weatherObject.liveweer[0].image + ".png";
    });
});


function getWeather() {
    console.log(apiLink);
    MakeAjaxCall(apiLink, "GET").then(ShowWeather, errorHandler)
}

function MakeAjaxCall(url, methodType) {
    let promiseObj = new Promise(function (resolve, reject) {
        console.log(url)

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open(methodType, url, true)
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    console.log("Succesvol");
                    let serverResponse = xmlHttp.responseText;
                    console.log(serverResponse);
                    resolve(serverResponse);
                } else {
                    reject(xmlHttp);
                    console.log("er is iets fout gegaan")
                }
            } else {
                console.log("Bezig met ophalen");
            }
        }
    });
    return promiseObj;
}

function ShowWeather(JSONresponse) {
    let weatherObject = JSON.parse(JSONresponse);
    let completeData = "";
    for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
        console.log(`${key}: ${value}`);
        completeData += key + " : " + value + "<br>";
    }
}

function errorHandler(statusCode) {
    console.log("Failed with status", statusCode)
}

function ClearOutput() {
    document.getElementById("Information").innerHTML = "";
}


MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
    weatherObject = JSON.parse(JSONresponse);
    let plaats = weatherObject.liveweer[0].plaats;
    let temp = weatherObject.liveweer[0].temp;
    document.getElementById("BannerTxt").innerHTML = "Het is nu " + temp + " graden in " + plaats;
});