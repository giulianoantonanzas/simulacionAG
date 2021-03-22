import * as React from 'react';

import { PasoContext } from '../../context/PasoContext'

import Card from './Card/Card';
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
            
            <Card />
            
        </div>
    )

}

export default Content;