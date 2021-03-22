import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';


const Inicio = () =>{
    const{paso, setPaso} = React.useContext(PasoContext);

    const [check, setCheck] = React.useState(false);

    function handleCheckBox(e){
        // console.log('checkbox ',e.target.checked);
        setCheck(e.target.checked)
    }

    function handleSiguiente(e){
        e.preventDefault();

        setPaso({...paso, id: 2});
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

                <a href="#" className="link">Ya tengo mi simulación</a>


            </div>
    )

}

export default Inicio;

