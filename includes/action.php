<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if($_GET["action"] == "data") {
        include('db.php');
        $query = "SELECT * FROM tbl_users_234 WHERE I < 6";
        $result = mysqli_query($connection, $query);

        /*$row=mysqli_fetch_assoc($result);
        $arr = array ('ID'=>$row["ID"],'FIRST_NAME'=>$row["FIRST_NAME"],'LAST_NAME'=>$row["LAST_NAME"]);
        header('Content-type: application/json');
        echo json_encode($arr);*/

        $arr = array();

        if ($result->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                /*echo "id: " . $row["ID"] . " - Name: " . $row["FIRST_NAME"] . " " . $row["LAST_NAME"] . "<br>";*/
                $arr[] = $row;
            }
        }
        header('Content-type: application/json');
        print json_encode($arr);
        mysqli_free_result($result);
    }
}
    $connection->close();


/*if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $class = $_POST["ClassNumber"];
    $building = $_POST["Building"];
    $floor = $_POST["Floor"];

    if($_GET["action"] == "s") {

        // Create connection
        $con=mysqli_connect("$servername","$username","$password","$dbname");
        // Check connection
        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

        $sql="SELECT * FROM CLASS_TABLE WHERE CLASS = $class";
        $result=mysqli_query($con,$sql);
        // Associative array
        $row=mysqli_fetch_assoc($result);
        $arr = array ('ClassNumber'=>$row["CLASS"],'Floor'=>$row["FLOOR"],'Building'=>$row["BUILDING"]);
        header('Content-type: application/json');
        echo json_encode($arr);
        // Free result set
        mysqli_free_result($result);
        mysqli_close($con);
    }*/