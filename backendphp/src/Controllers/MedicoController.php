<?php

namespace App\Controllers;

use App\Models\Medico;
use Exception;

class MedicoController
{
    public function index(): void
    {
        try {
            $medicos = Medico::orderBy('id', 'desc')->get();

            echo json_encode($medicos);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "message" => "Erro ao listar médicos",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function store(): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data["nome"]) || empty($data["CRM"]) || empty($data["UFCRM"])) {
            http_response_code(400);
            echo json_encode(["message" => "Nome, CRM e UFCRM são obrigatórios"]);
            return;
        }

        try {
            Medico::create([
                'nome' => $data['nome'],
                'CRM' => $data['CRM'],
                'UFCRM' => $data['UFCRM']
            ]);

            http_response_code(201);
            echo json_encode(["message" => "Médico criado com sucesso"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "message" => "Erro ao criar médico",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function update(int $id): void
    {
        $data = json_decode(file_get_contents("php://input"), true);

        try {
            $medico = Medico::find($id);

            if (!$medico) {
                http_response_code(404);
                echo json_encode(["message" => "Médico não encontrado"]);
                return;
            }

            $medico->nome = $data["nome"] ?? $medico->nome;
            $medico->CRM = $data["CRM"] ?? $medico->CRM;
            $medico->UFCRM = $data["UFCRM"] ?? $medico->UFCRM;
            $medico->save();

            echo json_encode(["message" => "Médico atualizado com sucesso"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "message" => "Erro ao atualizar médico",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function destroy(int $id): void
    {
        try {
            $medico = Medico::find($id);

            if (!$medico) {
                http_response_code(404);
                echo json_encode(["message" => "Médico não encontrado"]);
                return;
            }

            $medico->delete();

            echo json_encode(["message" => "Médico removido com sucesso"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "message" => "Erro ao remover médico",
                "error" => $e->getMessage()
            ]);
        }
    }
}