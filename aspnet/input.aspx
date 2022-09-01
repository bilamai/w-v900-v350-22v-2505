<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="input.aspx.cs" Inherits="aspnet.input" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Input</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="ui/jqx/css/jqx.base.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="ui/jqx/css/jqx.bootstrap.css" rel="stylesheet" type="text/css" media="all"/>
    
    <script type="text/javascript" src="ui/jqx/script/jquery-1.12.4.min.js"></script>
    
    <script type="text/javascript" src="ui/jqx/js/jqxcore.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdata.js"></script>
  
    <script type="text/javascript" src="ui/jqx/js/jqxbuttons.js"></script>
    <script ype="text/javascript" src="ui/jqx/js/jqxlistbox.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdropdownbutton.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxinput.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxnumberinput.js"></script>

    <script type="text/javascript" src="ui/jqx/js/jqxcalendar.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxcheckbox.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxradiobutton.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxcombobox.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxscrollbar.js"></script>

     <script type="text/javascript" src="ui/jqx/globalization/globalize.js"></script>
    <script type="text/javascript" src="ui/jqx/globalization/globalize.culture.de-DE.js"></script>
    <script type="text/javascript" src="bases/configs/global.js"></script> 
      
    
    <script>
        var connectString = "Data Source=wnl;Initial Catalog=eldb;User ID=sa;Password=Sa12345@";

        function f_load() {
            $("#demo .content").remove();
            $('#demo').append('<div class="content" />');
           $('#demo .content').load('apps/input.html');
        }

        
        $(document).ready(function () {
            f_load();

        });

       
    </script>
</head>
<body>
       <form id="form1" runat="server">
        
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
             <Services>
                 <asp:ServiceReference Path="~/services/shares/mas.svc" />

            </Services>
        </asp:ScriptManager>

        <div>
            <h1>Widget Data Input</h1>
        </div>
        
         <div id="demo">
               <div class="content">

               </div>
         </div>

        
    </form>
</body>
</html>
