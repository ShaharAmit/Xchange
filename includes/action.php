<?php
include('db.php');
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $arr = array();
    if($_GET["action"] == "data") {

        $cards = $_GET["cards"];
        $cardsEnd = $cards +1;

        $stmt = $connection->prepare("SELECT * FROM tbl_users_234 WHERE I BETWEEN ? AND ?");
        $stmt->bind_param('ii', $cards, $cardsEnd);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();


    } elseif ($_GET["action"] == "count"){
        $query = "SELECT COUNT(*) FROM tbl_users_234";
        $result = mysqli_query($connection,$query);
    }

    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
    }

    header('Content-type: application/json');
    print json_encode($arr);

    mysqli_free_result($result);
    $connection->close();
}