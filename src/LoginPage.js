import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/users');
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const users = await response.json();
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                // Usuário autenticado, redirecionar para página principal
                navigate('/');
            } else {
                alert('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
            alert('Erro ao autenticar usuário');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <InputField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary btn-lg me-2">Entrar</button> {/* Botão Entrar */}
                        <Link to="/" className="btn btn-secondary btn-lg me-2">Cancelar</Link> {/* Botão Cancelar */}
                        <Link to="/cadastro-login" className="btn btn-info btn-lg btn-cadastrar-login">Cadastrar Login</Link> {/* Botão Cadastrar Login */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;