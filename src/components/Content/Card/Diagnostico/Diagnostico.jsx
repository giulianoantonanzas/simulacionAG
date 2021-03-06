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
    



    function cleanError(){
        /* SI NO SE ESTA MOSTRANDO NINGUNO DE LOS ULTIMOS CAMPOS SE LIMPIA EL ERROR */
        const aunNoMamaSeposition=mamaRef.current?.children.length-1
        const aunNoHormonSeposition=hormonalRef.current?.children.length-1
        const aunNoHerRefSeposition=herRef.current?.children.length-1
        const aunNoBrcaRefSeposition=brcaRef.current?.children.length-1

        if(mamaRef.current.value !== mamaRef.current.children[aunNoMamaSeposition].text &&
            hormonalRef.current.value !== hormonalRef.current.children[aunNoHormonSeposition].text &&
            herRef.current.value !== herRef.current.children[aunNoHerRefSeposition].text &&
            brcaRef.current.value !== brcaRef.current.children[aunNoBrcaRefSeposition].text ){
                setErrorMsg('')
            }
    }

    function viewError(){
        /* si se selecciona el ultimo campo entonces mostrar error*/
        const aunNoMamaSeposition=mamaRef.current?.children.length-1
        const aunNoHormonSeposition=hormonalRef.current?.children.length-1
        const aunNoHerRefSeposition=herRef.current?.children.length-1
        const aunNoBrcaRefSeposition=brcaRef.current?.children.length-1

        if(mamaRef.current.value === mamaRef.current.children[aunNoMamaSeposition].text ){
            setErrorMsg("Para continuar con la simulaci??n es importante conocer en qu?? etapa del padecimiento te encuentras ya que dependiendo de ??sta var??a la simulaci??n, acude a tu m??dico por el diagn??stico.")
        }
        if(hormonalRef.current.value === hormonalRef.current.children[aunNoHormonSeposition].text ){
            setErrorMsg("Para poder realizar los c??lculos, es vital  que conozcas cu??l es el receptor hormonal")
        }
        if(herRef.current.value === herRef.current.children[aunNoHerRefSeposition].text ){
            setErrorMsg("Para poder avanzar, contacta a tu m??dico para que te informe sobre tu estatus de HER2")
        }
        if(brcaRef.current.value === brcaRef.current.children[aunNoBrcaRefSeposition].text ){
            setErrorMsg("Para generar una simulaci??n es necesario contar con todos los datos solicitados, pregunta a tu m??dico por tu Estatus de BRCA")
        }

    }


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
        
    })



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
                ...diagnostico,
                aprobed_forms:paso.aprobed_forms+1
            })
        }
    }


    return(
        <div className="diagnostico">
                <h1 className="diagnostico-title">Datos de tu diagn??stico:</h1>

                <form className="diagnostico-form">
                    <div className="form-control">
                        <label htmlFor="mama">Etapa del c??ncer de mama:</label>
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