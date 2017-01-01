<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Xchange</title>
        <link rel="stylesheet" href="includes/buying.css">
        <link rel="stylesheet" href="../../includes/all.css">
    </head>
    <body>
        <main>
            <div>
                <form>
                    <label>*</label>
                    <label>*</label>
                    <label>*</label>
                    <label id="date">:רוצה לקנות בין תאריכים</label>
                    <input type="date" id="firstDate" title="תאריך התחלה" required>
                    <input type="date" id="secondDate" title="תאריך סיום" required>
                    <label id="buy">:רוצה לקנות מט"ח</label>
                    <input name="amount" type="number" id="amount" title="בחר סכום" placeholder="בחר סכום" required>
                    <select name="from" id="coin" title="choose coin">
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                        <option value="AUD">AUD</option>
                        <option value="INR">INR</option>
                        <option value="NPR">NPR</option>
                        <option value="BAHT">BAHT</option>
                        <option value="HKD">HKD</option>
                        <option value="CNY">CNY</option>
                    </select>
                    <label id="ilsAmount">&#x20aa;&nbsp;0.00</label>
                    <button type="submit">חפש</button>
                </form>
                <div id="arrowUp"></div>
                <div id="avatars">
                    <div class="clear"></div>
                </div>
                <div id="arrowDown"></div>
            </div>
        </main>
        <div class="clear"></div>
        <script src="../../includes/jquery-3.1.1.min.js"></script>
        <script src="../../includes/all.js"></script>
        <script src="includes/buying.js"></script>
    </body>
</html>