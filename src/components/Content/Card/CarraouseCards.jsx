import React, {useState , useContext, useEffect} from 'react';
import Inicio from './Inicio/Inicio';
//import Perfil from './Perfil/Perfil';
import Seguro from './Seguro/Seguro';
import Diagnostico from './Diagnostico/Diagnostico';
import Centros from "./Centros/Centros";
import Resultado from './Resultado/Resultado';
import Arrow from './img/Arrow.svg'
import ArrowUp from './img/ArrowUp.svg'
import { PasoContext } from '../../../context/PasoContext';



const Carrousel = () =>{

    const {paso} = useContext(PasoContext);
    const [pagina,setPagina]= useState(paso.id)
    const siguientePagina=()=>{
        if(pagina<4){
            setPagina(pagina+1)
            paso.id++;
        }
    }

    const anteriorPagina = () =>{
        if(pagina>1){
            setPagina(pagina-1)
            paso.id--;
        }
    }

    useEffect(()=>{
        setPagina(paso.id)
    })

    return(
        <div className="card">
            <img className={`arrow-left ${pagina===1? "light": "blod"}`} onClick={()=>anteriorPagina()} src={pagina!==1? ArrowUp :Arrow } alt="izquierda"/>

            {
                paso.id==1? <Inicio /> :
                //paso.id==2? <Perfil /> : se quito esta pantalla por requerimiento
                paso.id==2? <Seguro />:
                paso.id==3? <Diagnostico /> :
                paso.id==4? <Centros /> :
                paso.id==5? <Resultado /> : null
            }

            <img className={`arrow-right  ${pagina<4? "blod": "light"}`} onClick={()=>siguientePagina()} src={pagina<4? ArrowUp :Arrow} alt="derecha"/>
        </div>
    )
}
export default Carrousel