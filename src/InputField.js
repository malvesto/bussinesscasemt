import React from 'react'; // Importa a biblioteca React para criar e manipular componentes

// Componente funcional InputField que recebe props label, value, onChange, type e required
const InputField = ({ label, value, onChange, type = 'text', required }) => {
    return (
        <div className="col-lg-6 mb-3">
            <label className="form-label">{label}</label> {/* Renderiza o rótulo do campo de entrada */}
            <input
                type={type} // Define o tipo de input (default: 'text')
                value={value} // Define o valor do input controlado pelo estado
                onChange={onChange} // Manipula a função de mudança quando o valor do input é alterado
                className="form-control" // Aplica a classe CSS do Bootstrap para estilização
                required={required} // Define se o campo é obrigatório com base na propriedade 'required'
            />
        </div>
    );
};

export default InputField; // Exporta o componente InputField para ser usado em outros módulos