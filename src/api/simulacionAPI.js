import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

const globalURL = 'https://cami.st4ging.dev/api/';

/* 
DATOS A ENVIA BACKEND RESULTADA
Example:
{

"id_receptor_hormonal": "1",	
"id_status_her": "1",	
"id_status_brca": "3",	
"id_etapa_cdm": "1",	
"id_aseguradora": "1",	
"id_institucion": "1",
"suma_asegurada": "1000000",
"deducible": "3452.78",
"coaseguro": "10"

}
*/

export default  {
    getdata: () => {
    return axios.get(url)
            .then(data => data.data)
    },

    getAseguradoras: () => {
        return axios.get(globalURL + 'aseguradora')
        .then(data => data.data);
    },

    getInstituciones: () =>{
        return axios.get(globalURL + 'instituciones')
        .then(data => data.data);
    },

    //receptores
    getReceptoresHormonal: () => {
        return axios.get(globalURL + 'receptores')
        .then(data => data.data);
    },
    //etapas_cdm
    getCancerMama: () => {
        return axios.get(globalURL + 'etapas_cdm')
        .then(data => data.data);
    },
    //status_her2
    getHer2: () => {
        return axios.get(globalURL + 'status_her2')
        .then(data => data.data);
    },

    //status_brca
    getBRCA: () =>{
        return axios.get(globalURL + 'status_brca')
        .then(data => data.data);
    },

    //Pedir datos de cotizacion

    postCotizacion: () => {
        const data = {
            id_receptor_hormonal: 1,	
            id_status_her: 1,	
            id_status_brca: 3,	
            id_etapa_cdm: 1,	
            id_aseguradora: 1,	
            id_institucion: 1,
            suma_asegurada: 10000, 
            deducible: 37.50, 
            coaseguro: 12, 
        }

        return axios.post(globalURL + 'cotizacion', data)
        .then( res => res.data);
    }


} 