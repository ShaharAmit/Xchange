<?php
include('db.php');
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $arr = array();
    if($_GET["action"] == "getDeals") {
        $cards = $_GET["cards"];
        $cardsEnd = $cards +1;
        $temp = "0";
        $stmt = $connection->prepare("SELECT *
                                      FROM tbl_234_xchange_users
                                      WHERE user_deals>?");
        $stmt->bind_param('i',$temp);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
    }
    elseif ($_GET["action"] == "sellersCount"){
        $query = "SELECT COUNT(*) 
                  FROM tbl_users_234";
        $result = mysqli_query($connection,$query);
    }
    elseif ($_GET["action"] == "getSellers") {
        $amount = $_GET["amount"];
        $currency = $_GET["currency"];
        $toDate = $_GET["toDate"];
        $fromDate = $_GET["fromDate"];
        $sortType = $_GET["sortType"];

        if ($sortType == "deals_amount"){
            $stmt = $connection->prepare("
                                      SELECT *
                                      FROM tbl_234_xchange_deals AS d
                                      JOIN tbl_234_xchange_users AS u
                                      ON   d.deals_seller_id = u.user_id
                                      WHERE (deals_currency  = ?)
                                      AND (deals_amount BETWEEN ?-20 AND ?+50)
                                      AND (deals_date BETWEEN ? AND ?)
                                      AND (deals_status = 0)
                                      ORDER BY deals_amount DESC 
                                      ");
        }
        elseif ($sortType == "user_rank"){
            $stmt = $connection->prepare("
                                      SELECT *
                                      FROM tbl_234_xchange_deals AS d
                                      JOIN tbl_234_xchange_users AS u
                                      ON   d.deals_seller_id = u.user_id
                                      WHERE (deals_currency  = ?)
                                      AND (deals_amount BETWEEN ?-20 AND ?+50)
                                      AND (deals_date BETWEEN ? AND ?)
                                      AND (deals_status = 0)
                                      ORDER BY user_rank DESC 
                                      ");
        }

        $stmt->bind_param('siiss',$currency,$amount,$amount,$fromDate,$toDate);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
    }
    elseif ($_GET["action"] == "sendMassege"){
        try{
            $amount = $_GET["amount"];
            $currency = $_GET["code"];
            $massege = $_GET["message"];
            $buyerid = $_GET["buyer_Id"];
            $dealid = $_GET["deal_id"];
            $sid = $_GET["selle_id"];
            $stmt = $connection->prepare("INSERT INTO tbl_234_exchange_messages 
                                         (
                                          messages_deals_id,
                                          messages_seller_id,
                                          messages_buyer_id,messages_message,
                                          messages_amount,messages_currency
                                          )
                                          VALUES (?,?,?,?,?,?)");
            $stmt->bind_param("isssis", $dealid, $sid,$buyerid,$massege,$amount,$currency);
            $stmt->execute();
            echo "ok";
        }catch (Exception $e){
            echo $e->getMessage();
        }
        finally{
            $stmt->close();
        }

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
            $stmt = $connection->prepare("INSERT INTO tbl_234_xchange_deals (deals_seller_id,deals_amount,deals_currency,deals_date,deals_time,deals_location,deals_lat,deals_lng)
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
    } elseif ($_GET["action"] == "getMessages"){
        try{
        $stmt = $connection->prepare("SELECT m.messages_currency,m.messages_amount,m.messages_message,u.user_name,u.user_last_name,u.user_tumb_u,user_tumb_d,u.user_rank,u.user_phone,u.user_id
                  FROM tbl_234_exchange_messages AS m 
                  JOIN tbl_234_xchange_users AS u 
                  ON m.messages_buyer_id = u.user_id AND m.messages_buyer_id = ?
                  ORDER BY m.messages_id ASC");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        } catch (Exception $e){
            echo $e->getMessage();
        } finally{
            $stmt->close();
        }
    }
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
    }
    elseif ($_GET["action"] == "getMeetings"){
        $query = "SELECT d.deals_seller_id, d.deals_buyer_id,d.deals_amount,d.deals_status,d.deals_currency,d.deals_location,d.deals_lat,d.deals_lng,
                  a.user_name AS 'sell_um',a.user_rank AS 'sell_ur',b.user_name AS 'buy_un',b.user_rank AS 'buy_ur'
                  FROM tbl_234_xchange_deals AS d
                  JOIN tbl_234_xchange_users AS a
                  ON a.user_id = d.deals_seller_id
                  JOIN tbl_234_xchange_users AS b
                  ON b.user_id = d.deals_buyer_id
                  WHERE deals_status = 1 or deals_status=2";
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