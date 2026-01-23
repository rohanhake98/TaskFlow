<?php
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        // List tasks
        $query = "SELECT * FROM tasks";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
        break;
    case 'POST':
        // Create task
        $data = json_decode(file_get_contents("php://input"));
        if(!empty($data->title) && !empty($data->project_id)) {
            $query = "INSERT INTO tasks SET title=:title, description=:description, project_id=:project_id, assigned_to=:assigned_to, priority=:priority, due_date=:due_date";
            $stmt = $db->prepare($query);
            
            $title = htmlspecialchars(strip_tags($data->title));
            $description = htmlspecialchars(strip_tags($data->description));
            $project_id = htmlspecialchars(strip_tags($data->project_id));
            $assigned_to = htmlspecialchars(strip_tags($data->assigned_to));
            $priority = htmlspecialchars(strip_tags($data->priority));
            $due_date = htmlspecialchars(strip_tags($data->due_date));

            $stmt->bindParam(":title", $title);
            $stmt->bindParam(":description", $description);
            $stmt->bindParam(":project_id", $project_id);
            $stmt->bindParam(":assigned_to", $assigned_to);
            $stmt->bindParam(":priority", $priority);
            $stmt->bindParam(":due_date", $due_date);

            if($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Task created."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create task."));
            }
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>
