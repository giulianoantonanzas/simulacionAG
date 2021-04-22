import React, {useState} from 'react'
import { PasoContext } from '../../../../context/PasoContext';


const Inicio = () =>{
    const{paso, setPaso} = React.useContext(PasoContext);

    const [check, setCheck] = React.useState(false);

    function handleCheckBox(e){
        setCheck(e.target.checked)
    }

    function handleSiguiente(e){
        e.preventDefault();
        if(paso.simulation_number!=''){
            console.log("ya tengo la simulacion")
        }
        setPaso({...paso, id: 2 , aprobed_forms:paso.aprobed_forms+1});
    }
    return(
        <div className="inicio">
                <div className="inicio-text">
                    <h1 className="inicio-title">Antes de comenzar:</h1>
                    
                    <div className="inicio-text_grid">
                        <div className="item">
                        <h1>1</h1> 
                        <p>
                            Ten a la mano la carátula de tu póliza
                        </p>
                        </div>
                        <div className="item">
                            <h1>2</h1>
                        <p>
                            Asegúrate de contar con tu diagnóstico médico
                        </p>
                        </div>
                    </div>
                </div>

                <form className="inicio-form">
                    <div className="form-control">
                        <input type="checkbox" name="check" onClick={handleCheckBox}/>
                        <label htmlFor="check">Acepto los 
                        <a href="#" className="link-terminos"> Términos y Condiciones </a>
                        así como el 
                        <a href="#" className="link-terminos"> Aviso de Privacidad </a>
                        </label>
                    </div>
                    
                </form>
                
                <input type="button" 
                className="btn btn-siguiente marginBottom" 
                value="Iniciar Mi Simulación" 
                onClick={handleSiguiente}
                disabled={!check}
                />

                <div className="d-flex simulation-number-container">
                    <label htmlFor="sumulation-number"><p className="link">Ya tengo mi simulación</p></label>
                    <input name="sumulation-number"
                    onChange={(e)=>{setPaso({...paso,simulation_number: e.target.value})}}
                    onClick={()=>{setPaso({...paso,simulation_number:''})}}
                    value={paso.simulation_number} type="text" className="simulation-number"/>
                </div>
               
            </div>
    )

}

export default Inicio;

