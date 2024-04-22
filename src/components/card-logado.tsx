import { Link, Navigate } from "react-router-dom";
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import firebase from "firebase/compat/app";

export function CardLogado() {
    const [user] = useAuthState(auth); 

    const userEmail = (user as firebase.User)?.email?.split('@')[0] || '';

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

    const [
        signOut,
        loading,
        error
    ] = useSignOut(auth);

    async function handleSignOut() {
        await signOut();
        console.log('Você foi desconectado!');
    }

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