
###### client requesting json
var requestURL = 'https://example.url';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var superHeroes = request.response;
  populateHeader(superHeroes);
  showHeroes(superHeroes);
}

###### client sending json
JSONTest = function() {

    var resultDiv = $("#resultDivContainer");

    $.ajax({
        url: "https://example.com/api/",
        type: "POST",
        data: { apiKey: "23462", method: "example", ip: "208.74.35.5" },
        dataType: "json",
        success: function (result) {
            switch (result) {
                case true:
                    processResponse(result);
                    break;
                default:
                    resultDiv.html(result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
    });
};

###### server sending json
function random(response) {
  console.log("Request handler random was called.");
  response.writeHead(200, {"Content-Type": "application/json"});
  var otherArray = ["item1", "item2"];
  var otherObject = { item1: "item1val", item2: "item2val" };
  var json = JSON.stringify({
    anObject: otherObject,
    anArray: otherArray,
    another: "item"
  });
  response.end(json);
}

###### server reading json
app.use(bodyParser.json());

app.post('/', function(request, response){
  console.log(request.body);      // your JSON
   response.send(request.body);    // echo the result back
});
