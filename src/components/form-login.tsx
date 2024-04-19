import { useState } from 'react';
import { CardLogado } from './card-logado';

export function FormLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verificar se as credenciais fornecidas correspondem ao usuário de exemplo
        if (username === 'misla' && password === 'misla123') {
            setLoggedIn(true);
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
    };

    // Visualizar a senha
    const pass = () => {
        var x = document.getElementById("password") as HTMLInputElement;
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    };

    return (
        // Formulário de login
        <form id="loginForm" onSubmit={handleLogin}>
            {!loggedIn ? (
                <div className="flex flex-col text-center gap-6">
                    {/* Titulo */}
                    <p id="titulo" className="text-3xl">[Mistrix]</p>

                    {/* Campos */}
                    <div className="flex flex-wrap gap-2">
                        {/* Campo do username */}
                        <label className="username text-lg mr-1">Username:</label>
                        <input id="username" type="passwpord" placeholder="mistrix" className="username-text w-52 h-8 p-1 bg-black" required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />

                        {/* Campo da senha */}
                        <label className="password text-lg mr-2">Password:</label>
                        <input id="password" type="password" placeholder="*******" className="password-text w-52 h-8 p-1 bg-black" required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='button' className="checkpass w-[15px] h-[15px] rounded-3xl bg-black cursor-pointer mt-2 -ml-[35px] hover:bg-greenOne" onClick={pass}></button>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-center gap-3">
                        {/* Botão logar */}
                        <a href="#"><button id="btn-login" type="submit" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-bgOne">Login</button></a>

                        {/* Botão para cadastrar-se */}
                        <a href="#"><button id="btn-cadastrar" type="button" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-black">Cadastrar-se</button></a>
                    </div>

                    {/* Opções Lembrar-se de mim e Esqueci a senha */}
                    <div className="flex flex-col">
                        <label className="check cursor-pointer text-base hover:underline">
                            <button className="check2 w-[15px] h-[15px] rounded-3xl cursor-pointer bg-black mr-1 hover:bg-greenOne" id="rememberMe"></button>Lembrar-se de mim
                        </label>
                        <a id="forgotPassword" className="cursor-pointer text-base hover:underline">Esqueci a senha</a>
                    </div>
                </div>
            ) : (
                <CardLogado username={username}/>
            )}
        </form>
    )
}