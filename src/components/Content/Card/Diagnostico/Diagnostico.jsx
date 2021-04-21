import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

import Simulacion from '../../../../api/simulacionAPI';

const Diagnostico = () =>{
    const [errorMsg,setErrorMsg] = React.useState('')

    const {paso, setPaso} = React.useContext(PasoContext);
    const [listaMama, setMama] = React.useState([]);
    const [listaHormonal, setHormonal] = React.useState([]);
    const [listaHer, setHer] = React.useState([]);
    const [listaBRCA, setBRCA] = React.useState([]);

    const [showMsg, setShowMsg] = React.useState(true);

    const [diagnostico, setDiagnostico] = React.useState({mama: paso.mama, 
    hormonal: paso.hormonal, 
    her: paso.her, 
    brca: paso.brca});

    const buttonRef = React.useRef();

    const mamaRef = React.useRef();
    const hormonalRef = React.useRef();
    const herRef = React.useRef();
    const brcaRef = React.useRef();
    

    React.useEffect(()=>{
        cleanError()
        buttonRef.current.disabled = true;

            if(diagnostico.mama!== '' && diagnostico.hormonal!== '' 
            && diagnostico.her!== '' && diagnostico.brca!=='' && errorMsg===''){
                buttonRef.current.disabled = false;
                setShowMsg(false);
            }

            //-- Carga de datos del API Rest Simulacion
            if(!listaMama.length){
                Simulacion.getCancerMama().then(data => setMama(data))
            }
            if(!listaHormonal.length){
                Simulacion.getReceptoresHormonal().then(data => setHormonal(data))
            }
            if(!listaHer.length){
                Simulacion.getHer2().then(data => setHer(data))
            }
            if(!listaBRCA.length){
                Simulacion.getBRCA().then(data => setBRCA(data))
            }
            //--------------------------------------//
           

    })


    function cleanError(){
        if((diagnostico.brca!=="Aún no lo sé" || diagnostico.brca!=="Aun no lo sé") &&  diagnostico.her!=="Aún no lo sé" && diagnostico.hormonal!=="Aún no lo sé" && diagnostico.mama!=="Aún no lo sé" ){
            setErrorMsg('')
        }
    }

    function viewError(){
        if(diagnostico.brca!=="Aún no lo sé" || diagnostico.brca!=="Aun no lo sé"){
            setErrorMsg("Para generar una simulación es necesario contar con todos los datos solicitados, pregunta a tu médico por tu Estatus de BRCA")
            return true
        }else if(diagnostico.her!=="Aún no lo sé"){
            setErrorMsg("Para poder avanzar, contacta a tu médico para que te informe sobre tu estatus de HER2")
            return true
        }else  if(diagnostico.hormonal!=="Aún no lo sé"  ){
            setErrorMsg("Para poder realizar los cálculos, es vital  que conozcas cuál es el receptor hormonal")
            return true
        }else if(diagnostico.mama!=="Aún no lo sé"){
            setErrorMsg("Para continuar con la simulación es importante conocer en qué etapa del padecimiento te encuentras ya que dependiendo de ésta varía la simulación, acude a tu médico por el diagnóstico.")
            return true
        }
        return false
    }

    function handleChange(e) {
        e.preventDefault();
        
            switch(e.target.name){
                case 'mama': {
                    setDiagnostico({...diagnostico, mama: e.target.value});
                    break
                }
                case 'hormonal': {
                    setDiagnostico({...diagnostico,  hormonal: e.target.value});
                    break
                }
                case 'her': {
                    setDiagnostico({...diagnostico, her: e.target.value});
                    break
                }
                case 'brca': {
                    setDiagnostico({...diagnostico, brca: e.target.value});
                    break
                }
            }
            
        viewError()
    }

    function handleSiguiente(e){
        e.preventDefault();

        if( listaMama.length!==0 && listaHormonal.length!==0 
            && listaHer.length!==0 && listaBRCA.length!==0){

            const mamaID = listaMama.filter(data => data.nombre === diagnostico.mama)
          //  console.log(mamaID);
            const hormonalID = listaHormonal.filter(data => data.nombre === diagnostico.hormonal)
          //  console.log(hormonalID[0].id);
            const herID = listaHer.filter(data => data.nombre === diagnostico.her)
          //  console.log(herID[0].id);
            const brcaID = listaBRCA.filter(data => data.nombre === diagnostico.brca)
          //  console.log(brcaID[0].id);
            
            //  console.log(diagnostico);
            let i = paso.id + 1;
            setPaso({...paso, id: i, 
                id_etapa_cdm: mamaID[0].id,
                id_receptor_hormonal: hormonalID[0].id,
                id_status_her: herID[0].id ,
                id_status_brca: brcaID[0].id,
                ...diagnostico})
        }
    }


    return(
        <div className="diagnostico">
                <h1 className="diagnostico-title">Datos de tu diagnóstico:</h1>

                <form className="diagnostico-form">
                    <div className="form-control">
                        <label htmlFor="mama">Etapa del cáncer de mama:</label>
                        {
                        (diagnostico.mama!=='')?
                        // Si hay datos en PasoContext muestra el valor al usuario
                        <select name="mama" id="mama" onChange={handleChange} ref={mamaRef} value={diagnostico.mama}>
                            <option value="Seleccione" selected disabled>Seleccionar</option>
                            {
                                listaMama.map((data)=> {
                                    return <option  key={data.id} value={data.nombre}>{data.nombre}</option>
                                })
                            }
                            
                        </select>
                        :
                        //Si  no hay valor en PasoConext le da a elegir
                        <select name="mama" id="mama" onChange={handleChange} ref={mamaRef} >
                            <option value="Seleccione" selected disabled>Seleccionar</option>
                            {
                                listaMama.map((data)=> {
                                    return <option  key={data.id} value={data.nombre}>{data.nombre}</option>
                                })
                            }
                            
                        </select>
                        }
                    </div>

                    <div className="form-control">
                        <label htmlFor="hormonal">Receptor Hormonal:</label>
                        {
                        (diagnostico.hormonal!=='')?
                        // Si hay datos en PasoContext muestra el valor al usuario
                        <select name="hormonal" id="hormonal" onChange={handleChange} ref={hormonalRef} value={diagnostico.hormonal}>
                            <option value="Seleccione" selected disabled>Seleccionar</option>
                            {
                                listaHormonal.map((data)=> {
                                    return <option  key={data.id} value={data.nombre}>{data.nombre}</option>
                                })
                            }
                            
                        </select>
                        :
                        //Si  no hay valor en PasoConext le da a elegir
                        <select name="hormonal" id="hormonal" onChange={handleChange} ref={hormonalRef} >
                            <option value="Seleccione" selected disabled>Seleccionar</option>
                            {
                                listaHormonal.map((data)=> {
                                    return <option  key={data.id} value={data.nombre}>{data.nombre}</option>
                                })
                            }
                            
                        </select>
                        }
                    </div>

                    <div className="form-control">
                        <label htmlFor="her">Estatus de HER2:</label>
                        {
                        (diagnostico.her!=='')?
                        // Si hay datos en PasoContext muestra el valor al usuario
                        <select name="her" id="her" onChange={handleChange} ref={herRef} value={diagnostico.her}>
                        <option value="Seleccione" selected disabled>Seleccionar</option>
                        {
                            listaHer.map((data)=> {
                                return <option key={data.id} value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                        :
                        //Si  no hay valor en PasoConext le da a elegir
                        <select name="her" id="her" onChange={handleChange} ref={herRef} >
                        <option value="Seleccione" selected disabled>Seleccionar</option>
                        {
                            listaHer.map((data)=> {
                                return <option key={data.id} value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                        }
                    </div>

                    <div className="form-control">
                        <label htmlFor="brca">Estatus de BRCA:</label>
                       
                        {
                        (diagnostico.brca!=='')?
                        // Si hay datos en PasoContext muestra el valor al usuario
                        <select name="brca" id="brca" onChange={handleChange} ref={brcaRef} value={diagnostico.brca}>
                        <option value="Seleccione" selected disabled>Seleccionar</option>
                        {
                            listaBRCA.map((data)=> {
                                return <option  key={data.id} value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                        :
                        //Si  no hay valor en PasoConext le da a elegir
                        <select name="brca" id="brca" onChange={handleChange} ref={brcaRef} >
                        <option value="Seleccione" selected disabled>Seleccionar</option>
                        {
                            listaBRCA.map((data)=> {
                                return <option  key={data.id} value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                        }
                    </div>

                </form>
                <button className="btn btn-siguiente" onClick={handleSiguiente} ref={buttonRef}>Siguiente</button>

                <p>{errorMsg}</p>
                
        </div>
    )

}

export default Diagnostico;