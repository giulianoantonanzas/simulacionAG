import * as React from 'react';
import { useForm } from "react-hook-form";

import Simulacion from '../../../../../api/simulacionAPI';
import { PasoContext } from '../../../../../context/PasoContext'


const FormularioContacto = ({ nroSimulacion, costo_total }) => {
    const [user, setUser] = React.useState({
        nombre: '', apellido_pa: '', apellido_ma: '',
        fecha_nac: '', email: '', poliza: ''
    });

    const { register, handleSubmit, watch, errors } = useForm();



    const { paso } = React.useContext(PasoContext);

    const [check, setCheck] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [error, setError] = React.useState('');

    function handleCheckBox(e) {
        setCheck(e.target.checked);

    }

    function onSubmit(data) {
        console.log(paso ,data ,costo_total)
        Simulacion.postGenerarPreaprobacion(paso, data, costo_total)
            .then(res => {
                if (res.data === 'Almacenado')
                    setMsg('Los datos han sido guardados en nuestra base, nos comunicaremos a la brevedad.');
                console.log(res)
            })
            .catch(err => console.log(err));
    }

    function handleChange(e) {
        e.preventDefault();


        switch (e.target.name) {
            case "name": {
                setUser({ ...user, nombre: e.target.value });
                break;
            }
            case "materno": {
                setUser({ ...user, apellido_ma: e.target.value });
                break;
            }
            case "paterno": {
                setUser({ ...user, apellido_pa: e.target.value });
                break;
            }
            case 'birth': {
                setUser({ ...user, fecha_nac: e.target.value });
                break;
            }
            case "email": {
                setUser({ ...user, email: e.target.value });
                break;
            }
            case "nropoliza": {
                setUser({ ...user, poliza: e.target.value });
                break;
            }
        }
    }

    return (
        <div className="contacto">
            <h1 className="contacto-title">Ingresa tus datos de contacto para generar una preaprobación
                y puedas acudir a XXXXXXX</h1>

            <form className="contacto-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="contacto-form_card">
                    <div className="form-control">
                        <label htmlFor="name">Nombre(s): </label>
                        <input type="text" name="name" onChange={handleChange} ref={register({ required: true })} />

                    </div>
                    {errors.name && <span className="alert-msg">Este campo es requerido (*)</span>}

                    <div className="form-control">
                        <label htmlFor="materno">Apellido Materno: </label>
                        <input type="text" name="materno" onChange={handleChange}
                            ref={register({ required: true })} />

                    </div>
                    {errors.materno && <span className="alert-msg">Este campo es requerido (*)</span>}

                    <div className="form-control">
                        <label htmlFor="paterno">Apellido Paterno: </label>
                        <input type="text" name="paterno" onChange={handleChange}
                            ref={register({ required: true })} />

                    </div>
                    {errors.paterno && <span className="alert-msg">Este campo es requerido (*)</span>}

                    <div className="form-control">
                        <label htmlFor="birth">Fecha de Nacimiento: </label>
                        <input type="date" name="birth" onChange={handleChange}
                            ref={register({ required: true })} />

                    </div>
                    {errors.birth && <span className="alert-msg">Este campo es requerido (*)</span>}

                    <div className="form-control">
                        <label htmlFor="email">E-mail: </label>
                        <input type="email" name="email" onChange={handleChange}
                            ref={register({
                                required: "El campo es requerido (*)",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "No es válido como email"
                                }
                            })} />

                    </div>
                    {errors.email && <span className="alert-msg">{errors.email.message}</span>}

                    <div className="form-control">
                        <label htmlFor="nropoliza">Número de Póliza: </label>
                        <input type="text" name="nropoliza"
                            ref={register({
                                required: "El campo es requerido (*)",
                                pattern: {
                                    value: /^[0-9\b]+$/,
                                    message: "No es válido como número"
                                }
                            })} />

                    </div>
                    {errors.nropoliza && <span className="alert-msg">{errors.nropoliza.message}</span>}

                    <div className="contacto-form_card--terminos">
                        <input type="checkbox" name="nropoliza" onClick={handleCheckBox} />
                        <label htmlFor="nropoliza">Para continuar, acepta los términos
                        y Condiciones y el Aviso de Privacidad </label>
                    </div>
                </div>


                <input type="Submit" className="btn btn-enviar"
                    disabled={!check}
                    value="Enviar Datos" />
                {
                    (msg === '') ? <p hidden={true}></p> : <p>{msg}</p>
                }
            </form>

        </div>
    )

}


export default FormularioContacto;