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
            include("partial/conn.php");
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[4]) && is_numeric($path[4])) {
                include("partial/db.php");
                $userid = $path[4];
                $fire = new db();
                $result = $fire->performcurd("temp1", 's', [], ['no' => $userid]);
                
                if (!empty($result)) {
                    echo json_encode(["cate" => $result]);
                } else {
                    echo json_encode(["error" => "Category not found for provided ID"]);
                }
            } 
            else {
                
                    include("partial/db.php");
                    
                    $fire = new db();
                    // Retrieve adminid from the query string parameters
                    $adminid = $_GET['userid1'] ?? null;
            
                    // Check if adminid is provided
                    if ($adminid !== null) {
                        $result = $fire->performcurd("temp1", 's', [], ['no' => $adminid]);
                        if (!empty($result)) {
                            echo json_encode(["cate" => $result]);
                            return;
                        } else {
                            echo json_encode(["not" => "No data found"]);
                        }
                    } else {
                        echo json_encode(["error" => "Admin ID not provided"]);
                    }
                
            }
            break;
        // case "GET":
    //     include("partial/db.php");
        
    //     $fire = new db();
    //     // Retrieve adminid from the query string parameters
    //     $adminid = $_GET['adminid'] ?? null;

    //     // Check if adminid is provided
    //     if ($adminid !== null) {
    //         $result = $fire->performcurd("certi_detail", 's', [], ['adminid' => $adminid]);
    //         if (!empty($result)) {
    //             echo json_encode(["cate" => $result]);
    //             return;
    //         } else {
    //             echo json_encode(["not" => "No data found"]);
    //         }
    //     } else {
    //         echo json_encode(["error" => "Admin ID not provided"]);
    //     }
    //     break;
        
    case "POST":
        include("partial/db.php");
        $cerdata = json_decode(file_get_contents("php://input"), true);
        $cn = $cerdata['Candidatename']; // Accessing array element using associative array syntax
        $con = $cerdata['Candidate_owner_name']; // Accessing array element using associative array syntax
        $cf = $cerdata['Candidate_Filed']; // Accessing array element using associative array syntax
        $choice = $cerdata['Candidate_choice']; // Accessing array element using associative array syntax
        $avail = $cerdata['availability']; 
        $ad_id=$cerdata['adminid'];
        $detail=array(
            'cname' => $cn,
            'coname' => $con,
            'cfield' => $cf,
            'choice' => $choice,
           'available'=>$avail,
           'adminid'=>$ad_id
        ); 
         $fire=new db();

        $result = $fire->performcurd("certi_detail", 'i', $detail, []);
        if ($result) {
            echo json_encode(["suc" => "data Added Successfully"]);
        } else {
            echo json_encode(["error" => "Please Check the User Data!"]);
        }
        break;
                
case "DELETE":
    include("partial/db.php"); $path= explode('/', $_SERVER["REQUEST_URI"]);

    if(isset($_GET['deid'])) {
        $id = $_GET['deid'];
        // echo $id;
        $fire = new db();
        $result = $fire->performcurd("certi_detail", 'd', [], ['no' => $id]);
        // echo $result; // Assuming you want to echo the result
    } else {
        echo "Error: No 'deid' parameter provided.";
    }
    break;
    case "PUT":
        include("partial/db.php");
    
        // Decode JSON data into an associative array
        $updata = json_decode(file_get_contents("php://input"), true);
        // print_r($updata);
        // Check if the required fields are present
        
    
        // Extract data from the associative array
        $upid = $updata['no'];
        // echo $upid;
        $upcatename = htmlspecialchars($updata['Candidatename']);
        $up_o_name = htmlspecialchars($updata['Candidate_owner_name']);
        $up_field = htmlspecialchars($updata['Candidate_Filed']);
        $up_ch = htmlspecialchars($updata['Candidate_choice']);
        $up_avai = htmlspecialchars($updata['availability']);
    
        // Prepare data array for database update
        $data = array(
            'cname' => $upcatename,
            'coname' => $up_o_name,
            'cfield' =>$up_field,
            'choice' =>$up_ch,
            'available'=>$up_avai
        );
    
        // Perform database update
        $fire = new db();
        $result = $fire->performcurd("certi_detail", 'u', $data, ['no' => $upid]);
    
        // Check if the update was successful
        if ($result) {
            http_response_code(200); // OK
            echo json_encode(["success" => "Update successful"]);
        } else {
       // Internal Server Error
            echo json_encode(["error" => "Update failed"]);
        }
        break;
    

    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}


