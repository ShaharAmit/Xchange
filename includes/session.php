<?php
if ($_GET["action"] == "getUserId"){
    session_start();
    echo json_encode(array('id' => $_SESSION));

}
else if ($_GET["action"] == "setUser"){
    session_start();
    $userId = $_GET["userID"];
    $_SESSION["user_id"] = "$userId";
    echo json_encode(array('id' => $userId));
}



