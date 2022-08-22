<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="aspnet.main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Web Apps.</title>
   
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

    <%--<script src="ui/jquery-1.12.4.min.js" type="text/javascript"></script>--%>
     <script type="text/javascript" src="ui/jqx/script/jquery-1.12.4.min.js"></script>
    
    <script>
        var connectString = "Data Source=wnl;Initial Catalog=eldb;User ID=sa;Password=Sa12345@";

        function f_menu1() {
            $("#demo .content").remove();
            $('#demo').append('<div class="content" />');

            $('#demo .content').load('apps/master/division.html?v=100');
        }
        function f_menu2() {
            $("#demo .content").remove();
            $('#demo').append('<div class="content" />');

            $('#demo .content').load('apps/master/add_division.html?v=101');
        }
        function f_menu3() {
            $("#demo .content").remove();
            $('#demo').append('<div class="content" />');

            $('#demo .content').load('apps/master/update_division.html?v=102');
        }
        function f_menu4() {
            $("#demo .content").remove();
            $('#demo').append('<div class="content" />');

            $('#demo .content').load('apps/master/delete_division.html?v=103');
        }
        $(document).ready(function () {


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
            <h1>Welcome</h1>
        </div>
        <div>
            <ul>
                <li onclick="f_menu1();">List Division</li>
                <li onclick="f_menu2();" >add Division</li>
                <li  onclick="f_menu3();">Update Division</li>
                <li  onclick="f_menu4();">Delete Division</li>
            </ul>

            <div id="demo">
                <div class="content">

                </div>
            </div>

        </div>
    </form>
</body>
</html>
