<?php
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        // List projects
        $query = "SELECT * FROM projects";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($projects);
        break;
    case 'POST':
        // Create project
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->name)) {
            $query = "INSERT INTO projects SET name=:name, description=:description, manager_id=:manager_id, deadline=:deadline, progress=:progress, color=:color";
            $stmt = $db->prepare($query);
            
            $name = htmlspecialchars(strip_tags($data->name));
            $description = htmlspecialchars(strip_tags($data->description));
            $manager_id = htmlspecialchars(strip_tags($data->manager_id));
            $deadline = htmlspecialchars(strip_tags($data->deadline));
            $progress = isset($data->progress) ? htmlspecialchars(strip_tags($data->progress)) : 0;
            $color = isset($data->color) ? htmlspecialchars(strip_tags($data->color)) : '#3b82f6';

            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":description", $description);
            $stmt->bindParam(":manager_id", $manager_id);
            $stmt->bindParam(":deadline", $deadline);
            $stmt->bindParam(":progress", $progress);
            $stmt->bindParam(":color", $color);

            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Project created."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create project."));
            }
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>
