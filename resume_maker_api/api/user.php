<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

class db {
    private $conn;

    function __construct() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $databasename = "react_php";
        try {
            $this->conn = new PDO("mysql:host=$servername;dbname=$databasename", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "<h1 style='color:green'>Connection successfully established</h1>";
        } catch(PDOException $e) {
            echo "<h1>Connection failed</h1>";
            echo "<p>Error message: " . $e->getMessage() . "</p>";
            die(); // Stop script execution after displaying the error message
        }
    }
    

    function performcured($tablename, $operation, $data, $where) {
        switch(strtolower($operation)){
            case "i":
                $columns = implode(", ", array_keys($data));
                $values = ":" . implode(", :", array_keys($data));
                $sql = "INSERT INTO `$tablename` ($columns) VALUES ($values)";
                $stmt = $this->conn->prepare($sql);
                $stmt->execute($data);
                return $stmt->rowCount() > 0 ? true : false;
                break;
            //     case "s":
            //         $whereClause="";
            //         foreach($where as $key => $values){
            //             $whereClause .= "$key = '$values' AND ";

            //         }
            //         $whereClause = rtrim($whereClause, "AND ");
            //         $sql = "SELECT * FROM $tablename";
            //         if (!empty($whereClause)) {
            //             $sql .= " WHERE $whereClause";
            //         }
            //         $fetch = $this->conn->prepare($sql);
            //         $fetch->execute();
            //         $num = $fetch->rowCount();
                    

     
            //         if ($num > 0) { 
            //             while ($row = $fetch->fetch(PDO::FETCH_ASSOC)) {
            //                 // Process each row
            //                 //   print_r($row);
            //                 $row1[]=$row; 
            //                 $rows[] = $row;
                                    
            //             }
            //         // $status= "loggedin";
            //         }else{
            //             // $status= "notlogin";
            //             // $status1="not-cate";
            //              echo "0 results";
            //         }    
            //         if ($rows == true) {
            //             return $rows;
            //         } else if($row1==true){
            //             return $row1;
            //          }
            //             break;
            case "s":
                // Construct the WHERE clause dynamically based on the $where array
                $whereClause = "";
                $params = [];
                foreach($where as $key => $value) {
                    $whereClause .= "$key = :$key AND ";
                    $params[":$key"] = $value;
                }
                $whereClause = rtrim($whereClause, "AND ");
    
                // Construct the SQL query
                $sql = "SELECT * FROM $tablename";
                if (!empty($whereClause)) {
                    $sql .= " WHERE $whereClause";
                }
    
                // Prepare and execute the query
                $stmt = $this->conn->prepare($sql);
                $stmt->execute($params);
    
                // Fetch and return the results
                $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $results;
                break;
    
            default:
            
                return false;
        }
    }
}

$method = $_SERVER['REQUEST_METHOD'];
// echo "Request Method: " . $method;
$fire = new db();
switch ($method) {
    case "GET":
        $result = $fire->performcured("signup", 's', [], []);
        if (!empty($result)) {
            echo json_encode(["result" => $result]);
            return;
         
        } else {
            echo json_encode(["not" => "No data found"]);
        }
        break;

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"), true);
        $username = $userpostdata['username']; // Accessing array element using associative array syntax
        $email = $userpostdata['email']; // Accessing array element using associative array syntax
        $password = $userpostdata['password']; // Accessing array element using associative array syntax
        $role = $userpostdata['role']; // Accessing array element using associative array syntax
        $detail=array(
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'role' => $role
        );

        $result = $fire->performcured("signup", 'i', $detail, []);
        if ($result) {
            echo json_encode(["suc" => "data Added Successfully"]);
        } else {
            echo json_encode(["error" => "Please Check the User Data!"]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>














<!-- ?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

class db {
    private $conn;

    function __construct() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $databasename = "react_php";
        try {
            $this->conn = new PDO("mysql:host=$servername;dbname=$databasename", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "<h1 style='color:green'>Connection successfully established</h1>";
        } catch(PDOException $e) {
            echo "<h1>Connection failed</h1>" . $e->getMessage();
        }
    }

    function performcured($tablename, $operation, $data, $where) {
        switch(strtolower($operation)){
            case "i":
                $columns = implode(", ", array_keys($data));
                $values = ":" . implode(", :", array_keys($data));
                $sql = "INSERT INTO `$tablename` ($columns) VALUES ($values)";
                $stmt = $this->conn->prepare($sql);
                $stmt->execute($data);
                return $stmt->rowCount() > 0 ? true : false;
                break;
            // case "s":
            //     $wherecaluse = "";
            //     foreach($where as $key => $values){
            //         $wherecaluse .= "$key = :$key AND ";
            //     }
            //     $wherecaluse = rtrim($wherecaluse, "AND ");
            //     $sql = "SELECT * FROM $tablename WHERE $wherecaluse";
            //     $stmt = $this->conn->prepare($sql);
            //     $stmt->execute($where);
            //     return $stmt->fetchAll(PDO::FETCH_ASSOC);
            //     break;
            default:
                return false;
        }
    }
}

$method = $_SERVER['REQUEST_METHOD'];
echo "Request Method: " . $method;
$fire = new db();
switch ($method) {
    case "GET":
    
        $data = $fire->performcured("signup", 's', [], []);
        if (!empty($data)) {
            echo json_encode($data);
        } else {
            echo json_encode(["not" => "No data found"]);
        }
        break;

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"), true);
        $username = $userpostdata->username;
        $email = $userpostdata->email;
        $password = $userpostdata->password; // Fix: Removed unnecessary $ before password
        $role = $userpostdata->role;
        $detail=array(
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'role' => $role
        );
    

        $fire = new db();
        $result = $fire->performcured("signup", 'i', $detail, []);
       
if ($result) {
    echo json_encode(["suc" => "data Added Successfully"]);
} else {
    echo json_encode(["error" => "Please Check the User Data!"]);
}
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>



 -->






















<!-- ?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = mysqli_connect("localhost", "root", "", "react_php");

if ($conn == false) {
    die("error" . mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];
echo "Request Method: " . $method; // Just for debugging purposes

switch ($method) {
    case "GET":
        $alluser = mysqli_query($conn, "SELECT * FROM signup");
        $json_array = ["userdata" => []]; // Initialize the array outside the loop
        if (mysqli_num_rows($alluser) > 0) {
            while ($row = mysqli_fetch_array($alluser, MYSQLI_ASSOC)) {
                $json_array["userdata"][] = [
                    "id"=>$row["id"],
                    "username" => $row["username"],
                    "email" => $row["email"],
                    "password" => $row["password"],
                    "role" => $row["role"]
                ];
            }
            echo json_encode($json_array["userdata"]);
        } else {
            echo json_encode(["result" => "No data found"]);
        }
        break;

    case "POST":
        // Get the JSON data from the request body
        $userpostdata = json_decode(file_get_contents("php://input"));
        // Print out the received data for debugging
        echo "Received data:\n";
        $username = $userpostdata->username;
        $email = $userpostdata->email;
        $password = $userpostdata->password; // Fix: Removed unnecessary $ before password
        $role = $userpostdata->role;
        $result = mysqli_query($conn, "INSERT INTO `signup` (username,email,password,role) VALUES ('$username','$email','$password','$role')");
        if ($result) {
            echo json_encode(["result" => "Data inserted successfully"]);
        } else {
            echo json_encode(["result" => "Failed to insert data"]);
        }
        break;

    default:
        // Handle unsupported request methods
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?> -->
