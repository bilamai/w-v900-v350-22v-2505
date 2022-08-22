
function f_delete_division() {
   
    var code = document.getElementById('code').value;
  
    var svc = new mas;
    svc.division_delete_record(connectString, code, onSuccess, onFail, null);
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