import * as React from 'react';

function handleSubmit(e) {
    e.preventDefault();
}

const FormularioContacto = () => {
    return (
        <div className="contacto">
            <h1>Ingresa tus datos de contacto para generar una preaprobación 
                y puedas acudir a XXXXXXX</h1>

                <form className="contacto-form" onSubmit={handleSubmit}>
                    
                    <div className="contacto-form_card">
                        <div className="form-control">
                        <label htmlFor="name">Nombre: </label>
                        <input type="text" />
                        </div>

                        <div className="form-control">
                        <label htmlFor="materno">Apellido Materno: </label>
                        <input type="text" name="materno"/>
                        </div>

                        <div className="form-control">
                        <label htmlFor="paterno">Apellido Paterno: </label>
                        <input type="text" name="paterno" />
                        </div>

                        <div className="form-control">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" name="email"/>
                        </div>

                        <div className="form-control">
                        <label htmlFor="nropoliza">Número de Póliza: </label>
                        <input type="text" name="nropoliza" />
                        </div>

                        <div className="form-control">
                        <input type="checkbox" name="nropoliza" />
                        <label htmlFor="nropoliza">Para continuar, acepta los términos 
                        y Condiciones y el Aviso de Privacidad </label>
                        </div>
                    </div>


                    <input type="button" className="btn btn-generar" value="Enviar Datos"/>
                </form>
        </div>
    )

}


export default FormularioContacto;