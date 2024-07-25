<?php 

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include("partial/conn.php");
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        include("partial/db.php");
        $fire = new db();
        $result = $fire->performcurd("signup", 's', [], []);
        if (!empty($result)) {
            echo json_encode(["result" => $result]);
            return;
         
        } else {
            echo json_encode(["not" => "No data found"]);
        }
        break;

    case "POST":
        include("partial/db.php");
        $userpostdata = json_decode(file_get_contents("php://input"), true);
        $username = $userpostdata['username']; 
        $email = $userpostdata['email']; 
        $password = $userpostdata['password']; 
        $role = $userpostdata['role']; 
        $detail=array(
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'role' => $role
        );
        $fire = new db();
        $result = $fire->performcurd("signup", 'i', $detail, []);
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


