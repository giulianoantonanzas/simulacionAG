import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

import Simulacion from '../../../../api/simulacionAPI';

const Diagnostico = () =>{

    const {paso, setPaso} = React.useContext(PasoContext);

    const [listaMama, setMama] = React.useState([]);
    const [listaHormonal, setHormonal] = React.useState([]);
    const [listaHer, setHer] = React.useState([]);
    const [listaBRCA, setBRCA] = React.useState([]);

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
        buttonRef.current.disabled = true;
            if(diagnostico.mama!= '' && diagnostico.hormonal!= '' && diagnostico.her!= '' && diagnostico.brca!=''){
                buttonRef.current.disabled = false;

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
            console.log('diagnostico', diagnostico);

    },[diagnostico])

    function handleChange(e) {
        e.preventDefault();

        console.log(e.target.name);

        switch(e.target.name){
            case 'mama': {
                // console.log(e.target.value);
                setDiagnostico({...diagnostico, mama: e.target.value});
                return; 
            }

            case 'hormonal': {
                setDiagnostico({...diagnostico, hormonal: e.target.value});
                return;
            }

            case 'her': {
                setDiagnostico({...diagnostico, her: e.target.value});
                return;
            }

            case 'brca': {
                setDiagnostico({...diagnostico, brca: e.target.value});
                return;
            }

        }
    }

    function handleSiguiente(e){
        e.preventDefault();
        
        console.log(diagnostico);
        let i = paso.id + 1;
        setPaso({...paso, id: i, ...diagnostico})
    }

    return(
        <div className="diagnostico">
                <h1>Datos de tu diagnóstico:</h1>

                <form className="diagnostico-form">
                    <div className="form-control">
                        <label htmlFor="mama">Etapa del cáncer de mama</label>
                        <select name="mama" id="mama" onChange={handleChange} ref={mamaRef} value={diagnostico.mama}>
                            <option value="Seleccione"  disabled>Seleccionar</option>
                            {
                                listaMama.map((data)=> {
                                    return <option value={data.nombre}>{data.nombre}</option>
                                })
                            }
                            
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="hormonal">Receptor Hormonal</label>
                        <select name="hormonal" id="hormonal" onChange={handleChange} ref={hormonalRef} value={diagnostico.hormonal}>
                        <option value="Seleccione"  disabled>Seleccionar</option>
                        {
                            listaHormonal.map((data)=> {
                                return <option value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="her">Estatus de HER2</label>
                        <select name="her" id="her" onChange={handleChange} ref={herRef} value={diagnostico.her}>
                        <option value="Seleccione"  disabled>Seleccionar</option>
                        {
                            listaHer.map((data)=> {
                                return <option value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="brca">Estatus de BRCA</label>
                        <select name="brca" id="brca" onChange={handleChange} ref={brcaRef} value={diagnostico.brca}>
                        <option value="Seleccione"  disabled>Seleccionar</option>
                        {
                            listaBRCA.map((data)=> {
                                return <option value={data.nombre}>{data.nombre}</option>
                            })
                        }
                        </select>
                    </div>

                </form>
                <button className="btn btn-siguiente" onClick={handleSiguiente} ref={buttonRef}>Siguiente</button>



            </div>
    )

}

export default Diagnostico;