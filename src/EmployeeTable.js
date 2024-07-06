import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ActionButtons from "./ActionButtons";

const EmployeeTable = ({ empdata, shouldDisplayItem, loadEdit, removeFunction, loadDetail }) => {

    // Função para lidar com o download do relatório CSV
    const handleDownload = () => {
        const csvContent = generateCSV(empdata);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Função para gerar o conteúdo CSV a partir dos dados fornecidos
    const generateCSV = (data) => {
        const header = ['Tipo de Operação', 'Fornecedor', 'Motorista', 'Placa Carreta', 'Produto', 'Peso Bruto', 'Valor Nota', 'Status'].join(',');
        const rows = data.map(item => [item.tipoOperacao, item.fornecedor, item.motorista, item.placadacarreta, item.produtos, item.pesobruto, item.valornota, item.status].join(','));
        return [header, ...rows].join('\n');
    };

    return (
        <div className="table-responsive">
            <div className="mb-3">
                <button className="btn btn-warning" onClick={handleDownload}>
                    <FontAwesomeIcon icon={faDownload} /> Baixar Relatório
                </button>
            </div>
            <table className="table table-striped table-bordered text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Tipo de Operação</th>
                        <th>Fornecedor</th>
                        <th>Motorista</th>
                        <th>Placa Carreta</th>
                        <th>Produto</th>
                        <th>Peso Bruto</th>
                        <th>Valor Nota</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {empdata &&
                        empdata.map((item) => (
                            shouldDisplayItem(item) && (
                                <tr key={item.id}>
                                    <td>{item.tipoOperacao}</td>
                                    <td>{item.fornecedor}</td>
                                    <td>{item.motorista}</td>
                                    <td>{item.placadacarreta}</td>
                                    <td>{item.produtos}</td>
                                    <td>{item.pesobruto}</td>
                                    <td>{item.valornota}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {/* Componente ActionButtons para renderizar os botões de ação */}
                                        <ActionButtons
                                            item={item}
                                            loadEdit={loadEdit}
                                            removeFunction={removeFunction}
                                            loadDetail={loadDetail}
                                        />
                                    </td>
                                </tr>
                            )
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;