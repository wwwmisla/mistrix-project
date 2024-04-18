import { MatrixMusic } from './components/matrix-music'
import { Canvas } from './components/canvas'
import { FormLogin } from './components/form-login'

export function App() {
  return (
    <div id='fade-in-image'>
      <MatrixMusic />
      <Canvas />
      <div id='tabela'>
        <FormLogin />
      </div>
    </div>
  )
}