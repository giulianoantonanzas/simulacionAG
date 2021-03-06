import React, { useState } from 'react'
import { PasoContext } from '../../../../context/PasoContext';
import Simulacion from '../../../../api/simulacionAPI';


const Inicio = () => {
    const { paso, setPaso } = React.useContext(PasoContext);
    const [error, setError] = React.useState("")

    const [isButtonActive, setButtonActive] = React.useState(false);

    const [check, setCheck] = React.useState(false);

    function handleCheckBox(e) {
        setCheck(e.target.checked)
    }

    function ingresandoNumSimulacion(e) {
        setPaso({ ...paso, simulation_number: e.target.value })
        if (e.target.value != '') {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }

    function redireccionResultado(e) {
        e.preventDefault()
        if (isButtonActive) {
            Simulacion.getSimulacionById(paso.simulation_number).then(data => {
                //esto esta mal, lo que intento hacer es que si obtube un dato valido, entonces que hago lo que esta dentro del if.
                if (data.identificador) {
                    console.log(data)
                    const deducibleData = data.deducible.toString().slice(0, -2);
                    const sumaAsegDat = data.suma_asegurada.toString().slice(0, -2);
                    console.log(data)
                    setPaso({
                        ...paso,
                        id: 5,
                        costo_total: data.costo_total,
                        suma_asegurada: sumaAsegDat,
                        deducible: deducibleData,
                        coaseguro: data.coaseguro,
                        mama: data.etapa_cdm,
                        hormonal: data.receptor_hormonal,
                        her: data.status_her,
                        brca: data.status_brca,
                        simulation_number: data.identificador,
                        items: data.items,
                        id_aseguradora: data.id_aseguradora,
                        id_etapa_cdm: data.id_etapa_cdm,
                        id_institucion: data.id_institucion,
                        id_receptor_hormonal: data.id_receptor_hormonal,
                        id_status_brca: data.id_status_brca,
                        id_status_her: data.id_status_her,
                        isSave: true,
                        aprobed_forms: 5,
                    })
                }
            }).catch(setError("no encontramos resultados"))
        }
    }

    function handleSiguiente(e) {
        e.preventDefault();

        setPaso({ ...paso, id: 2, aprobed_forms: paso.aprobed_forms + 1 });
    }
    return (
        <div className="inicio">
            <div className="inicio-text">
                <h1 className="inicio-title">Antes de comenzar:</h1>

                <div className="inicio-text_grid">
                    <div className="item">
                        <h1>1</h1>
                        <p>
                            Ten a la mano la car??tula de tu p??liza
                        </p>
                    </div>
                    <div className="item">
                        <h1>2</h1>
                        <p>
                            Aseg??rate de contar con tu diagn??stico m??dico
                        </p>
                    </div>
                </div>
            </div>

            <form className="inicio-form">
                <div className="form-control">
                    <input type="checkbox" name="check" onClick={handleCheckBox} />
                    <label htmlFor="check">Acepto los
                        <a href="#" className="link-terminos"> T??rminos y Condiciones </a>
                        as?? como el
                        <a href="#" className="link-terminos"> Aviso de Privacidad </a>
                    </label>
                </div>

            </form>

            <input type="button"
                className="btn btn-siguiente marginBottom"
                value="Iniciar Mi Simulaci??n"
                onClick={handleSiguiente}
                disabled={!check}
            />

            <div className="d-flex simulation-number-container">
                <label htmlFor="sumulation-number"><p className="link">Ya tengo mi simulaci??n</p></label>
                <input name="sumulation-number"
                    onChange={(e) => ingresandoNumSimulacion(e)}
                    value={paso.simulation_number} type="text" className="simulation-number" />
            </div>
            <input type="button"
                className={`btn marginBottom ${isButtonActive ? "activeBTN" : "desactiveBTN"}`}
                value="Mirar Informe"
                onClick={(e) => redireccionResultado(e)}
            />
            <p>{error}</p>
        </div>
    )

}

export default Inicio;

