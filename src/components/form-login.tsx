import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseConfig";

export function FormLogin(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        signInError] =
        useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        // Verifica se o usuário já está autenticado
        if (user) {
            setIsAuthenticated(true);
        }
    }, [user]);

    async function handleSignIn(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        signInWithEmailAndPassword(email, password);

        setError(""); // Limpa o erro antes de tentar fazer login

        try {
            await signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
        }
    }

    useEffect(() => {
        // Se o usuário estiver autenticado, redirecione para a rota privada
        if (isAuthenticated) {
            window.location.href = "/home";
        }
    }, [isAuthenticated]);

    // if (loading) {
    //     return <p>Carregando...</p>;
    // }

    // if (user) {
    //     console.log(user);
    // }

    // if (error) {
    //     console.log(error);
    // }

    return (
        <div className='tabela absolute top-1/2 left-1/2 bg-bgOne text-greenOne w-[400px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 p-4'>
            <form id="loginForm" onSubmit={handleSignIn}>
                <div className="flex flex-col text-center gap-6">
                    <p id="titulo" className="text-3xl">[Mistrix]</p>
                    <div className="flex flex-wrap gap-2">
                        <label className="username text-lg mr-[54px]">E-mail:</label>
                        <input id="email" type="email" placeholder="mistrix@example.com" className="email-text w-52 h-8 p-1 bg-black" required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label className="password text-lg mr-[26px]">Password:</label>
                        <input id="password" type={showPassword ? "text" : "password"} placeholder="*******" className="password-text w-52 h-8 p-1 bg-black" required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button type="button" className="checkpass w-[15px] h-[15px] rounded-3xl bg-black cursor-pointer mt-2 -ml-[35px] hover:bg-greenOne" onClick={() => setShowPassword(!showPassword)}></button>
                    </div>
                    <div className="flex justify-center gap-3">
                        <button id="btn-login" type="submit" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-bgOne">Login</button>
                        <Link to={'/register'}>
                            <button id="btn-cadastrar" type="button" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-black">Cadastrar-se</button>
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        <label className="check cursor-pointer text-base hover:underline hover:cursor-not-allowed">
                            <button className="check2 w-[15px] h-[15px] rounded-3xl cursor-pointer bg-black mr-1 hover:bg-greenOne" id="rememberMe"></button>Lembrar-se de mim
                        </label>
                        <a id="forgotPassword" className="cursor-pointer text-base hover:underline hover:cursor-not-allowed">Esqueci a senha</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
