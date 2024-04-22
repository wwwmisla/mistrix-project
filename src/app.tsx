import { MatrixMusic } from './components/matrix-music';
import { Canvas } from './components/canvas';
import { AppRoutes } from './routes/app-routes';

// Controlar qual formulário deve ser exibido na home
export function App() {
  return (
    <div id='fade-in-image' className='m-0 p-0 overflow-hidden bg-black'>
      <MatrixMusic />
      <Canvas />
      <AppRoutes />
    </div>
  );
}
