import * as React from 'react';

import Inicio from './Inicio/Inicio';
import Perfil from './Perfil/Perfil';
import Seguro from './Seguro/Seguro';
import Diagnostico from './Diagnostico/Diagnostico';
import Centros from './Centros/Centros';
import Resultado from './Resultado/Resultado';


const Card = () => {
    const [inicio, setInicio] = React.useState('seguro');
    
    function renderSwitch(){
        switch(inicio) {

            case "inicio":   return <Inicio />;
            case "perfil":   return <Perfil />;
            case "seguro":   return <Seguro />;
            case "diagnostico":   return <Diagnostico />;
            case "centros":   return <Centros />;
            case "resultado":   return <Resultado />;
            

            default:      return <h1>No project match</h1>
        }
    }

return (    
    <div className="card">
        {renderSwitch()}
    </div>
);

  

}

export default Card;