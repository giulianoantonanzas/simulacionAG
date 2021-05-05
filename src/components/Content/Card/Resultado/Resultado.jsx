import * as React from 'react';

import iconEdit from '../../../../fonts/iconEdit.svg'

import Simulacion from '../../../../api/simulacionAPI';
import FormularioContacto from './Formulario/FormularioContacto';
import { PasoContext } from '../../../../context/PasoContext';


const Resultado = (resultadoDef) => {

    const [contacto, setContacto] = React.useState(false);
    const polizaEditable = React.createRef()
    const diagnosticoEditable = React.createRef()
    const [isEditablePoliza, setisEditablePoliza] = React.useState(false)
    const [isEditableDiagnostico, setisEditableDiagnostico] = React.useState(false)
    const [radio, setRadio] = React.useState(true);
    const { paso, setPaso } = React.useContext(PasoContext);
    const [listaI, setListaI] = React.useState([]);
    const [cotizacion, setCotizacion] = React.useState([]);
    const [errors, setErrors] = React.useState('');
    const hospitalRef = React.useRef();

    //view value se creo para reemplazar paso, como no se si se tiene que impactar el cambio, mejor dejar una simulacion.
    const [viewValues, setViewValues] = React.useState({ ...paso })

    if (paso.simulation_number === '') {
        setPaso({ ...paso, simulation_number: Math.floor(Math.random() * 100) + 112233 })
    }

    React.useEffect(() => {
        //si en el primer caracter no hay un $
        if (viewValues.suma_asegurada[0] !== '$') {
            setViewValues({ ...viewValues, suma_asegurada: '$' + viewValues.suma_asegurada })
        }
        if (viewValues.deducible[0] !== '$') {
            setViewValues({ ...viewValues, deducible: '$' + viewValues.deducible })
        }
        //si en el ultimo caracter no tiene un %
        if (viewValues.coaseguro[viewValues.coaseguro.length - 1] !== '%') {
            setViewValues({ ...viewValues, coaseguro: viewValues.coaseguro + "%" })
        }
        Simulacion.getInstituciones().then(data => setListaI(data))

        Simulacion.postCotizacion(paso).then(data => {
            setCotizacion(data);
            if (paso.items?.length === 0) {
                setPaso({ ...paso, items: data["items"] })
            }
        })
            .catch(err => {
                setCotizacion([]);
                setErrors('No se encuentra este perfil.')
            });
    }, [viewValues], [])


    React.useEffect(() => {
        //al hacer click activo o desactivo que se edite o no
        if (isEditablePoliza) {
            polizaEditable.current.children[0].children[1].readOnly = false
            polizaEditable.current.children[1].children[1].readOnly = false
            polizaEditable.current.children[2].children[1].readOnly = false
        } else {
            polizaEditable.current.children[0].children[1].readOnly = true
            polizaEditable.current.children[1].children[1].readOnly = true
            polizaEditable.current.children[2].children[1].readOnly = true
        }
        if (isEditableDiagnostico) {
            diagnosticoEditable.current.children[0].children[1].readOnly = false
            diagnosticoEditable.current.children[1].children[1].readOnly = false
            diagnosticoEditable.current.children[2].children[1].readOnly = false
            diagnosticoEditable.current.children[3].children[1].readOnly = false
        } else {
            diagnosticoEditable.current.children[0].children[1].readOnly = true
            diagnosticoEditable.current.children[1].children[1].readOnly = true
            diagnosticoEditable.current.children[2].children[1].readOnly = true
            diagnosticoEditable.current.children[3].children[1].readOnly = true
        }

        polizaEditable.current.children[1].children[1].value = "$"+polizaEditable.current.children[1].children[1].value.replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, '$1,$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
        polizaEditable.current.children[0].children[1].value = "$"+polizaEditable.current.children[0].children[1].value.replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, '$1,$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
    }, [isEditablePoliza, isEditableDiagnostico, polizaEditable, diagnosticoEditable], [])


    function handleGenerar(e) {
        e.preventDefault();
        setContacto(true);
    }

    function handleFInalizar(e) {
        e.preventDefault();

        // Iniciliza todos los valores de Paso
        // Para comenzar todo desde cero
        setPaso({
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
            centro: '',

            id_receptor_hormonal: 1,
            id_status_her: 1,
            id_status_brca: 1,
            id_etapa_cdm: 1,
            id_aseguradora: 1,
            id_institucion: 1,
            aprobed_forms: 0,
            simulation_number: '',
            items: []
        });
    }

    function handleDescargarSimulacion() {
        Simulacion.postDescargarSimulacion(paso.simulation_number, paso);
    }

    function handleChangeInstituto() {
        setCotizacion("")
        Simulacion.postCotizacion({ ...paso, id_institucion: hospitalRef.current.value }).then(data => {
            setPaso({ ...paso, id_institucion: hospitalRef.current.value, items: data.items })
            setCotizacion(data);
        });
    }

    function formatNumberMX(nro) {
        const num= new Intl.NumberFormat("ES-MX", {
            style: 'currency',
            currency: 'MXN'
        }).format(nro);

        //se quito la coma por pedido del cliente
        return num.toString().slice(0, -3);
    }

    if (errors !== '' && cotizacion.length === 0)
        return (
            <div key="resultado" className="resultado">
                <h1 className="resultado-title">Simulación No. {paso.simulation_number}</h1>

                <div className="resultado-datos">
                    <h1 className="resultado-datos_title">Resumen de datos</h1>

                    <div className="flex">
                        <div className="flex-item1">
                            <div className={`card1 ${isEditablePoliza ? "editable" : ""}`}>
                                <div className="d-flex">
                                    <h3>Resumen de póliza </h3>
                                    <button className="btn-edit" onClick={() => setisEditablePoliza(!isEditablePoliza)}>
                                        <img src={iconEdit} alt="edit" />
                                    </button>
                                </div>
                                <div ref={polizaEditable} className="contenido-editable">
                                    <div className="item">
                                        <h4>Suma asegurada:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, suma_asegurada: e.target.value })} value={viewValues.suma_asegurada} />
                                    </div>
                                    <div className="item">
                                        <h4>Deducible:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, deducible: e.target.value })} value={viewValues.deducible} />
                                    </div>
                                    <div className="item">
                                        <h4>Coaseguro:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, coaseguro: e.target.value })} value={viewValues.coaseguro} />
                                    </div>
                                </div>
                            </div>

                            <p className="flex-item1--p">
                                Tengo dudas sobre mi póliza <br />
                                <a href="#" className="link">Quiero contactar a mi seguro</a>
                            </p>
                        </div>

                        <div className="flex-item2">
                            <div className={`card2 ${isEditableDiagnostico ? "editable" : ""}`}>
                                <div className="flex-row">
                                    <h3>Resumen del Diagnóstico </h3>
                                    <button className="btn-edit" onClick={() => setisEditableDiagnostico(!isEditableDiagnostico)}>
                                        <img src={iconEdit} alt="edit" />
                                    </button>
                                </div>
                                <div ref={diagnosticoEditable} className="contenido-editable">
                                    <div className="grid-container">
                                        <h4>Etapa del cáncer de mama:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, mama: e.target.value })} value={viewValues.mama} />
                                    </div>
                                    <div className="grid-container">
                                        <h4>Receptor Hormonal:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, hormonal: e.target.value })} value={viewValues.hormonal} />
                                    </div>
                                    <div className="grid-container">
                                        <h4>Estatus de HER2:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, her: e.target.value })} value={viewValues.her} />
                                    </div>
                                    <div className="grid-container">
                                        <h4>Estatus de BRCA:</h4>
                                        <input type="text" onChange={(e) => setViewValues({ ...viewValues, brca: e.target.value })} value={viewValues.brca} />
                                    </div>
                                </div>
                            </div>
                        </div> {/*--- FIN FLEX-CONTAINER--- */}
                    </div>

                </div> {/*--- FIN DATOS--- */}
                <div className="resultado-errors">
                    {errors}
                </div>
            </div>)



    return (
        <div className="resultado">
            <h1 className="resultado-title">Simulación No. {paso.simulation_number}</h1>

            <div className="resultado-datos">
                <h1 className="resultado-datos_title">Resumen de datos</h1>

                <div className="flex">
                    <div className="flex-item1">
                        <div className={`card1 ${isEditablePoliza ? "editable" : ""}`}>
                            <div className="d-flex">
                                <h3>Resumen de póliza </h3>
                                <button className="btn-edit" onClick={() => setisEditablePoliza(!isEditablePoliza)}>
                                    <img src={iconEdit} alt="edit" />
                                </button>
                            </div>
                            <div ref={polizaEditable} className="contenido-editable">
                                <div className="item">
                                    <h4>Suma asegurada:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, suma_asegurada: e.target.value })} value={viewValues.suma_asegurada} />
                                </div>
                                <div className="item">
                                    <h4>Deducible:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, deducible: e.target.value })} value={viewValues.deducible} />
                                </div>
                                <div className="item">
                                    <h4>Coaseguro:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, coaseguro: e.target.value })} value={viewValues.coaseguro} />
                                </div>
                            </div>
                        </div>

                        <p className="flex-item1--p">
                            Tengo dudas sobre mi póliza <br />
                            <a href="#" className="link">Quiero contactar a mi seguro</a>
                        </p>
                    </div>

                    <div className="flex-item2">
                        <div className={`card2 ${isEditableDiagnostico ? "editable" : ""}`}>
                            <div className="flex-row">
                                <h3>Resumen del Diagnóstico </h3>
                                <button className="btn-edit" onClick={() => setisEditableDiagnostico(!isEditableDiagnostico)}>
                                    <img src={iconEdit} alt="edit" />
                                </button>
                            </div>
                            <div ref={diagnosticoEditable} className="contenido-editable">
                                <div className="grid-container">
                                    <h4>Etapa del cáncer de mama:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, mama: e.target.value })} value={viewValues.mama} />
                                </div>
                                <div className="grid-container">
                                    <h4>Receptor Hormonal:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, hormonal: e.target.value })} value={viewValues.hormonal} />
                                </div>
                                <div className="grid-container">
                                    <h4>Estatus de HER2:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, her: e.target.value })} value={viewValues.her} />
                                </div>
                                <div className="grid-container">
                                    <h4>Estatus de BRCA:</h4>
                                    <input type="text" onChange={(e) => setViewValues({ ...viewValues, brca: e.target.value })} value={viewValues.brca} />
                                </div>
                            </div>
                        </div>

                    </div> {/*--- FIN FLEX-CONTAINER--- */}

                </div>

                <div className="tipo-atencion">
                    <div>
                        <h3>tipo de atencion que requieres</h3>
                        <div className="oncologo-o-multidisi">
                            <p>Centro Oncológico</p>
                            <div onClick={() => radio ? setRadio(false) : setRadio(true)} className={`interrputor ${radio ? "left" : "right"}`} >
                                <span className="radio" />
                            </div>
                            <p>Enfoque multidisciplinario</p>
                        </div>
                    </div>
                </div>

            </div> {/*--- FIN DATOS--- */}

            <div className="resultado-costo">
                <h1 className="resultado-costo--title">Costo estimado del tratamiento anual</h1>
                <form className="costo-form">
                    <div className="form-control">
                        <select name="instituciones" id="instituciones" onChange={() => handleChangeInstituto()}
                            ref={hospitalRef}
                            option={paso.items}>
                            <option value="Select" disabled>Seleccionar</option>
                            {
                                listaI?.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.nombre}</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        (cotizacion?.length === 0) ? <div className="cargando"> Cargando Monto ....</div> :
                            <p className="form-text"> {formatNumberMX(cotizacion.costo_total)}</p>
                    }
                </form>
                {
                    (cotizacion?.length === 0) ? <div className="cargando"> Cargando Detalle ....</div>
                        :
                        <div>
                            <div className="resultado-costo_detalle">
                                <h2 className="resultado-costo_detalle--title">Detalles*:</h2>
                                {
                                    (paso.items?.length !== 0) ?
                                        paso.items?.map(data => {
                                            return <div className="flex-column">
                                                <h4 className="flex-container">
                                                    <div> {data.nombre}:</div>
                                                    <div>{formatNumberMX((data.precio_preferencial * data.cantidad))}</div>
                                                </h4>
                                                <p> {data.detalle} </p>
                                            </div>
                                        })
                                        :
                                        <div>Cargando ....</div>
                                }
                                <h4 className="flex-container">
                                    <div> Total por 1 año</div>
                                    <div>{formatNumberMX(cotizacion.costo_total)}</div>
                                </h4>
                            </div>
                        </div>
                }

            </div>
            {/* FIN RESULTADOS */}


            <div className="resultado-costo_buttons">
                <button className="btn btn-generar marginRight" onClick={handleGenerar}>Generar Preaprobación</button>
                <button className="btn btn-descargar marginRight" onClick={() => handleDescargarSimulacion()}>Descargar Simulacion</button>
                <button className="btn btn-finalizar marginRight" onClick={handleFInalizar}>Finalizar Simulación</button>
            </div>

            <div className="resultado-legal">
                <p>Legal que menciona que el resultado puede ser variable y que depende de la decisón de cada médico.</p>
            </div>
            {(contacto) ? <FormularioContacto nroSimulacion={paso.simulation_number} costo_total={cotizacion.costo_total} />
                : <div></div>}
        </div>
    )

}


export default Resultado;