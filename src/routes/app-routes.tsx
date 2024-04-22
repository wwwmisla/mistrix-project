import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { FormLogin } from "../components/form-login";
import { FormCadastrar } from "../components/form-cadastrar";
import { CardLogado } from "../components/card-logado";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

function PrivateRoute({ element }: { element: JSX.Element }) {
    const [user] = useAuthState(auth);
    return user ? element : <Navigate to="/" />;
}

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormLogin />} />
                <Route path="/register" element={<FormCadastrar />} />
                <Route path="/home" element={<PrivateRoute element={<CardLogado />} />} />
            </Routes>
        </BrowserRouter>
    );
}