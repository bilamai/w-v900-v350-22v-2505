var is_modeadd = true;

function date_to_save_db(arg) {
    var yy = arg.getFullYear();
    var mm = arg.getMonth() + 1;
    var dd = arg.getDate();

    return yy + "/" + mm + "/" + dd;
};

function row_lostfocus() {
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var ele = document.getElementById('table-id' + i);
        if (ele) {
            if (ele.classList.contains("selected")) {
                ele.classList.remove("selected");
            }
        }
    }
}

function onRowClick(tableId, callback) {
    var rows = table.getElementsByTagName("tr"),
        i;
    
    for (i = 1; i < rows.length; i++) {
        rows[i].onclick = function (e) {
            return function () {
                row_lostfocus();
                $(this).addClass('selected');
                callback(e);
            };
        }(rows[i]);
    }
};

var table = document.createElement("table");
table.setAttribute('id', 'my-table-id');

function init_grid() {
    var colw = [100, 350, 150]; //col width
    var coltext = ["Code", "Employee Name", "Division"]; //header text
    
    var tr = document.createElement("tr");

    table.appendChild(tr);
    for (var i = 0; i < 3; i++) {
        var th = document.createElement("th");  //col header
        th.style.width = colw[i] + "px";
        th.style.height = "30px";
        th.innerHTML = coltext[i];
        tr.appendChild(th);
    }
 
}
    
