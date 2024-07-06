import React, { useState, useEffect } from 'react'; // Importa a biblioteca React e os hooks useState e useEffect
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

const ManageLoginsPage = () => {
    const [users, setUsers] = useState([]); // armazenar os usuários
    const [editingUser, setEditingUser] = useState(null); // armazenar o usuário em edição
    const [username, setUsername] = useState(''); // armazenar o nome de usuário
    const [password, setPassword] = useState(''); // armazenar a senha
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(); // Carrega os usuários ao montar o componente
    }, []);

    // Função para buscar os usuários na API
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/users'); // obter os usuários
            const data = await response.json(); // Converte a resposta para JSON
            setUsers(data); // Atualiza o estado de usuários com os dados recebidos
        } catch (error) {
            console.error('Error fetching users:', error); 
        }
    };

    // Função para configurar o modo de edição para um usuário específico
    const handleEdit = (user) => {
        setEditingUser(user); // Define o usuário em edição
        setUsername(user.username); // Define o nome de usuário no estado
        setPassword(user.password); // Define a senha no estado
    };

    // Função para salvar as alterações do usuário
    const handleSave = async () => {
        if (editingUser) {
            try {
                const updatedUser = { ...editingUser, username, password }; // Cria um novo objeto de usuário com os dados atualizados
                await fetch(`http://localhost:8000/users/${editingUser.id}`, { // atualizar o usuário na API
                    method: 'PUT', // Método HTTP PUT para atualização
                    headers: {
                        'Content-Type': 'application/json', // Tipo de conteúdo JSON
                    },
                    body: JSON.stringify(updatedUser), 
                });
                setEditingUser(null); // Limpa o estado de usuário em edição
                fetchUsers(); // Recarrega a lista de usuários após a atualização
            } catch (error) {
                console.error('Error updating user:', error); 
            }
        } else {
            // Lógica para criar um novo usuário
        }
    };

    // Função para excluir um usuário
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) { // Confirmação via janela de diálogo
            try {
                await fetch(`http://localhost:8000/users/${id}`, { // excluir o usuário na API
                    method: 'DELETE', // Método HTTP DELETE para exclusão
                });
                fetchUsers(); // Recarrega a lista de usuários após a exclusão
            } catch (error) {
                console.error('Error deleting user:', error); 
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gerenciar Logins</h2>

            {/* Tabela para exibir os usuários */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeia cada usuário para uma linha na tabela */}
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                {/* Botões para editar e excluir cada usuário */}
                                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(user)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(user.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulário para editar o usuário selecionado */}
            {editingUser && (
                <div>
                    <h3>Editar Usuário</h3>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Usuário
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* Botão para salvar as alterações do usuário */}
                    <button className="btn btn-primary" onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            )}

            {/* Botão para voltar à página inicial */}
            <div className="mt-3">
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default ManageLoginsPage; 