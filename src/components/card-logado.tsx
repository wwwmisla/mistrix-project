interface CardLogadoProps {
    username: string;
}

export function CardLogado ({ username }: CardLogadoProps) {
    return (
        <div>
            <h1>Bem-vindo, {username}!</h1>
            <p>Você entrou na página secreta!</p>
            {/* Outros elementos do componente CardLogado */}
        </div>
    );
}