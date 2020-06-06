//API Key: S3OWN1COX84V4TCI

function invest () { //symbol, numShares){
    var symbol;
    const alphaAdvantageAPI = "S3OWN1COX84V4TCI";
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"//+alphaAdvantageAPI
    const request = new XMLHttpRequest()
    request.open("GET", url)
    request.send();
    request.onreadystatechange=(ev => console.log(request.responseText))
    // fetch(url)
    //     .then(function (response) {
    //         console.log("response" +response.json())
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         console.log(myJson.ip);
    //     })
    //     .catch(function (error) {
    //         console.log("Error: " + error);
    //     });
    // WebRequest req = HttpWebRequest.Create(url);
    // WebResponse webResponse = req.GetResponse();

}

invest("IBM", 100)

