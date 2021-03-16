import * as React from 'react';



const Resultado = () =>{
    return(
        <div className="resultado">
                <h1 className="resultado-title">Simulación No. 112233</h1>

                <div className="resultado-datos">
                    <h1>Resumen de datos</h1>

                    <div className="resultado-datos_flex">
                        <div className="flex-item1">
                            <div className="flex-item1_card">
                                <h3>Resumen de póliza <button>edit</button></h3>
                                

                                <ul>
                                    <li>Suma asegurada: $3,000,000 </li>
                                    <li> Deducible: $3,500 </li>
                                    <li>Coaseguro: 10% </li>
                                </ul>
                            </div>

                            <p>
                            Tengo dudas sobre mi póliza <br/> 
                            <a href="#" className="link">Quiero contactar a mi seguro</a>
                            </p>
                        </div>

                        <div className="flex-item2">
                            <div className="flex-item2_card">
                                <h3>Resumen del Diagnóstico <button>edit</button></h3>
                                

                                <ul>
                                    <li>Etapa del cáncer de mama:  Metastásico</li>
                                    <li> Receptor Hormonal: ER+ </li>
                                    <li>Estatus de HER2: Positivo </li>
                                    <li>Estatus de RRCA: No lo sé</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="resultados-costo">
                    <h1>Costo estimado del tratamiento anual</h1>

                    <form className="costo-form">
                        <div className="form-control">
                            <select name="city" id="city">
                            <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                            </select>

                            <p className="form-text">Monto</p>
                        </div>
                    </form>

                    <div className="resultado-costo_detalle">
                        <h2>Detalles*:</h2>

                        <ul>
                            <li>Diagnóstico: Mamografía  / Radiografía / Tomografía $monto</li>
                            <li> Estudios: Estudio molecular para HER2 $costo</li>
                            <li>Cirugía: Mastectomía</li>
                            <li> Radioterapia: Hasta 15 sesiones de radioterapia</li>
                            <li> Tratamiento Farmacológico: $costo <br/> Radioterapia de 4 a 6 ciclos Hormonoterapia Terapia dirigida que puede incluir: Trastuzumab, Alectinib, xxxxx</li>
                            <li> Total por 1 año </li>
                        </ul>
                    </div>
                </div>

                <div className="buttons">
                    <form className="buttons-form">
                        <button className="btn btn-generar">Generar Preaprobación</button>
                        <button className="btn btn-descargar">Descargar Simulacion</button>
                        <button className="btn btn-finalizar">Finalizar Simulación</button>
                    </form>
                </div>


        </div>
    )

}

export default Resultado;