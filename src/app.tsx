import { MatrixMusic } from './components/matrix-music'
import { Canvas } from './components/canvas'
import { FormLogin } from './components/form-login'

export function App() {
  return (
    <div id='fade-in-image' className='m-0 p-0 overflow-hidden bg-black'>
      <MatrixMusic />
      <Canvas />
      <div id='tabela' className='absolute top-1/2 left-1/2 bg-bgOne text-greenOne w-[400px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 p-4'>
        <FormLogin />
      </div>
    </div>
  )
}