import * as React from 'react';

import Simulacion from '../../../../../api/simulacionAPI';
import {PasoContext} from '../../../../../context/PasoContext'


const FormularioContacto = ({nroSimulacion,costo_total}) => {
    const [user, setUser] = React.useState({nombre: '', apellido_pa: '', apellido_ma: '', 
    fecha_nac: '', email: '', poliza: ''});

    const {paso} = React.useContext(PasoContext);

    const [check, setCheck] = React.useState(false);

    function handleCheckBox(e){
        // console.log('checkbox ',e.target.checked);
        setCheck(e.target.checked)
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        console.log(nroSimulacion, paso, user, costo_total);
    
         Simulacion.postGenerarPreaprobacion(nroSimulacion, paso, user, costo_total)
         .then(res => console.log(res));
    }
    
    function handleChange(e) {
        e.preventDefault();
        
        switch(e.target.name){
            case "name": {
                setUser({...user, nombre: e.target.value});
                break;
            }
            case "materno": {
                setUser({...user, apellido_ma: e.target.value});
                break;
            }
            case "paterno": {
                setUser({...user, apellido_pa: e.target.value});
                break;
            }
            case 'birth': {
                setUser({...user, fecha_nac: e.target.value});
                break;
            }
            case "email": {
                setUser({...user, email: e.target.value});
                break;
            }
            case "nropoliza": {
                setUser({...user, poliza: e.target.value});
                break;
            }
        }
    }

    return (
        <div className="contacto">
            <h1 className="contacto-title">Ingresa tus datos de contacto para generar una preaprobación 
                y puedas acudir a XXXXXXX</h1>

                <form className="contacto-form" onSubmit={handleSubmit}>
                    
                    <div className="contacto-form_card">
                        <div className="form-control">
                            <label htmlFor="name">Nombre(s): </label>
                            <input type="text" name="name" value={user.nombre} onChange={handleChange}/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="materno">Apellido Materno: </label>
                            <input type="text" name="materno" value={user.apellido_ma} onChange={handleChange}/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="paterno">Apellido Paterno: </label>
                            <input type="text" name="paterno" value={user.apellido_pa} onChange={handleChange}/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="birth">Fecha de Nacimiento: </label>
                            <input type="date" name="birth" value={user.apellido_pa} onChange={handleChange}/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="email">E-mail: </label>
                            <input type="text" name="email" value={user.email} onChange={handleChange}/>
                        </div>

                        <div className="form-control">
                            <label htmlFor="nropoliza">Número de Póliza: </label>
                            <input type="text" name="nropoliza" value={user.poliza} onChange={handleChange} />
                        </div>

                        <div className="contacto-form_card--terminos">
                        <input type="checkbox" name="nropoliza" onClick={handleCheckBox}/>
                        <label htmlFor="nropoliza">Para continuar, acepta los términos 
                        y Condiciones y el Aviso de Privacidad </label>
                        </div>
                    </div>


                    <input type="Submit" className="btn btn-enviar"                    
                    disabled={!check}
                     value="Enviar Datos"/>
                </form>
        </div>
    )

}


export default FormularioContacto;