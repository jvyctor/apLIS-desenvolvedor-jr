<?php

use App\Controllers\MedicoController;

$controller = new MedicoController();

$method = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

if ($uri === "/" && $method === "GET") {
    echo json_encode(["message" => "API PHP de médicos rodando"]);
    return;
}

if ($uri === "/api/v1/medicos" && $method === "GET") {
    $controller->index();
    return;
}

if ($uri === "/api/v1/medicos" && $method === "POST") {
    $controller->store();
    return;
}

if (preg_match('#^/api/v1/medicos/(\d+)$#', $uri, $matches)) {
    $id = (int) $matches[1];

    if ($method === "PUT") {
        $controller->update($id);
        return;
    }

    if ($method === "DELETE") {
        $controller->destroy($id);
        return;
    }
}

http_response_code(404);
header("Content-Type: application/json");
echo json_encode(["message" => "Rota não encontrada"]);