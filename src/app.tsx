import { useState } from 'react';
import { MatrixMusic } from './components/matrix-music';
import { Canvas } from './components/canvas';
import { FormCadastrar } from './components/form-cadastrar';
import { FormLogin } from './components/form-login';

// Controlar qual formulário deve ser exibido na home

export function App() {
  const [mostrarLogin, setMostrarLogin] = useState(true);

    const handleMostrarCadastro = () => {
        setMostrarLogin(false);
    };

    const handleCadastroSucesso = () => {
        setMostrarLogin(true);
    };

  return (
    <div id='fade-in-image' className='m-0 p-0 overflow-hidden bg-black'>

      <MatrixMusic />

      <Canvas />
      
      {mostrarLogin ? (
                <FormLogin onMostrarCadastro={handleMostrarCadastro} />
            ) : (
                <FormCadastrar onCadastroSucesso={handleCadastroSucesso} />
            )}
    </div>
  );
}
