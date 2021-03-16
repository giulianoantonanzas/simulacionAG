import * as React from 'react';

const Inicio = () =>{
    return(
        <div className="inicio">
                <div className="inicio-text">
                    <h1 className="inicio-title">Antes de comenzar:</h1>
                    
                    <div className="inicio-text_grid">
                        <p> <strong>1</strong> 
                            Ten a la mano la carátula de tu póliza
                        </p>
                        <p>
                            <strong>2</strong> 
                            Asegúrate de contar con tu diagnóstico médico
                        </p>
                    </div>
                </div>

                <form className="inicio-form">
                    <div className="form-control">
                        <input type="checkbox" name="check"/>
                        <label htmlFor="check">Acepto los 
                        <a href="#" className="link-terminos"> Términos y Condiciones </a>
                        así como el 
                        <a href="#" className="link-terminos">Aviso de Privacidad</a>
                        </label>
                    </div>
                    <input type="button" className="btn btn-siguiente" value="Iniciar Mi Simulación"/>
                </form>

                <a href="#" className="link">Ya tengo mi simulación</a>


            </div>
    )

}

export default Inicio;

