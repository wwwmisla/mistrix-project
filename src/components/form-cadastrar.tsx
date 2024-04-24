import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";

export function FormCadastrar() {
    // const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleSignOut(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        createUserWithEmailAndPassword(email, password);
        navigate('/');
    }

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className='tabela absolute top-1/2 left-1/2 bg-bgOne text-greenOne w-[440px] h-[460px] transform -translate-x-1/2 -translate-y-1/2 p-4'>
            <form id="cadastroForm" className="flex flex-col justify-center items-center" onSubmit={handleSignOut}>
                <div className="flex flex-col text-center gap-6">

                    <p id="titulo" className="text-3xl">Cadastre-se no [Mistrix]</p>

                    <div className="flex flex-col gap-2 items-start">

                        {/* <label className="username text-lg">Username:</label>
                        <input id="username" type="text" placeholder="mistrix" className="username-text w-[300px] h-8 p-1 bg-black" required onChange={(event) => setUsername(event.target.value)} /> */}

                        <label className="email text-lg">E-mail:</label>
                        <input id="email" type="email" placeholder="mistrix@example.com" className="email-text w-[300px] h-8 p-1 bg-black" required value={email} onChange={(event) => setEmail(event.target.value)} />

                        <label className="password text-lg">Senha:</label>
                        <div className="relative flex items-center">
                            <input id="password" type={showPassword ? "text" : "password"} placeholder="*******" className="password-text w-[300px] h-8 p-1 bg-black" required value={password} onChange={(event) => setPassword(event.target.value)} />
                            <button type="button" className="checkpass w-[15px] h-[15px] rounded-3xl bg-black cursor-pointer mt-0 -ml-[35px] hover:bg-greenOne" onClick={() => setShowPassword(!showPassword)}></button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <button id="btn-cadastrar" type="submit" className="botao text-lg cursor-pointer w-[250px] h-[40px] bg-bgOne">Cadastrar</button>
                        <Link to={'/'}>
                            <button id="btn-cadastrar" className="botao text-lg cursor-pointer w-[250px] h-[40px] bg-bgOne">Cancelar</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
