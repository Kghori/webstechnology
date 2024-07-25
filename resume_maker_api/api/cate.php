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
        include("partial/db.php");
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if (isset($path[4]) && is_numeric($path[4])) {
            $userid = $path[4];
            $fire = new db();
            $result = $fire->performcurd("cate", 's', [], ['id' => $userid]);
            
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "Category not found for provided ID"]);
            }
        }
         elseif (isset($_GET['cateid']) && is_numeric($_GET['cateid'])) {
            $cateid = $_GET['cateid'];
            $fire = new db();
            $result = $fire->performcurd("cate", 's', [], ['id' => $cateid]);
            
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "Category not found for provided ID"]);
            }
        } elseif (isset($_GET['adminid'])) {
            $adminid = $_GET['adminid'];
           
            $fire = new db();
            $result = $fire->performcurd("cate", 's', [], ['adminid' => $adminid]);
            
            if (!empty($result)) {
                echo json_encode(["cate" => $result]);
            } else {
                echo json_encode(["error" => "No data found for provided admin ID"]);
            }
        } 
         else {
            $fire = new db();
            // Retrieve adminid from the query string parameters
            $adminid = $_GET['adminid'] ?? null;
            
            // Check if adminid is provided
            if ($adminid !== null) {
                $result = $fire->performcurd("cate", 's', [], ['adminid' => $adminid]);
                if (!empty($result)) {
                    echo json_encode(["cate" => $result]);
                    return;
                } else {
                    echo json_encode(["not" => "No data found"]);
                }
            } else {
                // Handle case where adminid is not provided
                echo json_encode(["error" => "Admin ID not provided"]);
            }
        }
        break;
    


    case "POST":
        include("partial/db.php");
        $cerdata = json_decode(file_get_contents("php://input"), true);
        $cn = $cerdata['admincate'];
        $active = $cerdata['active'];
        $adminid = $cerdata['adminid'] ?? null;
                             
               $detail=array(
            'cate_name' => $cn,
            'active' => $active,
            'adminid' => $adminid
          
        ); 
         $fire=new db();

        $result = $fire->performcurd("cate", 'i', $detail, []);
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
        echo $id;
        $fire = new db();
        $result = $fire->performcurd("cate", 'd', [], ['id' => $id]);
        // echo $result; // Assuming you want to echo the result
    } else {
        echo "Error: No 'deid' parameter provided.";
    }
    break;
    case "PUT":
        include("partial/db.php");
    
        // Decode JSON data into an associative array
        $updata = json_decode(file_get_contents("php://input"), true);
    
        // Check if the required fields are present
        
    
        // Extract data from the associative array
        $upid = $updata['id'];
        $upcatename = htmlspecialchars($updata['admincate']);
        $upactive = htmlspecialchars($updata['active']);
    
        // Prepare data array for database update
        $data = array(
            'cate_name' => $upcatename,
            'active' => $upactive
        );
    
        // Perform database update
        $fire = new db();
        $result = $fire->performcurd("cate", 'u', $data, ['id' => $upid]);
    
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
































    // case "GET": 
    //     include("partial/conn.php");
    //     include("partial/db.php");
    //     $path = explode('/', $_SERVER['REQUEST_URI']);
        
    //     if(isset($path[4]) && is_numeric($path[4])) {
    //         $userid = $path[4];
    //         $fire = new db();
    //         $result = $fire->performcurd("cate", 's', [], ['id' => $userid]);
    //         $json_array = array();
    
    //         // Check if a row is found
    //         if (!empty($result)) {
    //             $json_array['cate'] = $result;
    //         } else {
    //             // Handle case where user ID doesn't exist
    //             $json_array['error'] = "User ID not found";
    //         }
    //         echo json_encode($json_array);
    //         return; 
    //     } else {
    //         $fire = new db();
    //         // Retrieve adminid from the query string parameters
    //         $adminid = $_GET['adminid'] ?? null;
            
    //         // Check if adminid is provided
    //         if ($adminid !== null) {
    //             $result = $fire->performcurd("cate", 's', [], ['adminid' => $adminid]);
    //             if (!empty($result)) {
    //                 echo json_encode(["cate" => $result]);
    //                 return;
    //             } else {
    //                 echo json_encode(["not" => "No data found"]);
    //             }
    //         } 
    //     }
    //     break;
     
       
    // case "GET":
    //     include("partial/db.php");
        
    //     $fire = new db();
    //     // Retrieve adminid from the query string parameters
    //     $adminid = $_GET['adminid'] ?? null;
        
    //     // Check if adminid is provided
    //     if ($adminid !== null) {
    //         $result = $fire->performcurd("cate", 's', [], ['adminid' => $adminid]);
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

    
    ?>