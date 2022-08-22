
function init() {
     $("#data_list").jqxGrid(
        {
            ready: function () {
            },

            width: 500,
            height: 150,
            selectionmode: 'singlerow',
            columnsresize: true,
            sortable: true,
            columns: [
                { text: 'รหัส-ฝ่าย', datafield: 'Division_code', width: 90 },
                { text: 'ชื่อ-ฝ่าย', datafield: 'Division_name', width: 150 },
                { text: 'ใช้งาน', datafield: 'Division_status', width: 50, cellsalign: 'center' },
            ]
        });

    load_data();
}

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

function load_data() {
   
    $("#info_mode").text("Mode: กำลังอ่านข้อมูล...");
    var svc = new mas;
    svc.get_division(connectString, onSuccess, onFail, null);
    function onSuccess(result) {
        $("#info_mode").text("");
        if (result[0] == "*") {
            alert(result);
            return;
        }
        var vs = new ds_division();
        vs.localdata = result;
        var dsa = new $.jqx.dataAdapter(vs);
        dsa.dataBind();
        $("#data_list").jqxGrid({ source: dsa });
    }

    function onFail(result) {
        $("#info_mode").text("");
        alert(result);
    }
}

init();

