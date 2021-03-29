import React, {createContext, useState} from 'react';

export const PasoContext = createContext();

const pasoHard = {
    id: 1,
    // --Perfil-- //
    gender: '',
    edad: '',
    //--------------//
    //-- Seguro --//
    aseguradora: '',
    suma_asegurada: '', 
    coaseguro: '', 
    deducible: '', 
    vigencia: '',
    //-----------------//
    //-- Diagnostico --//
    mama: '', 
    hormonal: '', 
    her: '', 
    brca: '',
    //------------------//
    //-- Centro --//
    centro:'',
    //-----------------//
    //-- Datos enviados Backend e.g Perfil 1 --//
    id_receptor_hormonal: 1,	
    id_status_her: 1,	
    id_status_brca: 3,	
    id_etapa_cdm: 1,	
    id_aseguradora: 1,	
    id_institucion: 1,
    //suma_asegurada: 0,
    //deducible: 0,
    //coaseguro: 0,  
    //------------------------//
}

export const PasoProvider = ({children}) => {

    const [paso, setPaso] = useState(pasoHard);

    return (
        <PasoContext.Provider value={{
            paso,
            setPaso
        }}>
            {children}
        </PasoContext.Provider>

    )

}
