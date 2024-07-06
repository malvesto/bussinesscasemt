import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente ActionButtons
 * Renderiza um grupo de botões de ação (Editar, Remover, Detalhes) para um item específico.
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.item - Item ao qual as ações estão relacionadas
 * @param {Function} props.loadEdit - Função para carregar a edição do item
 * @param {Function} props.removeFunction - Função para remover o item
 * @param {Function} props.loadDetail - Função para carregar os detalhes do item
 */
const ActionButtons = ({ item, loadEdit, removeFunction, loadDetail }) => {
    return (
        <div className="btn-group" role="group" aria-label="Ações">
            {/* Botão de Editar */}
            <button
                onClick={() => loadEdit(item.id)} // Ao clicar, chama a função loadEdit passando o ID do item
                className="btn btn-sm btn-success me-1" // Estilo do botão
                title="Editar" // Título exibido ao passar o mouse sobre o botão
            >
                <FontAwesomeIcon icon={faEdit} /> {/* Ícone de lápis para edição */}
            </button>
            {/* Botão de Remover */}
            <button
                onClick={() => removeFunction(item.id)} // Ao clicar, chama a função removeFunction passando o ID do item
                className="btn btn-sm btn-danger me-1" // Estilo do botão
                title="Remover" // Título exibido ao passar o mouse sobre o botão
            >
                <FontAwesomeIcon icon={faTrashAlt} /> {/* Ícone de lixeira para remover */}
            </button>
            {/* Botão de Detalhes */}
            <button
                onClick={() => loadDetail(item.id)} // Ao clicar, chama a função loadDetail passando o ID do item
                className="btn btn-sm btn-primary" // Estilo do botão
                title="Detalhes" // Título exibido ao passar o mouse sobre o botão
            >
                <FontAwesomeIcon icon={faInfoCircle} /> {/* Ícone de círculo com ponto de exclamação para detalhes */}
            </button>
        </div>
    );
};

export default ActionButtons;