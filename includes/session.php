<?php

function logedin($userId){
    if ($userId == '23456789' || $userId== '12345678'){
        session_start();
        $_SESSION["user_id"] = "$userId";
    }
}

session_start();
$_SESSION["user_id"] = "23456789";
echo $_SESSION["user_id"];


