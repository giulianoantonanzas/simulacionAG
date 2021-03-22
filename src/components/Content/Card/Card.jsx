import React, {useContext, useEffect, useState} from 'react';

import Inicio from './Inicio/Inicio';
import Perfil from './Perfil/Perfil';
import Seguro from './Seguro/Seguro';
import Diagnostico from './Diagnostico/Diagnostico';
import Centros from './Centros/Centros';
import Resultado from './Resultado/Resultado';
import {  PasoContext } from '../../../context/PasoContext';

let PasoNew = {
    id: 1,
    nombre: "perfil"
}

const Card = () => {

     const {paso, setPaso} = useContext(PasoContext);
    

    const handleAtras = (e) =>{
        e.preventDefault();
        console.log(paso)
    
        if(paso.id>1){
            let i = paso.id-1;  
            console.log("incre ",i)
             setPaso( {...paso, id: i, nombre:'arranca'});
        }
         
    }
    
    const handleDelante = (e) =>{
        e.preventDefault();
        console.log(paso)
    
        if(paso.id<6){
            let i = paso.id+1;
            console.log("decre ",i)
            setPaso( {...paso, id: i, nombre:'arranca'});
        }
         
    }
    
    function renderSwitch(){
        // console.log("Paso Switch: ",paso.id);

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
        
        <div className="flex-container">
        <button onClick={handleAtras}>atras</button>
        <button onClick={handleDelante} >adelante</button>
        <div style={{width: "200px"}}>
            {JSON.stringify(paso)}
        </div>
        </div>
    </div>
);

  

}

export default Card;