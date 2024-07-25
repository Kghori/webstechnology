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
        $result = $fire->performcurd("temp1", 's', [], []);
        if (!empty($result)) { 
            echo json_encode(["result" => $result]);
        } else {
            echo json_encode(["not" => "No data found"]);
        }
        break;

    case "POST":
        include("partial/db.php");
        $userpostdata = json_decode(file_get_contents("php://input"), true);

        // Log incoming data for debugging
        file_put_contents('php://stderr', "Incoming data: " . print_r($userpostdata, true));

        $tfn = $userpostdata['firstName']; 
        $tln = $userpostdata['lastName']; 
        $temail = $userpostdata['email']; 
        $tcontact = $userpostdata['phone']; 
        $tweb = $userpostdata['website'];
        $tloca = $userpostdata['location'];
        $texp = json_encode($userpostdata['experience']);
        $teducation = json_encode($userpostdata['education']);
        $tskills = json_encode($userpostdata['skills']);
        $tprofile = $userpostdata['profile'];
        $tadd_info = $userpostdata['additionalInfo'];
        $tuserid = $userpostdata['userId'];
        $l_insta = $userpostdata['instagram'];
        $l_link = $userpostdata['linkedin'];
        $l_twi = $userpostdata['twitter'];
        $l_git = $userpostdata['github'];

        // Log data for debugging
        file_put_contents('php://stderr', "Processed data: " . print_r($userpostdata, true));

        $fire = new db();
        $detail = array(
            "fname" => $tfn,
            "lname" => $tln,
            "email" => $temail,
            "phone" => $tcontact,
            "website" => $tweb,
            "location" => $tloca,
            "skill" => $tskills,
            "exp" => $texp,
            "edu" => $teducation,
            "user_id" => $tuserid,
            "profile_desc" => $tprofile,
            "addi_info" => $tadd_info,
            "link1" => $l_insta,
            "link2" => $l_link,
            "link3" => $l_twi,
            "link4" => $l_git
        );

        // Capture the SQL query and any errors
        try {
            // Log the details to be inserted
            file_put_contents('php://stderr', "Details to be inserted: " . print_r($detail, true));

            $result = $fire->performcurd("temp1", 'i', $detail, []);
            
            // Log the result of the query
            file_put_contents('php://stderr', "SQL query result: " . print_r($result, true));

            if ($result) {
                echo json_encode(["suc" => "Data added successfully"]);
            } else {
                throw new Exception("Data insertion failed");
            }
        } catch (Exception $e) {
            // Log any exception
            file_put_contents('php://stderr', "Exception: " . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n", FILE_APPEND);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}
?>
