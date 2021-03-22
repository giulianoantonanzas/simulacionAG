import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

import iconMale from '../../../../fonts/iconMale.svg';
import iconFemale from '../../../../fonts/iconFemale.svg';


const Perfil = () =>{
    
    const {paso, setPaso} = React.useContext(PasoContext);

    //Maneja cambios en genero y edad
    const [perfil, setPerfil] = React.useState({genre: paso.genre, edad: paso.edad});

    const buttonRef = React.useRef();
    const edadRef = React.useRef();

    //Cambia clase de estilos de botones de hombre y mujer
    const [classButtonM, setButtonM] = React.useState("btn btn-perfil");
    const [classButtonF, setButtonF] = React.useState("btn btn-perfil");
    //---------------------------------//

    React.useEffect(()=>{
        buttonRef.current.disabled = true;
            if(perfil.genre!='' && perfil.edad!=0){
                buttonRef.current.disabled = false;
                edadRef.current.value = perfil.edad;
                if(perfil.genre == 'M'){
                    setButtonM("btn btn-perfil-activo");
                    setButtonF("btn btn-perfil");
                }
                if(perfil.genre == 'F'){
                    setButtonF("btn btn-perfil-activo");
                    setButtonM("btn btn-perfil");
                }
            }

    },[perfil])



    function handleClickM(e){
        e.preventDefault();
        setPerfil({...perfil, genre: 'M'})

        setButtonM("btn btn-perfil-activo");
        setButtonF("btn btn-perfil");
    }

    function handleClickF(e){
        e.preventDefault();
        console.log(perfil)
        setPerfil({...perfil, genre: 'F'})

        setButtonF("btn btn-perfil-activo");
        setButtonM("btn btn-perfil");
    }

    function handleEdad(e){
        e.preventDefault();
        setPerfil({...perfil, edad: edadRef.current.value});
    }


    function handleSiguiente(e){
        e.preventDefault();

        let i = paso.id + 1;
        setPaso({...paso, id: i, genre: perfil.genre, edad: perfil.edad})

    }


    return(
        <div className="perfil">
                <h1>Personaliza tu perfil: </h1>
                <p>Ingresa los datos del paciente que recibirá el tratamiento</p>

                <form className="perfil-form">
                    <div className="perfil-form_input">
                        <button className={classButtonM} onClick={handleClickM}><img src={iconMale} alt="Male"/></button>
                        <button className={classButtonF} onClick={handleClickF}><img src={iconFemale} alt="Female"/></button>
                    </div>

                    <div className="horizontal-bar"></div>

                    <div className="text">
                        <input type="text" name="edad" placeholder="Edad"
                         ref={edadRef}
                         value={perfil.edad}
                         onChange={handleEdad}
                         autoComplete="false"
                         />
                        <label id="edad"> Años </label>
                    </div>

                    
                </form>

                <button className="btn btn-siguiente" 
                onClick={handleSiguiente} 
                ref={buttonRef} 
                >
                    Siguiente
                </button>    

            </div>
    )

}

export default Perfil;