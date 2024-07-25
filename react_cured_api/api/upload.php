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
       

        // Check if adminid is provided
        if ($fire !== null) {
            $result = $fire->performcurd("upload_one", 's', [], []);
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
                return;
            } else {
                echo json_encode(["not" => "No data found"]);
            }
        } else {
            echo json_encode(["error" => "Admin ID not provided"]);
        }
        break;
       
    case "POST":
        include("partial/db.php");
        // Ensure the request contains a file
      $data = json_decode(file_get_contents('php://input'), true);

    // Check if the necessary data is present in the request
    if (isset($_FILES['file'])) {
        // Read additional data from the request
        $cname = $_POST['cname']; // Assuming 'cname' is sent in the request
        $userId = $_POST['userId']; //

            // Specify the directory where you want to store the uploaded files
            $uploadDirectory = 'uploads/';

            // Generate a unique filename for the uploaded file
            $fileName = 'certificate_'.$cname. '.pdf';

            // Construct the full path to save the file
            $filePath = $uploadDirectory . $fileName;

            // Move the uploaded file to the specified directory
            if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                // File uploaded successfully
                // Now you can save the file path to your database or perform any other necessary actions

                // For example, you can save the file path to the database
                // $insertQuery = "INSERT INTO certificates (file_path) VALUES ('$filePath')";
                $fire = new db();
                $data=array('pdfname'=>$filePath,'cname'=>$cname,'adminid'=>$userId);

                $result = $fire->performcurd("upload_one", 'i', $data, []);
                if ($result) {
                    echo json_encode(["success" => "File uploaded successfully and data inserted into the database"]);
                } else {
                    echo json_encode(["error" => "Failed to insert data into the database"]);
                }
            } else {
                // Failed to move the uploaded file
                echo json_encode(["error" => "Failed to move the uploaded file"]);
            }
        } else {
            // No file found in the request
            echo json_encode(["error" => "No file uploaded"]);
        }
        break;
    default:
        // Unsupported HTTP method
        echo json_encode(["error" => "Unsupported HTTP method"]);
}
?>
