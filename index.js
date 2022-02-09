//variables
var lang = document.getElementById("lang");
var editor = document.getElementById("editor");
var console = document.getElementById("console");
var submit = document.getElementById("compile")

submit.addEventListener("click", function () {
  var code = editor.innerText;
  var id = lang.value;
  sendRequest(code, id);

});


//sending request
function sendRequest(code, id) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://codequotient.com/api/executeCode", true);

  xhr.setRequestHeader("Content-Type", "application/json");

  let data = {
    code: code,
    langId: id
  }
  xhr.send(JSON.stringify(data));
  xhr.addEventListener("load", function (e) {
    let timeInt = setTimeout(function () {
      clearTimeout(timeInt);
      let { codeId,
       error } = JSON.parse(e.target.responseText);
      if (codeId) {

        getOutput(codeId);

      }
      else {
        console.innerText = error;
      }
    }, 5000);
  });

  //getting out
  function getOutput(codeId) {

    let request = new XMLHttpRequest();

    request.open('GET', `https://codequotient.com/api/codeResult/${codeId}`);

    request.send();

    request.addEventListener('load', function (e) {
      let { data } = JSON.parse(e.target.responseText);

      let { output, errors } = JSON.parse(data);

      if (errors) {
        console.innerText = "Error: " + errors;
      } else {
        console.innerText = output;
      }

    })

  }
}

