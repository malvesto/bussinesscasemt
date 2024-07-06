import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';

const CadastroLogin = () => {
    // local para armazenar o nome de usuário e senha
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        try {
            // Requisição POST para cadastrar o usuário
            const response = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, password }),
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                alert('Usuário cadastrado com sucesso!'); // Exibe alerta de sucesso
                navigate('/login'); // Navega para a página de login após o cadastro
            } else {
                throw new Error('Erro ao cadastrar usuário'); // Lança um erro se a requisição não for bem-sucedida
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error); // Exibe o erro no console
            alert('Erro ao cadastrar usuário'); // Exibe um alerta de erro ao usuário
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Cadastrar Login</h2>
                {/* Formulário para cadastrar um novo login */}
                <form onSubmit={handleSubmit}>
                    {/* Componente InputField para o campo de usuário */}
                    <InputField
                        label="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {/* Componente InputField para o campo de senha */}
                    <InputField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Botões para cadastrar ou cancelar o cadastro */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/login')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CadastroLogin;