<?php
include('db.php');
echo "zibi";
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
        $query = "SELECT COUNT(*) FROM tbl_users_234";
        $result = mysqli_query($connection,$query);
    }
    elseif ($_GET["action"] == "getSellers") {
        $amount = $_GET["amount"];
        $currency = $_GET["currency"];
        $toDate = $_GET["toDate"];
        $fromDate = $_GET["fromDate"];


        $stmt = $connection->prepare("SELECT * 
                                      FROM tbl_234_xchange_deals 
                                      WHERE (deals_currency  = ?)
                                      AND (deals_amount BETWEEN ?-20 AND ?+50)
                                      ");
        $test ="USD";
        $stmt->bind_param('sii',$test,$amount,$amount);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
    } elseif ($_GET["action"] == "publishSell"){
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
        echo "here";
        /*try{
            echo "here";
            fName = element.FIRST_NAME;
            pictureURL = element.PICTURE;
            rankURL = element.RANK;
            currency = element.CURRENCY;
            amount = element.AMOUNT;
            message = element.MESSAGE;
            last name
            phone number
            like
            dislike

            $status = 1;
            $stmt = $connection->prepare("SELECT m.deals_currency, m.deals_amount, m.messages_message 
                                          FROM tbl_234_xchange_messages as m
                                          ORDER BY m.messages.id ASC");
            $stmt->bind_param("i",$status);
            $stmt->execute();
            $result = $stmt->get_result();
        }catch (Exception $e){
            echo $e->getMessage();
        }
        finally{
            $stmt->close();
        }*/
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