import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams(); 
    const navigate = useNavigate(); 

    // Estados para armazenar os dados do formulário
    const [id, setId] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [motorista, setMotorista] = useState("");
    const [placadacarreta, setPlacadacarreta] = useState("");
    const [produtos, setProdutos] = useState("");
    const [pesobruto, setPesobruto] = useState("");
    const [valornota, setValornota] = useState("");
    const [status, setStatus] = useState("Na portaria");
    const [tipoOperacao, setTipoOperacao] = useState("");
    const [validation, setValidation] = useState(false); // Estado para validação do campo fornecedor

    // Efeito para carregar os dados da carga a ser editada
    useEffect(() => {
        fetch(`http://localhost:8000/employee/${empid}`)
            .then((res) => res.json())
            .then((resp) => {
                // Define os valores dos estados com os dados obtidos
                setId(resp.id);
                setFornecedor(resp.fornecedor);
                setMotorista(resp.motorista);
                setPlacadacarreta(resp.placadacarreta);
                setProdutos(resp.produtos);
                setPesobruto(resp.pesobruto);
                setValornota(resp.valornota);
                setStatus(resp.status);
                setTipoOperacao(resp.tipoOperacao);
            })
            .catch((err) => {
                console.log(err.message); // Log de erro caso a requisição falhe
            });
    }, [empid]); // Dependência do useEffect: empid, para recarregar os dados quando o ID da carga mudar

    // Função para lidar com o envio do formulário de edição
    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Objeto com os dados da carga a serem enviados para a API
        const empdata = {
            id,
            fornecedor,
            motorista,
            placadacarreta,
            produtos,
            pesobruto,
            valornota,
            status,
            tipoOperacao,
        };

        // Requisição PUT para atualizar os dados da carga na API
        fetch(`http://localhost:8000/employee/${empid}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata), 
        })
            .then((res) => {
                alert("Salvo com sucesso."); // Alerta de sucesso ao usuário
                navigate("/"); // Redireciona o usuário de volta para a lista de cargas
            })
            .catch((err) => {
                console.log(err.message); // Log de erro caso a requisição falhe
            });
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <h2 className="card-title">Editar Cargas</h2>
                            </div>
                            <div className="card-body">
                                {/* Campos de formulário para editar os dados da carga */}
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label">ID</label>
                                    <input value={id} id="id" disabled className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fornecedor" className="form-label">Fornecedor</label>
                                    <input
                                        type="text"
                                        id="fornecedor"
                                        className="form-control"
                                        value={fornecedor}
                                        onChange={(e) => setFornecedor(e.target.value)}
                                        onMouseDown={() => setValidation(true)} // Define validation como true ao clicar no campo
                                        required
                                    />
                                    {fornecedor.length === 0 && validation && (
                                        <span className="text-danger">Digite o fornecedor</span>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="motorista" className="form-label">Motorista</label>
                                    <input
                                        type="text"
                                        id="motorista"
                                        className="form-control"
                                        value={motorista}
                                        onChange={(e) => setMotorista(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="placadacarreta" className="form-label">Placa da Carreta</label>
                                    <input
                                        type="text"
                                        id="placadacarreta"
                                        className="form-control"
                                        value={placadacarreta}
                                        onChange={(e) => setPlacadacarreta(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="produtos" className="form-label">Produto</label>
                                    <input
                                        type="text"
                                        id="produtos"
                                        className="form-control"
                                        value={produtos}
                                        onChange={(e) => setProdutos(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pesobruto" className="form-label">Peso Bruto</label>
                                    <input
                                        type="text"
                                        id="pesobruto"
                                        className="form-control"
                                        value={pesobruto}
                                        onChange={(e) => setPesobruto(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="valornota" className="form-label">Valor da Nota</label>
                                    <input
                                        type="text"
                                        id="valornota"
                                        className="form-control"
                                        value={valornota}
                                        onChange={(e) => setValornota(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        id="status"
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Na portaria">Na portaria</option>
                                        <option value="Carregando">Carregando</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tipoOperacao" className="form-label">Tipo de Operação</label>
                                    <select
                                        id="tipoOperacao"
                                        className="form-control"
                                        value={tipoOperacao}
                                        onChange={(e) => setTipoOperacao(e.target.value)}
                                    >
                                        <option value="">Selecione o tipo de operação</option>
                                        <option value="Carga">Carga</option>
                                        <option value="Descarga">Descarga</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    {/* Botões para salvar as alterações ou voltar para a lista */}
                                    <button type="submit" className="btn btn-success me-2">Salvar</button>
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

export default EmpEdit;