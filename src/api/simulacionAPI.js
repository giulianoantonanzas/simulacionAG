import axios from 'axios';


//localhost/api
//https://tresprimadev.com/api
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
function convertCommatoDot(str) {
    let num = parseFloat(str.replace(/\s/g, "").replace(",", ""));
    return num;
}

export default  {

    postSimulacion: (paso,cotizacion) => {
        const data = {
            costo_total: cotizacion,
            id_receptor_hormonal: paso.id_receptor_hormonal,	
            id_status_her: paso.id_status_her,	
            id_status_brca: paso.id_status_brca,	
            id_etapa_cdm: paso.id_etapa_cdm,	
            id_aseguradora: paso.id_aseguradora,	
            id_institucion: paso.id_institucion,
            suma_asegurada: convertCommatoDot(paso.suma_asegurada), 
            deducible: convertCommatoDot(paso.deducible), 
            coaseguro: paso.coaseguro,
            identificador:paso.simulation_number
        }
        return axios.post(globalURL + "simulaciones", data)
        .then(data => data.data).catch(err => err);
    },

    getSimulacionById : (id)=>{
        return  axios.get(globalURL+"simulacion/"+id)
        .then(data => data.data).catch(err => err);
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
    postCotizacion: (paso) => {
        const data = {
            id_receptor_hormonal: paso.id_receptor_hormonal,	
            id_status_her: paso.id_status_her,	
            id_status_brca: paso.id_status_brca,	
            id_etapa_cdm: paso.id_etapa_cdm,	
            id_aseguradora: paso.id_aseguradora,	
            id_institucion: paso.id_institucion,
            suma_asegurada: convertCommatoDot(paso.suma_asegurada), 
            deducible: convertCommatoDot(paso.deducible), 
            coaseguro: paso.coaseguro, 
        }

        return axios.post(globalURL + 'cotizacion', data)
        .then( res => res.data)
        .catch(err => err);
    },

    postDescargarSimulacion: (identificador, paso) => {
        const data = {
            identificador: identificador,
            id_receptor_hormonal: paso.id_receptor_hormonal,	
            id_status_her: paso.id_status_her,	
            id_status_brca: paso.id_status_brca,	
            id_etapa_cdm: paso.id_etapa_cdm,	
            id_aseguradora: paso.id_aseguradora,	
            id_institucion: paso.id_institucion,
            suma_asegurada: convertCommatoDot(paso.suma_asegurada), 
            deducible: convertCommatoDot(paso.deducible), 
            coaseguro: paso.coaseguro, 
        }

       // console.log("datos para imprimir: ",data);

        return axios.post(globalURL + 'simulaciones/usuario/descargar_pdf', data,
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Simulacion.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => console.log(error));
    },

    postGenerarPreaprobacion: (paso, user, costo_total) => {
        const data = {
            nombre: user.name,
            apellido_materno: user.materno,
            apellido_paterno: user.paterno,
            edad: paso.edad,
            fecha_nacimiento: user.birth,
            genero: "femenino",
            email: user.email,
            num_poliza: user.nropoliza,
            id_institucion: paso.id_institucion,
            suma_asegurada: convertCommatoDot(paso.suma_asegurada), 
            costo_total: costo_total,
            deducible: convertCommatoDot(paso.deducible), 
            coaseguro: paso.coaseguro, 
            vigencia: paso.vigencia,
            tipo_atencion: paso.centro,
            id_receptor_hormonal: paso.id_receptor_hormonal,	
            id_status_her: paso.id_status_her,	
            id_status_brca: paso.id_status_brca,	
            id_etapa_cdm: paso.id_etapa_cdm,	
            id_aseguradora: paso.id_aseguradora,	
            identificador: paso.simulation_number,
        };
        return axios.post(globalURL + 'usuarios/preaprobacion', data)
        .then(res => res)
        .catch(err => console.log(err));
    }


} 