
function display_data(rec) {
    var colw = [150, 250, 50]; //col width
    var coltext = ["Code", "Division name", "Status"]; //header text
    var col = [];
    for (var i = 0; i < rec.length; i++) {
        for (var key in rec[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    
    var table = document.createElement("table");
 
   // var tr = table.insertRow(-1);                   //table row
    var tr = document.createElement("tr");      //header
    table.appendChild(tr);
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      //col header
       th.style.width = colw[i] + "px";
        th.innerHTML =  coltext[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA 
    for (var i = 0; i < rec.length; i++) {
      // tr = table.insertRow(-1);
       var tr = document.createElement("tr");      //header
        table.appendChild(tr);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = rec[i][col[j]];
        }
    }

    var divContainer = document.getElementById("id-show");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

}

function get_data_division() {
     var svc = new mas;
    svc.get_division(connectString, onSuccess, onFail, null);
    function onSuccess(result) {
        if (result[0] == "*") {
            alert(result);
            return;
        }
        const rec = JSON.parse(result);
        display_data(rec);
    }

    function onFail(result) {
        alert(result);
    }
}

get_data_division();


