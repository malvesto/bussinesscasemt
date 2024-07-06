import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Componente funcional para o cabeçalho do card
const CardHeader = ({ title }) => {
    return (
        <div className="card-header bg-dark text-white">
            <h2 className="card-title">{title}</h2>
        </div>
    );
};

// Componente funcional para o corpo do card com os detalhes da carga
const CardBody = ({ empdata }) => {
    return (
        <div className="card-body">
            {empdata ? (
                <div>
                    {/* Exibe os detalhes da carga se empdata estiver definido */}
                    <h2>
                        Fornecedor: {empdata.fornecedor} ({empdata.id})
                    </h2>
                    <h3>Detalhes</h3>
                    <h5>Motorista: {empdata.motorista} </h5>
                    <h5>Placa da Carreta: {empdata.placadacarreta} </h5>
                    <h5>Produto: {empdata.produtos} </h5>
                    <h5>Peso Bruto: {empdata.pesobruto} </h5>
                    <h5>Valor da Nota: {empdata.valornota} </h5>
                    <h5>Status: {empdata.status} </h5>
                    <h5>Tipo de Operação: {empdata.tipoOperacao} </h5> {/* Adicionado */}
                    {/* Botão para voltar para a lista de cargas */}
                    <Link to="/" className="btn btn-danger">Voltar para Lista</Link>
                </div>
            ) : (
                // Exibe "Carregando..." se empdata ainda não estiver definido
                <p>Carregando...</p>
            )}
        </div>
    );
};

// Componente principal para exibir os detalhes da carga específica
const EmpDetail = () => {
    const { empid } = useParams(); // Obtém o parâmetro de rota empid
    const [empdata, setEmpdata] = useState(null); // Estado para armazenar os dados da carga
    const [loading, setLoading] = useState(true); // Estado para controlar o estado de carregamento
    const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

    // Efeito para carregar os dados da carga ao montar o componente
    useEffect(() => {
        fetch(`http://localhost:8000/employee/${empid}`) // GET para obter os dados da carga específica
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erro ao carregar dados: ${res.status}`); // Lança um erro se não for bem-sucedido
                }
                return res.json(); // Converte a resposta para JSON
            })
            .then((data) => {
                setEmpdata(data); // Atualiza o estado empdata com os dados recebidos
            })
            .catch((err) => {
                console.error("Erro ao carregar dados:", err); // Registra o erro no console
                setError(err.message); // Atualiza o estado de erro com a mensagem de erro
            })
            .finally(() => {
                setLoading(false); // Marca o carregamento como concluído, independentemente do resultado
            });
    }, [empid]); // Dependência do useEffect: empid, para recarregar os dados quando o ID da carga mudar

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    {/* Card que exibe as informações da carga */}
                    <div className="card">
                        {/* Componente CardHeader para o cabeçalho do card */}
                        <CardHeader title="Informações da Carga" />
                        {/* Componente CardBody para o corpo do card com os detalhes da carga */}
                        <CardBody empdata={empdata} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpDetail;