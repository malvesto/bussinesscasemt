import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";

const EmpListing = () => {
    const [empdata, setEmpdata] = useState(null); // armazenar os dados das cargas
    const [filterStatus, setFilterStatus] = useState(""); // armazenar o status do filtro
    const [filterMotorista, setFilterMotorista] = useState(""); // armazenar o filtro de motorista
    const [filterTipoOperacao, setFilterTipoOperacao] = useState(""); // armazenar o filtro de tipo de operação
    const navigate = useNavigate(); 

    // Função para carregar os detalhes de uma carga
    const loadDetail = (id) => {
        navigate(`/detalhes/cargas/${id}`);
    };

    // Função para carregar a página de edição de uma carga
    const loadEdit = (id) => {
        navigate(`/editar/cargas/${id}`);
    };

    // Função para remover uma carga
    const removeFunction = (id) => {
        if (window.confirm("Você deseja remover?")) {
            fetch(`http://localhost:8000/employee/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    alert("Removido com sucesso.");
                    window.location.reload(); // Recarrega a página para atualizar a lista (idealmente, usar estado)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    // Efeito para carregar os dados das cargas ao carregar o componente
    useEffect(() => {
        fetch("http://localhost:8000/employee")
            .then((res) => res.json())
            .then((resp) => setEmpdata(resp))
            .catch((err) => console.log(err.message));
    }, []);

    // Função para filtrar os dados com base no status selecionado
    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    // Função para filtrar os dados com base no motorista selecionado
    const handleFilterMotoristaChange = (e) => {
        setFilterMotorista(e.target.value);
    };

    // Função para filtrar os dados com base no tipo de operação selecionado
    const handleFilterTipoOperacaoChange = (e) => {
        setFilterTipoOperacao(e.target.value);
    };

    // Função para verificar se um item deve ser exibido com base nos filtros aplicados
    const shouldDisplayItem = (item) => {
        const statusPass = filterStatus === "" || item.status === filterStatus;
        const motoristaPass =
            filterMotorista === "" || item.motorista.toLowerCase().includes(filterMotorista.toLowerCase());
        const tipoOperacaoPass = filterTipoOperacao === "" || item.tipoOperacao === filterTipoOperacao;

        return statusPass && motoristaPass && tipoOperacaoPass;
    };

    // Função para redirecionar para a página de login
    const redirectToLogin = () => {
        navigate("/login"); // Substitua "/login" pelo caminho correto da página de login
    };

    // Função para sair do login e retornar para a tela de login
    const handleLogout = () => {
        // Implemente aqui a lógica de logout, se necessário
        redirectToLogin();
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h2 className="card-title">Cargas Entrada/Saída</h2>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-danger me-2" onClick={handleLogout}>
                            Sair
                        </button>
                        <Link to="/manage-logins" className="btn btn-secondary">
                            Gerenciar Logins
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-3 row">
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={redirectToLogin}>
                                Ir para Login
                            </button>
                        </div>
                        <div className="col-auto">
                            <Link to="/cadastro-login" className="btn btn-info">
                                Cadastrar Novo Login
                            </Link>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="col-auto">
                            <Link to="/criar/cargas" className="btn btn-success">
                                Adicionar Carga/Descarga (+)
                            </Link>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="statusFilter" className="form-label">
                                Filtrar por Status:
                            </label>
                            <select
                                id="statusFilter"
                                className="form-select"
                                value={filterStatus}
                                onChange={handleFilterChange}
                            >
                                <option value="">Todos</option>
                                <option value="Na portaria">Na portaria</option>
                                <option value="Carregando">Carregando</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="motoristaFilter" className="form-label">
                                Filtrar por Motorista:
                            </label>
                            <input
                                type="text"
                                id="motoristaFilter"
                                className="form-control"
                                value={filterMotorista}
                                onChange={handleFilterMotoristaChange}
                            />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="tipoOperacaoFilter" className="form-label">
                                Filtrar por Tipo de Operação:
                            </label>
                            <select
                                id="tipoOperacaoFilter"
                                className="form-select"
                                value={filterTipoOperacao}
                                onChange={handleFilterTipoOperacaoChange}
                            >
                                <option value="">Todos</option>
                                <option value="Carga">Carga</option>
                                <option value="Descarga">Descarga</option>
                            </select>
                        </div>
                    </div>

                    {/* Componente EmployeeTable para exibir a tabela de cargas */}
                    <EmployeeTable
                        empdata={empdata}
                        shouldDisplayItem={shouldDisplayItem}
                        loadEdit={loadEdit}
                        removeFunction={removeFunction}
                        loadDetail={loadDetail}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmpListing;