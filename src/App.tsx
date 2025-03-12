import { useState } from 'react'
import './App.css'
import CardUsuario from './App/Componentes/Card_usuario/Card_usuario'
import CardComentario from './App/Componentes/Card_comentarios/Card_comentarios'
import HomeUsuario from './App/Vistas/Home_Usuario/Home_usuario'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <CardUsuario
  nombre="Roberto Pettinato"
  cantidadPersonas={2}
  foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
  desde="Av Siempre viva"
  hacia="Calle falsa"
  horario={1800}
  importe={1500}
/> */}

{/* <CardComentario
  nombre="Blas Armando Giunta"
  fecha= "1/1/2000"
  foto="https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
  puntuacion= '4'
  comentario="lindo viaje"
/> */}

  <HomeUsuario></HomeUsuario>
    </>
  )
}

export default App
