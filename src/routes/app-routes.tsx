import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { FormLogin } from "../components/form-login";
import { FormCadastrar } from "../components/form-cadastrar";
import { CardLogado } from "../components/card-logado";

export function AppRoutes() {
    const isAuthenticated = !!localStorage.getItem('user'); 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/register" element={<FormCadastrar />} />
                <Route path="/home" element={<CardLogado />} />
            </Routes>
        </BrowserRouter>
    );
}

interface PrivateRouteProps {
    path: string;
    element: JSX.Element;
    isAuthenticated: boolean;
}

function PrivateRoute({ element, isAuthenticated }: PrivateRouteProps): JSX.Element {
    return isAuthenticated ? element : <Navigate to="/" />
}