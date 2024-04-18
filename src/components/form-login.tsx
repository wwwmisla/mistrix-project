export function FormLogin() {
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
        <form id="loginForm">
            <div className="text-center">
                {/* Titulo */}
                <p className="titulo">[Mistrix]</p><br />

                {/* Campo do username */}
                <label className="username">Username:</label>
                <input type="text" placeholder="neo@mistrix.com" className="username-text" id="username" required/><br /><br />

                {/* Campo da senha */}
                <label className="password">Password:</label>
                <input type="password" id="password" placeholder="*******" className="password-text" required />
                <button className="checkpass" onClick={pass}></button><br /><br />

                {/* Botão logar */}
                <a href="#"><button type="submit" value="submit" className="botao">Login</button></a>

                {/* Botão para cadastrar-se */}
                <a href="#"><button type="submit" value="submit" className="botao">Cadastrar-se</button></a>

                {/* Opções Lembrar-se de mim e Esqueci a senha */}
                {/* <label className="check"><button className="check2" id="rememberMe"></button> Lembrar-se de mim</label>
                <a className="check"><button className="check2" id="forgotPassword"></button> Esqueci a senha</a> */}
            </div>
        </form>
    )
}