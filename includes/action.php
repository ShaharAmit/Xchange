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
    } elseif ($_GET["action"] == "people") {
        $img = $_GET["img"];
        $imgEnd = $img +19;

        $stmt = $connection->prepare("SELECT * FROM tbl_details_234 WHERE I BETWEEN ? AND ?");
        $stmt->bind_param('ii', $img, $imgEnd);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
    }
    elseif ($_GET["action"] == "publishSell"){
        try{
        $amount = $_GET["amount"];
        $currency = $_GET["currency"];
        $time = $_GET["time"];
        $date = $_GET["date"];
        $address = $_GET["address"];
        $lat = $_GET["lat"];
        $lng = $_GET["lng"];
        $sellerId = $_GET["sellerId"];

        $stmt = $conn->prepare("INSERT INTO tbl_234_xchange_deals (deals_seller_id,deals_amount,deals_currency,deals_date,deals_time,deals_location,deals_lat,deals_lng)
                                VALUES (?,?,?,?,?,?,?,?)");
        $stmt->bind_param("sissssss", $sellerId, $amount, $currency,$date,$time,$address,$lat,$lng);

            $stmt->execute();
            echo "ok";
        }catch (Exception $e){
            echo $e->getMessage();
        }
        finally{
            $stmt->close();
        }
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