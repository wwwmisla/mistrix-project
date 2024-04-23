import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { toast } from "sonner";

export function FormLogin(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        signInError] =
        useSignInWithEmailAndPassword(auth);

    const [
        sendPasswordResetEmail,
        resetPasswordLoading,
        resetPasswordError
    ] = useSendPasswordResetEmail(auth);

    useEffect(() => {
        console.log("Usuário atual:", user);

        // Verifica se o usuário já está autenticado
        if (user) {
            setIsAuthenticated(true);
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
                localStorage.setItem("rememberedPassword", password); // Não é recomendado em um aplicativo real!
            } else {
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
            }
        }
    }, [user, rememberMe, email, password]);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const rememberedPassword = localStorage.getItem("rememberedPassword");
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setPassword(rememberedPassword ?? "");
            setRememberMe(true);
        }
    }, []);

    async function handleSignIn(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        signInWithEmailAndPassword(email, password);

        setError(""); // Limpa o erro antes de tentar fazer login

        try {
            console.log("Tentando fazer login com:", email);
            await signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
        }
    }

    async function handleForgotPassword(): Promise<void> {
        try {
            await sendPasswordResetEmail(email);
            toast.success('E-mail de redefinição de senha enviado com sucesso!', {
                position: 'top-right',
            });
        } catch (error) {
            console.error("Erro ao enviar e-mail de redefinição de senha:", error);
            toast.error('Erro ao enviar e-mail de redefinição de senha. Verifique o e-mail e tente novamente.', {
                position: 'top-right',
            });
        }
    }

    useEffect(() => {
        // Se o usuário estiver autenticado, redirecione para a rota privada
        if (isAuthenticated) {
            console.log("Usuário autenticado. Redirecionando para a página de home...");
            // toast.error('Login realizado com sucesso!', {
            //     position: 'top-right', 
            // });
            navigate('/home');
            // window.location.href = "/home";

        }
    }, [isAuthenticated, navigate]);

    if (loading || resetPasswordLoading) {
        return <p className=" text-lg text-greenOne">Carregando...</p>;
    }

    if (user) {
        console.log(user);
    }

    if (error || resetPasswordError) {
        console.log(error);
    }

    // Fazer testes para verificar se o usuário existe, se a senha está errada...
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

                        <label className="check cursor-pointer text-base hover:underline flex justify-center items-center gap-1">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                                className="check2 visually-hidden"
                            />
                            <span className={`check2-icon ${rememberMe ? 'bg-greenOne' : ''}`}></span>
                            Lembrar-se de mim
                        </label>

                        <a id="forgotPassword" className="cursor-pointer text-base hover:underline" onClick={handleForgotPassword}>Esqueci a senha</a>
                    </div>
                </div>
            </form>
        </div>
    );
}
