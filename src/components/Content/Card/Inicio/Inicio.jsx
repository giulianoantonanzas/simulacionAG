import * as React from 'react';

const Inicio = () =>{
    return(
        <div className="inicio">
                <div className="inicio-text">
                    <h1 className="inicio-title">Antes de comenzar:</h1>
                    <p> 1 Ten a la mano la carátula de tu póliza
                    </p>
                    <p>
                    2 Asegúrate de contar con tu diagnóstico médico
                    </p>
                </div>

                <form className="inicio-form">
                    <input type="checkbox"/>
                    <label for="">Acepto los Términos y Condiciones así como el Aviso de Privacidad</label>
                    <input type="button" className="btn btn-send" value="Iniciar Mi Simulación"/>
                </form>

                <a href="#" className="link">Ya tengo mi simulación</a>


            </div>
    )

}

export default Inicio;

