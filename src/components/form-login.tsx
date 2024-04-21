import React, { useState } from 'react';

export function FormLogin({ onMostrarCadastro }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verificar as credenciais (adapte conforme necessário)
        if (username === 'admin' && password === 'admin') {
            alert('Login bem-sucedido!');
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className='tabela absolute top-1/2 left-1/2 bg-bgOne text-greenOne w-[400px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 p-4'>
            <form id="loginForm" onSubmit={handleLogin}>
                <div className="flex flex-col text-center gap-6">
                    <p id="titulo" className="text-3xl">[Mistrix]</p>
                    <div className="flex flex-wrap gap-2">
                        <label className="username text-lg mr-1">Username:</label>
                        <input id="username" type="text" placeholder="mistrix" className="username-text w-52 h-8 p-1 bg-black" required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="password text-lg mr-2">Password:</label>
                        <input id="password" type="password" placeholder="*******" className="password-text w-52 h-8 p-1 bg-black" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center gap-3">
                        <button id="btn-login" type="submit" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-bgOne">Login</button>
                        <button id="btn-cadastrar" type="button" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-black" onClick={onMostrarCadastro}>Cadastrar-se</button>
                    </div>
                    <div className="flex flex-col">
                        <label className="check cursor-pointer text-base hover:underline">
                            <button className="check2 w-[15px] h-[15px] rounded-3xl cursor-pointer bg-black mr-1 hover:bg-greenOne" id="rememberMe"></button>Lembrar-se de mim
                        </label>
                        <a id="forgotPassword" className="cursor-pointer text-base hover:underline">Esqueci a senha</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
