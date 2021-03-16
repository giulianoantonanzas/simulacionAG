import * as React from 'react';

import Inicio from './Inicio/Inicio';
import Perfil from './Perfil/Perfil';
import Seguro from './Seguro/Seguro';
import Diagnostico from './Diagnostico/Diagnostico';
import Centros from './Centros/Centros';
import Resultado from './Resultado/Resultado';


const Card = () => {
    const [paso, setPaso] = React.useState(1);

    const handleAtras = (e) =>{
        e.preventDefault();
    
        if(paso>1){
            let inc = paso - 1;
            setPaso(inc);
        }
         
    }
    
    const handleDelante = (e) =>{
        e.preventDefault();
    
        if(paso<6){
            let inc = paso + 1;
            setPaso(inc);
        }
         
    }
    
    function renderSwitch(){
        switch(paso) {

            case 1:   return <Inicio />;
            case 2:   return <Perfil />;
            case 3:   return <Seguro />;
            case 4:   return <Diagnostico />;
            case 5:   return <Centros />;
            case 6:   return <Resultado />;

           // default:      return <Inicio />
        }
    }

return (    
    <div className="card">
        {renderSwitch()}
        
        <div className="flex-container">
        <button onClick={handleAtras}>atras</button>
        <button onClick={handleDelante} >adelante</button>
        </div>
    </div>
);

  

}

export default Card;