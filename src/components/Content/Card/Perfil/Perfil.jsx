import * as React from 'react';

const Perfil = () =>{

    function handleClick(e){
        e.preventDefault();
    }

    return(
        <div className="perfil">
                <h1>Personaliza tu perfil: </h1>
                <p>Ingresa los datos del paciente que recibirá el tratamiento</p>

                <form className="perfil-form">
                    <div className="perfil-form_input">
                        <button className="btn btn-perfil" onClick={handleClick}>M</button>
                        <button className="btn btn-perfil" onClick={handleClick}>F</button>
                    </div>

                    <div className="horizontal-bar"></div>

                    <div className="text">
                        <input type="text" name="edad" placeholder="Edad"/>
                        <label id="edad"> Años </label>
                    </div>

                    
                </form>

                <button className="btn btn-siguiente">Siguiente</button>    

            </div>
    )

}

export default Perfil;