function display_data(rec) {
    var col = [];
    for (var i = 0; i < rec.length; i++) {
        for (var key in rec[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
   
    // ADD JSON DATA 
    for (var i = 0; i < rec.length; i++) {
        // tr = table.insertRow(-1);
        var tr = document.createElement("tr");  
        tr.setAttribute('id', 'table-id'+i);
        table.appendChild(tr);

        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = rec[i][col[0]];
        tabCell.style.width = "150px";
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = rec[i][col[2]];
        tabCell.style.width = "350px";
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = rec[i]["Division_name"];
        tabCell.style.width =  "300px";
              
    }

    var divContainer = document.getElementById("id-table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    onRowClick("my-table-id", function (trow) {
         var value = trow.getElementsByTagName("td")[0].innerHTML;
         //alert(value); //copy rec
         get_emp_rec(value)

    });
}

function get_emp_rec(value) {
    var svc = new mas;
    svc.get_emp_rec(connectString, value, onSuccess, onFail, null);
    function onSuccess(result) {
        if (result[0] == "*") {
            alert(result);
            return;
        }
        $("#info_mode").text("Mode: แก้ไขข้อมูล");
        is_modeadd = false;
        $("#emp_code").jqxInput({ disabled: true });

        const rec = JSON.parse(result)[0];
        copy_rec(rec);
    }

    function onFail(result) {
        alert(result);
    }
}

function get_data_emp() {
   var svc = new mas;
    svc.get_emp(connectString, onSuccess, onFail, null);
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


function new_rec() {
    $("#info_mode").text("Mode: เพิ่มข้อมูลใหม่");
    is_modeadd = true;
     
    $("#emp_code").jqxInput({ disabled: false });
    $("#emp_code").val("");
    $("#emp_name").val("");
    $("#emp_salary").val(0);
   // $("#emp_name").val("");
}
function copy_rec(rec) {
    $("#emp_code").val(rec["Emp_code"]);
    $("#emp_name").val(rec["Emp_name"]);
    $("#emp_salary").val(rec["Emp_salary"]);
    $("#emp_start").val(rec["Emp_start"]);
    $("#emp_birth").val(rec["Emp_birth"]);
    $("#rb_emp").val(rec["Emp_state"] == 'E' ? true : false);
    $("#rb_guide").val(rec["Emp_state"] == 'P' ? true : false);
    $("#emp_group").val(rec["Emp_group"]);
    $("#Division_code").val(rec["Division_code"]);
    $("#emp_entry").val(rec["Emp_entry"]  == 'Y' ? true : false);
    $("#emp_query").val(rec["Emp_query"]  == 'Y' ? true : false);
    $("#emp_status").val(rec["Emp_status"]  == 'A' ? true : false);

}

//post database
function set_data(row) {
    row["emp_code"] = $("#emp_code").val();
    row["emp_name"] = $("#emp_name").val();
    row["emp_start"] = date_to_save_db($("#emp_start").jqxDateTimeInput('value'));
    row["emp_birth"] = date_to_save_db($("#emp_birth").jqxDateTimeInput('value'));
    row["emp_salary"] = $("#emp_salary").val();
    row["emp_group"] = $("#emp_group").val();
    row["Division_code"] = $("#Division_code").val();
    row["emp_state"] = $("#rb_emp").val() == true ? 'E' : 'P';
    row["emp_query"] = $("#emp_query").val() == true ? 'Y' : 'N';
    row["emp_entry"] = $("#emp_entry").val() == true ? 'Y' : 'N';
    row["emp_status"] = $("#emp_status").val() == true ? 'A' : 'C';
}

function f_add_emp() {
    if ($("#emp_code").val().trim().length == 0) { alert('โปรดป้อน รหัส. '); return; }
    if ($("#emp_name").val().trim().length == 0) { alert('โปรดป้อน ชื่อ-เจ้าหน้าที่. '); return; }

    var row = {};
    set_data(row);
  
    var svc = new mas;
    svc.emp_insert_record(connectString, JSON.stringify(row), onSuccess, onFail, null);
    function onSuccess(result) {
        if (result != null) {
            alert(result);
            return;
        }
        alert("Add Success");
    }

    function onFail(result) {
        alert(result);
    }
}

function f_update_emp() {
    if ($("#emp_name").val().trim().length == 0) { alert('โปรดป้อน ชื่อ-เจ้าหน้าที่. '); return; }

    var row = {};
    set_data(row);

    var svc = new mas;
    svc.emp_update_record(connectString, JSON.stringify(row), onSuccess, onFail, null);
    function onSuccess(result) {
        if (result != null) {
            alert(result);
            return;
        }
        alert("Update Success");
    }

    function onFail(result) {
        alert(result);
    }
}

function f_delete_emp() {
    var svc = new mas;
    svc.emp_delete_record(connectString, $("#emp_code").val(), onSuccess, onFail, null);
    function onSuccess(result) {
        if (result != null) {
            alert(result);
            return;
        }
        alert("Delete Success");
    }

    function onFail(result) {
        alert(result);
    }
}

// initialize the input fields.
$("#emp_code").jqxInput({ minLength: 10, maxLength: 10, width: 140, height: 23 });
$("#emp_name").jqxInput({ minLength: 10, maxLength: 200, width: 200, height: 23 });
$("#emp_salary").jqxNumberInput({ width: 80, height: 24, min: 0, max: 999999, symbol: "", digits: 6, decimalDigits: 0, textAlign: 'right' }).val(0);
$("#rb_emp").jqxRadioButton({  groupName: "st", checked: true });
$("#rb_guide").jqxRadioButton({  groupName: "st", checked: false });
$("#emp_entry").jqxCheckBox({ width: 110, height: 23 }).val(false);
$("#emp_query").jqxCheckBox({ width: 120, height: 23 }).val(false);
$("#emp_status").jqxCheckBox({  width: 100, height: 23 }).val(true);
$("#emp_group").jqxNumberInput({ width: 60, height: 24, min: 0, max: 99, decimalDigits: 0, inputMode: 'simple', spinButtons: true, textAlign: 'center' }).val(1);
$("#emp_start").jqxDateTimeInput({ formatString: 'dd-MM-yyyy', width: 120, enableAbsoluteSelection: true, showCalendarButton:true, textAlign: "center" });
$("#emp_birth").jqxDateTimeInput({ formatString: 'dd-MM-yyyy', width: 100, enableAbsoluteSelection: true, showCalendarButton: false, textAlign: "center" });

function ds_division() {
    var ds =
    {
        datatype: "json",
        datafields: [
            { name: 'Division_code', type: 'string' },
            { name: 'Division_name', type: 'string' },
            { name: 'Division_status', type: 'string' },
        ],
        localdata: null
    };
    return ds;
}

function load_division() {
    var svc = new mas;
    svc.get_division(connectString, onSuccess, onFail, null);
    function onSuccess(result) {
        if (result[0] == "*") {
            alert(result);
            return;
        }
       
        var ds = new ds_division();
        ds.localdata = result;
        var dsa = new $.jqx.dataAdapter(ds);
        dsa.dataBind();
        $("#Division_code").jqxComboBox({ source: dsa, displayMember: "Division_name", valueMember: "Division_code", width: 140, height: 25, dropDownWidth: 150, dropDownHeight: 150 }).val('');
    }

    function onFail(result) {
        $("#info_mode").text("");
        alert(result);
    }
}

$("#add_button").click(function () {
    new_rec();
});
$("#open_button").click(function () {
    var divContainer = document.getElementById("id-table");
    divContainer.innerHTML = "";
    //divContainer.appendChild(table);
    init_grid();
    get_data_emp();
});

$("#save_button").click(function () {
    if (is_modeadd)
        f_add_emp();
   else
       f_update_emp();
});

$("#del_button").click(function () {
    f_delete_emp();
});

new_rec();
load_division();
init_grid();

get_data_emp();
