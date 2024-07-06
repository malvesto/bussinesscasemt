import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SelectField from "./SelectField";

const EmpCreate = () => {
    // locais para armazenar os dados do formulário
    const [operationType, setOperationType] = useState("Carga");
    const [supplier, setSupplier] = useState("");
    const [driver, setDriver] = useState("");
    const [truckPlate, setTruckPlate] = useState("");
    const [product, setProduct] = useState("");
    const [grossWeight, setGrossWeight] = useState("");
    const [invoiceValue, setInvoiceValue] = useState("");
    const [status, setStatus] = useState("Na portaria");
    const navigate = useNavigate(); 

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação de campos obrigatórios
        if (!supplier || !driver || !truckPlate || !product || !grossWeight || !invoiceValue) {
            alert("Todos os campos devem ser preenchidos."); // Alerta se algum campo estiver vazio
            return;
        }

        // Dados a serem enviados no corpo da requisição POST
        const cargoData = { operationType, supplier, driver, truckPlate, product, grossWeight, invoiceValue, status };

        // Requisição POST para criar uma nova carga
        fetch("http://localhost:8000/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cargoData) // Corpo da requisição com os dados da carga em formato JSON
        })
        .then((res) => {
            if (res.ok) {
                alert('Salvo com sucesso.'); // Exibe alerta de sucesso se a carga for criada com sucesso
                navigate('/'); // Navega de volta para a página inicial após o cadastro
            } else {
                throw new Error('Erro ao salvar carga'); // Lança um erro se a requisição não for bem-sucedida
            }
        })
        .catch((err) => {
            console.error(err); // Exibe o erro no console
            alert('Erro ao salvar carga'); // Exibe alerta de erro ao usuário
        });
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h2 className="card-title">Criar Cargas</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Componente SelectField para selecionar o tipo de operação */}
                            <SelectField
                                label="Tipo de Operação"
                                value={operationType}
                                onChange={(e) => setOperationType(e.target.value)}
                                options={["Carga", "Descarga"]}
                                required
                            />
                            {/* Componente InputField para o campo de fornecedor */}
                            <InputField
                                label="Fornecedor"
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                                required
                            />
                            {/* Componente InputField para o campo de motorista */}
                            <InputField
                                label="Motorista"
                                value={driver}
                                onChange={(e) => setDriver(e.target.value)}
                                required
                            />
                            {/* Componente InputField para o campo de placa da carreta */}
                            <InputField
                                label="Placa da Carreta"
                                value={truckPlate}
                                onChange={(e) => setTruckPlate(e.target.value)}
                                required
                            />
                            {/* Componente InputField para o campo de produto */}
                            <InputField
                                label="Produto"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                required
                            />
                            {/* Componente InputField para o campo de peso bruto */}
                            <InputField
                                label="Peso Bruto"
                                value={grossWeight}
                                onChange={(e) => setGrossWeight(e.target.value)}
                                required
                            />
                            {/* Componente InputField para o campo de valor da nota */}
                            <InputField
                                label="Valor da Nota"
                                value={invoiceValue}
                                onChange={(e) => setInvoiceValue(e.target.value)}
                                required
                            />
                            {/* Componente SelectField para selecionar o status da carga */}
                            <SelectField
                                label="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                options={["Na portaria", "Carregando", "Finalizado"]}
                                required
                            />
                            {/* Botões de ação para salvar e voltar */}
                            <div className="col-lg-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="submit" className="btn btn-success me-md-2">Salvar</button>
                                    <Link to="/" className="btn btn-danger">Voltar</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmpCreate;