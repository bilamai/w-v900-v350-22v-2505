
function f_add_division() {
    var row = {};
    row["Division_code"] = document.getElementById('code').value;
    row["Division_name"] = document.getElementById('name').value;
    row["Division_status"] = document.getElementById('status').value;
   
    var svc = new mas;
    svc.division_insert_record(connectString, JSON.stringify(row), onSuccess, onFail, null);
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