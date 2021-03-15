import * as React from 'react';

const Perfil = () =>{
    return(
        <div className="perfil">
                <h1>Personaliza tu perfil: </h1>
                <p>Ingresa los datos del paciente que recibirá el tratamiento</p>

                <form className="perfil-form">
                    <button className="btn btb-perfil">Male</button>
                    <button className="btn btb-perfil">Female</button>
                    <div className="perfil-form_input">
                        <input type="text" name="edad" placeholder="Edad"/>
                        <label id="edad"> Años </label>

                    </div>
                    <button className="btn btn-send">Siguiente</button>
                </form>


            </div>
    )

}

export default Perfil;