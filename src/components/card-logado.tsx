import { Link, Navigate } from "react-router-dom";
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";

export function CardLogado(): JSX.Element {
    // Obtém os dados do usuário autenticado
    const [user] = useAuthState(auth);

    useEffect(() => {
        // Verificar se o usuário está autenticado
        if (!user) {
            // Redirecionar para a página de login se não estiver autenticado
            return () => <Navigate to="/" />;
        }

        // Limpeza quando o componente é desmontado
        return () => {
            // Aqui você pode realizar ações de limpeza, se necessário
        };
    }, [user]);

    const [
        signOut,
        loading,
        error
    ] = useSignOut(auth);

    const handleSignOut = async () => {
        try {
            await signOut();
            console.log('Você foi desconectado!');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    // Extrai o nome de usuário a partir do email
    const userEmail = (user as firebase.User)?.email?.split('@')[0] || '';

    // Calcula o tempo desde o cadastro do usuário
    let timeSinceRegistration = '';
    if (user && user.metadata.creationTime) {
        const registrationDate = new Date(user.metadata.creationTime);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - registrationDate.getTime();

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        timeSinceRegistration = `${days} dias, ${hours} horas e ${minutes} minutos`;
    }

    // Renderiza o componente do usuário autenticado
    return (
        <div id="card-logado" className='tabela absolute top-1/2 left-1/2 bg-bgOne text-greenOne w-[1200px] h-[600px] transform -translate-x-1/2 -translate-y-1/2 p-4'>
            <div className="header-card opacity-90 bg-greenOne text-black p-5 grid-row-2">
                {user && (
                    <>
                        <p>Bem-vindo, {userEmail}!</p>
                        <p>Você está cadastrado há {timeSinceRegistration}.</p>
                    </>
                )}
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <Link to={'/'}>
                    <button id="btn-cadastrar" className="botao text-lg cursor-pointer w-[250px] h-[40px] bg-bgOne" onClick={handleSignOut}>Sair</button>
                </Link>
            </div>
        </div>
    );
}