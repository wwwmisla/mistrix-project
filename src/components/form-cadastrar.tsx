import React, { useState } from 'react';

interface LoginData {
    username: string;
    email: string;
    password: string;
}

interface Props {
    onCadastroSuccess: () => void;
}

export function FormCadastrar({ onCadastroSuccess }: Props) {
    const [formData, setFormData] = useState<LoginData>({
        username: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        const encryptedPassword = btoa(formData.password); // Criptografa a senha usando base64
        const loginData: LoginData = { ...formData, password: encryptedPassword };
        const logins: LoginData[] = JSON.parse(localStorage.getItem('mistrix') || '[]');
        logins.push(loginData);
        localStorage.setItem('mistrix', JSON.stringify(logins));
        setFormData({
            username: '',
            email: '',
            password: '',
        });
        setConfirmPassword('');
        alert('Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
        setTimeout(() => {
            onCadastroSuccess(); // Redirecionamento
        }, 2000); // Tempo em milissegundos
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    return (
        <div className='tabela absolute top-1/2 left-1/2 bg-bgOne text-greenOne w-[440px] h-[460px] transform -translate-x-1/2 -translate-y-1/2 p-4'>
            <form id="cadastroForm" onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <div className="flex flex-col text-center gap-6">

                    <p id="titulo" className="text-3xl">Cadastre-se no [Mistrix]</p>

                    <div className="flex flex-col gap-2 items-start">

                        <label className="username text-lg">Username:</label>
                        <input id="username" type="text" placeholder="mistrix" className="username-text w-[300px] h-8 p-1 bg-black" required value={formData.username} onChange={handleInputChange} />

                        <label className="email text-lg">Email:</label>
                        <input id="email" type="email" placeholder="mistrix@example.com" className="email-text w-[300px] h-8 p-1 bg-black" required value={formData.email} onChange={handleInputChange} />

                        <label className="password text-lg">Senha:</label>
                        <div className="relative flex items-center">
                            <input id="password" type={showPassword ? "text" : "password"} placeholder="*******" className="password-text w-[300px] h-8 p-1 bg-black" required value={formData.password} onChange={handleInputChange} />
                            <button type="button" className="checkpass w-[15px] h-[15px] rounded-3xl bg-black cursor-pointer mt-0 -ml-[35px] hover:bg-greenOne" onClick={toggleShowPassword}></button>
                        </div>

                        <label className="confirm-password text-lg">Confirme a Senha:</label>
                        <div className="relative flex items-center">
                            <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="*******" className="password-text w-[300px] h-8 p-1 bg-black" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <button type="button" className="checkpass w-[15px] h-[15px] rounded-3xl bg-black cursor-pointer mt-0 -ml-[35px] hover:bg-greenOne" onClick={toggleShowConfirmPassword}></button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                        <button id="btn-cadastrar" type="submit" className="botao text-lg cursor-pointer w-[150px] h-[40px] bg-bgOne">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
