import * as React from 'react';

import { PasoContext } from '../../context/PasoContext'

import CarrouselCard from './Card/CarraouseCards';
import Text from './Text/Text';



const Content = () => {
    const {paso} = React.useContext(PasoContext);

    

    function showText() {
        if(paso.id!=6)
        return  <Text />;
    }

    return(
        <div className="content">
            
             {
                 showText()
             }   
            
            <CarrouselCard />

            <div className="content-text">
                {
                    (paso.id!==6)? <p>Este ejercicio digital es una simulación con base en los datos proporcionados por el usuario.
                         No respresenta ningún compromiso final con alguna aseguradora o sus servicios.</p> 
                    : <p></p> 
                }
                
            </div>
            
        </div>
    )

}

export default Content;