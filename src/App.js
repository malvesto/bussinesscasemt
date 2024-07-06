import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmpListing from "./EmpListing";
import EmpCreate from "./Empcreate";
import EmpDetail from "./EmpDetail";
import EmpEdit from "./EmpEdit";
import LoginPage from "./LoginPage";
import CadastroLogin from "./CadastroLogin";
import ManageLoginsPage from "./ManageLoginsPage"; // Importe o componente de gerenciamento de logins aqui

function App() {
    // Estilo para o componente App, define um background de imagem e estilos de padding e altura mínima
    const appStyle = {
        backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/02/93/66/44/1000_F_293664432_OZPteCH5B33DK8kiARpoRPP0x4fA9HjO.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
    };

    return (
        <div className="App" style={appStyle}>
            {/* Título principal do aplicativo */}
            <h1 className="text-center text-light">Gestão de Cargas - Empresa XYZ</h1>
            {/* Configuração do roteador para navegação */}
            <Router>
                <Routes>
                    {/* Rotas definidas para diferentes componentes */}
                    <Route path="/login" element={<LoginPage />} /> {/* página de login */}
                    <Route path="/cadastro-login" element={<CadastroLogin />} /> {/* página de cadastro de login */}
                    <Route path="/" element={<EmpListing />} /> {/* listar cargas */}
                    <Route path="/criar/cargas" element={<EmpCreate />} /> {/* criar novas cargas */}
                    <Route path="/detalhes/cargas/:empid" element={<EmpDetail />} /> {/* detalhes de uma carga específica */}
                    <Route path="/editar/cargas/:empid" element={<EmpEdit />} /> {/* editar uma carga específica */}
                    <Route path="/manage-logins" element={<ManageLoginsPage />} /> {/* gerenciamento de logins */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;