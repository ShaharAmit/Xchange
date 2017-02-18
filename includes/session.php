<?php
if ($_GET["action"] == "getUserId"){
    session_start();
    echo $_SESSION["user_id"];
}
else if ($_GET["action"] == "setUser"){
    session_start();
    $userId = $_GET["userID"];
        if ($userId == '23456789' || $userId== '12345678'){
            $_SESSION["user_id"] = "$userId";
        }
        else{
            $_SESSION["user_id"] = "23456789";
        }
}



