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
    

    const [contacto, setContacto] = React.useState(false);

    React.useEffect(()=>{
        Simulacion.getInstituciones().then(data => setListaI(data))
        Simulacion.postCotizacion().then(data => {
            setCotizacion(data); 
            console.log(cotizacion)
            setItems(data["items"]);
        });

    },[])

    // console.log(items);
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

    if(cotizacion.length < 0) return <div> Cargando ....</div>

    return(
        <div className="resultado">
                <h1 className="resultado-title">Simulación No. 112233</h1>

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
                                {cotizacion.suma_asegurada}
                                </div> 
                                <div> 
                                <h4>Deducible:</h4>
                                {cotizacion.deducible}
                                </div> 
                                <div> 
                                <h4>Coaseguro:</h4>
                                {cotizacion.coaseguro}
                                </div> 
                            </div>

                            <p className="flex-item1--p">
                            Tengo dudas sobre mi póliza <br/> 
                            <a href="#" className="link">Quiero contactar a mi seguro</a>
                            </p>
                        </div>

                        <div className="flex-item2">
                            <div className="card2">
                                    <div>
                                    <h3>Resumen del Diagnóstico </h3>
                                        <button className="btn-edit" onClick={handleClickDiagnostico}>
                                            <img src={iconEdit} alt="edit"/>
                                        </button>
                                    </div>
                                    <div> 
                                    <h4>Etapa del cáncer de mama:</h4>
                                    {cotizacion.etapa_cdm}
                                    </div> 
                                    <div> 
                                    <h4>Receptor Hormonal:</h4>
                                    {cotizacion.receptor_hormonal}
                                    </div> 
                                    <div> 
                                    <h4>Estatus de HER2:</h4>
                                    {cotizacion.status_her}
                                    </div> 
                                    <div> 
                                    <h4>Estatus de BRCA:</h4>
                                    {cotizacion.status_her}
                                    </div> 
                            </div>
                           
                        </div> {/*--- FIN FLEX--- */}

                    </div>

                </div> {/*--- FIN DATOS--- */}

                <div className="resultado-costo">
                    <h1>Costo estimado del tratamiento anual</h1>

                    <form className="costo-form">
                        <div className="form-control">
                            <select name="instituciones" id="instituciones">
                                <option value="Select" disabled>Seleccionar</option>
                            {
                                listaI.map((item)=>{
                                    return <option value={item.nombre}>{item.nombre}</option>
                                })
                            }
                            </select>

                        </div>
                    </form>
                            <p className="form-text">$ {cotizacion.costo_total}</p>

                    <div className="resultado-costo_detalle">
                        <h2 className="resultado-costo_detalle--title">Detalles*:</h2>
                        {
                            (items.length > 0) ?   
                                items.map( data => {
                                         return <div>
                                            
                                            <h4 className="flex-container">
                                            <div> {data.nombre}:</div>
                                            <div>{data.precio_preferencial}</div>
                                            </h4>
                                            <p>Descripcion de cada diagnostico</p>
                                        </div> 
                                    })

                            
                             : 
                             <div>Cargando ....</div>
                        }

                                {/* <h4 className="flex-container">
                                   <div> Diagnóstico:</div>
                                    <div>{cotizacion.items[0].precio_preferencial}</div>
                                </h4>
                                <p> Mamografía  / Radiografía / Tomografía</p>
                                
                                <h4 className="flex-container">
                                   <div> Estudios:</div>
                                    <div>{cotizacion.items[1].precio_preferencial}</div>
                                </h4>
                                <p> Estudio molecular para HER2</p>

                               
                                <h4 className="flex-container">
                                   <div> Cirugía:</div>
                                    <div>{cotizacion.items[2].precio_preferencial}</div>
                                </h4>
                                <p> Mastectomía</p>
                                
                                <h4 className="flex-container">
                                   <div> Radioterapia:</div>
                                    <div>{cotizacion.items[3].precio_preferencial}</div>
                                </h4>
                                <p>Hasta 15 sesiones de radioterapia</p>
                                
                                <h4 className="flex-container">
                                   <div> Tratamiento Farmacológico:</div>
                                    <div>{cotizacion.items[4].precio_preferencial}</div>
                                </h4>
                                <p> Radioterapia de 4 a 6 ciclos Hormonoterapia 
                                    Terapia dirigida que puede incluir: Trastuzumab, Alectinib, xxxxx</p>
                              */}
                                <h4 className="flex-container">
                                   <div> Total por 1 año</div>
                                    <div>${cotizacion.costo_total}</div>
                                </h4>


                    </div>
                </div>

                <div className="resultado-costo_buttons">
                    {/* <form className="buttons-form"> */}
                        <button className="btn btn-generar marginRight" onClick={handleGenerar}>Generar Preaprobación</button>
                        <button className="btn btn-descargar marginRight">Descargar Simulacion</button>
                        <button className="btn btn-finalizar marginRight">Finalizar Simulación</button>
                    {/* </form> */}
                </div>
                {(contacto) ? <FormularioContacto /> : <div></div>}
        </div>
    )

}

/*
   
*/

export default Resultado;