import * as React from 'react';

import iconEdit from '../../../../fonts/iconEdit.svg'

import Simulacion from '../../../../api/simulacionAPI';
import FormularioContacto from './Formulario/FormularioContacto';
import { PasoContext } from '../../../../context/PasoContext';


const Resultado = () =>{

    const {paso, setPaso} = React.useContext(PasoContext);

    const [listaI, setListaI] = React.useState([]);

    const [cotizacion, setCotizacion] = React.useState([]);
    const [items, setItems] = React.useState([]);

     const[nroSimulacion, setNroSimulacion] = React.useState(0);

     const hospitalRef = React.useRef();
    

    const [contacto, setContacto] = React.useState(false);

    React.useEffect(()=>{
        Simulacion.getInstituciones().then(data => setListaI(data))
        Simulacion.postCotizacion(paso).then(data => {
            setCotizacion(data); 
            setItems(data["items"]);
        })
        .catch(err => console.log(err));

        if(nroSimulacion===0)
        setNroSimulacion(Math.floor(Math.random() *100) + 112233);
   
    },[paso])

    function handleGenerar(e) {
        e.preventDefault();

        setContacto(true);
    }

    function handleClickPoliza(e) {
        e.preventDefault();
        setPaso({...paso, id: 3})
    }

    function handleClickDiagnostico(e) {
        e.preventDefault();
        setPaso({...paso, id: 4})
    }

    function handleFInalizar(e) {
        e.preventDefault();

        // Iniciliza todos los valores de Paso
        // Para comenzar todo desde cero
        setPaso( {
            id: 1,
            genre: '',
            edad: '',
            aseguradora: '',
            suma_asegurada: '', 
            coaseguro: '', 
            deducible: '', 
            vigencia: '',
            mama: '', 
            hormonal: '', 
            her: '', 
            brca: '',
            centro:'',
       
            id_receptor_hormonal: 1,	
            id_status_her: 1,	
            id_status_brca: 1,	
            id_etapa_cdm: 1,	
            id_aseguradora: 1,	
            id_institucion: 1,
        });
    }

    function handleDescargarSimulacion(e) {
       e.preventDefault();

        Simulacion.postDescargarSimulacion(nroSimulacion, paso);
    }

    function handleChangeInstituto(e) {
        e.preventDefault();
        console.log("hospital", hospitalRef.current.value)
        
        setPaso({...paso, id_institucion: hospitalRef.current.value});
        setCotizacion([]);
        setItems([]);

    }

    

    return(
        <div className="resultado">
                <h1 className="resultado-title">Simulación No. {nroSimulacion}</h1>

                <div className="resultado-datos">
                    <h1 className="resultado-datos_title">Resumen de datos</h1>

                    <div className="flex">
                        <div className="flex-item1">
                            
                            <div className="card1">
                                <div >
                                    <h3>Resumen de póliza </h3>
                                    <button className="btn-edit" onClick={handleClickPoliza}>
                                        <img src={iconEdit} alt="edit"/>
                                    </button>
                                </div>
                                <div> 
                                <h4>Suma asegurada:</h4>
                                ${paso.suma_asegurada}
                                </div> 
                                <div> 
                                <h4>Deducible:</h4>
                                ${paso.deducible}
                                </div> 
                                <div> 
                                <h4>Coaseguro:</h4>
                                {paso.coaseguro}%
                                </div> 
                            </div>

                            <p className="flex-item1--p">
                            Tengo dudas sobre mi póliza <br/> 
                            <a href="#" className="link">Quiero contactar a mi seguro</a>
                            </p>
                        </div>

                        <div className="flex-item2">
                            <div className="card2">
                                    <div className="flex-row">
                                    <h3>Resumen del Diagnóstico </h3>
                                        <button className="btn-edit" onClick={handleClickDiagnostico}>
                                            <img src={iconEdit} alt="edit"/>
                                        </button>
                                    </div>
                                     <div className="grid-container"> 
                                    <h4>Etapa del cáncer de mama:</h4>
                                    <p>{paso.mama}</p>
                                    </div> 
                                    <div className="grid-container"> 
                                    <h4>Receptor Hormonal:</h4>
                                    <p>{paso.hormonal}</p>
                                    </div> 
                                    <div className="grid-container"> 
                                    <h4>Estatus de HER2:</h4>
                                    <p>{paso.her}</p>
                                    </div> 
                                    <div className="grid-container">  
                                    <h4>Estatus de BRCA:</h4>
                                    <p>{paso.brca}</p>
                                    </div> 
                            </div>
                           
                        </div> {/*--- FIN FLEX-CONTAINER--- */}

                    </div>

                </div> {/*--- FIN DATOS--- */}

                <div className="resultado-costo">
                    <h1 className="resultado-costo--title">Costo estimado del tratamiento anual</h1>

                       
                    <form className="costo-form">
                        
                            <div className="form-control">
                                <select name="instituciones" id="instituciones" onChange={handleChangeInstituto}
                                ref={hospitalRef}>
                                    <option value="Select" disabled>Seleccionar</option>
                                {
                                    listaI.map((item)=>{
                                        return <option selected value={item.id}>{item.nombre}</option>
                                    })
                                }
                                </select>
                            </div>
                        {
                            (cotizacion.length === 0) ?  <div className="cargando"> Cargando Monto ....</div>: 
                            <p className="form-text">$ {cotizacion.costo_total}</p>
                        }
                    </form>
                     {
                    
                        (cotizacion.length === 0) ?  <div className="cargando"> Cargando Detalle ....</div> 
                        :
                    <div>

                        <div className="resultado-costo_detalle">
                        <h2 className="resultado-costo_detalle--title">Detalles*:</h2>
                        {
                            (items.length !== 0) ?   
                                items.map( data => {
                                         return <div className="flex-column">
                                            
                                            <h4 className="flex-container">
                                            <div> {data.nombre}:</div>
                                            <div>${data.precio_preferencial}</div>
                                            </h4>
                                            <p> {data.detalle} </p>
                                        </div> 
                                    })

                            
                             : 
                             <div>Cargando ....</div>
                        }

                                <h4 className="flex-container">
                                   <div> Total por 1 año</div>
                                    <div>${cotizacion.costo_total}</div>
                                </h4>


                        </div>
                    </div>
                        
            
                }
                    
                </div> 
                {/* FIN RESULTADOS */}

                
                <div className="resultado-costo_buttons">
                   
                        <button className="btn btn-generar marginRight" onClick={handleGenerar}>Generar Preaprobación</button>
                        <button className="btn btn-descargar marginRight" onClick={handleDescargarSimulacion}>Descargar Simulacion</button>
                        <button className="btn btn-finalizar marginRight" onClick={handleFInalizar}>Finalizar Simulación</button>
                    
                </div>

                <div className="resultado-legal">
                    <p>Legal que menciona que el resultado puede ser variable y que depende de la decisón de cada médico.</p>
                </div>
                {(contacto) ? <FormularioContacto nroSimulacion={nroSimulacion} costo_total={cotizacion.costo_total}/> 
                : <div></div>}
        </div>
    )

}

/*
   
*/

export default Resultado;