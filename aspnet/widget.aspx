<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="widget.aspx.cs" Inherits="aspnet.widget" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <style>
        ul {
            margin-top: 20px;
            margin-left: 20px;
        }

        li {
            display: block;
            font-size: 14px;
            border-bottom: 1px solid transparent;
        }

        
         li:hover {
            /*background-color: #ccc;*/
            color: green;
            cursor: pointer;
            border-bottom: 1px solid #3a43de;
        }

        li:active {
            border-bottom: 1px solid #ff6a00;
        }

    </style>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="ui/jqx/css/jqx.base.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="ui/jqx/css/jqx.bootstrap.css" rel="stylesheet" type="text/css" media="all"/>
    
    <script type="text/javascript" src="ui/jqx/script/jquery-1.12.4.min.js"></script>
    
    <script type="text/javascript" src="ui/jqx/js/jqxcore.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxnavigationbar.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxmenu.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdata.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdata.export.js"></script>
    
    <script type="text/javascript" src="ui/jqx/js/jqxbuttons.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxbuttongroup.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxscrollbar.js"></script> 
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.selection.js"></script> 
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.edit.js"></script> 
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.sort.js"></script> 
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.filter.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.export.js"></script>  
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.grouping.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.columnsresize.js"></script> 
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.columnsreorder.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxgrid.aggregates.js"></script> 
    <script type="text/javascript" src="ui/jqx/js/jqxlistbox.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdropdownbutton.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxpanel.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxinput.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxnumberinput.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxcalendar.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxcheckbox.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxradiobutton.js"></script>
    <script type="text/javascript" src="ui/jqx/js/jqxcombobox.js"></script>
    
    <script>
        var connectString = "Data Source=wnl;Initial Catalog=eldb;User ID=sa;Password=Sa12345@";

        function f_read() {
            $("#demo .content").remove();
            $('#demo').append('<div class="content" />');
           $('#demo .content').load('apps/widget/list.html?v=22');
        }

        
        $(document).ready(function () {
            f_read();

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
            <h1>Widget Data Grid</h1>
        </div>
        
         <div id="demo">
               <div class="content">

               </div>
         </div>

        
    </form>
</body>
</html>
