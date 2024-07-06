import React from 'react';

const SelectField = ({ label, value, onChange, options }) => {
    return (
        <div className="col-lg-6 mb-3">
            <label className="form-label">{label}</label> {/* Rótulo do campo de seleção */}
            <select
                value={value} // Define o valor selecionado no campo de seleção
                onChange={onChange} // Função para lidar com a mudança de seleção
                className="form-select" // Classe Bootstrap para estilização do campo de seleção
            >
                {/* Mapeia as opções disponíveis para criar os elementos <option> */}
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;