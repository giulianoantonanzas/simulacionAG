import React, {useContext} from 'react';

import Inicio from './Inicio/Inicio';
import Perfil from './Perfil/Perfil';
import Seguro from './Seguro/Seguro';
import Diagnostico from './Diagnostico/Diagnostico';
import Centros from './Centros/Centros';
import Resultado from './Resultado/Resultado';
import {  PasoContext } from '../../../context/PasoContext';



const Card = () => {

     const {paso} = useContext(PasoContext);
    
    function renderSwitch(){
        console.log(paso)
        switch(paso.id) {
            case 1:   return <Inicio />;
            case 2:   return <Perfil />;
            case 3:   return <Seguro />;
            case 4:   return <Diagnostico />;
            case 5:   return <Centros />;
            case 6:   return <Resultado />;
        }
    }

return ( 
    
    <div className="card">
        {renderSwitch()}
    </div>
);

  

}

export default Card;