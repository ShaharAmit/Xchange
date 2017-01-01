<?php
$from = $amount = $shekels = "";
$to = "ILS";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $from = $_POST["from"];
    $amount = $_POST["amount"];
    $shekels = converter_currency($amount, $from, $to);
}
function converter_currency($amount, $from,$to){
    $result = file_get_contents('https://www.google.com/finance/converter?a='.$amount.'&from='.$from.'&to='.$to);
    preg_match('#\<span class=bld\>(.+?)\<\/span\>#s', $result, $finalData);
    return $finalData[1];

}

echo converter_currency(5, 'EURO','ILS'); // 5.4125 USD

list($amount, $currency) = explode(' ', converter_currency(5, 'EUR','ILS'));
var_dump($amount, $currency); // string(6) "5.4125" string(3) "USD"
