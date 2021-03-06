import React, { createContext, useState } from 'react';

export const PasoContext = createContext();

const pasoHard = {
    id: 1,
    // --Perfil-- //
    gender: 'null',
    edad: 0,
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
    centro: '',
    //-----------------//
    //-- Datos enviados Backend e.g Perfil 1 --//
    id_receptor_hormonal: 1,
    id_status_her: 1,
    id_status_brca: 1,
    id_etapa_cdm: 1,
    id_aseguradora: 1,
    id_institucion: 1,
    items: [],
    /* FORM OPTIONS*/
    aprobed_forms: 0,
    simulation_number: ''
    //------------------------//


}

export const PasoProvider = ({ children }) => {

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
