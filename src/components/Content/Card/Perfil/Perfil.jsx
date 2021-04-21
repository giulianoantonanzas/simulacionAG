import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

import iconMale from '../../../../fonts/iconMale.svg';
import iconMaleActive from '../../../../fonts/iconMaleActive.svg';

import iconFemale from '../../../../fonts/iconFemale.svg';
import iconFemaleActive from '../../../../fonts/iconFemaleActive.svg';


const Perfil = () =>{
    
    const {paso, setPaso} = React.useContext(PasoContext);

    //Maneja cambios en genero y edad
    const [perfil, setPerfil] = React.useState({gender: paso.gender, edad: paso.edad});

    const buttonRef = React.useRef();
    const edadRef = React.useRef();

    //Cambia clase de estilos de botones de hombre y mujer
    const [classButtonM, setButtonM] = React.useState("btn btn-perfil");
    const [classButtonF, setButtonF] = React.useState("btn btn-perfil");
    //---------------------------------//

    React.useEffect(()=>{
        buttonRef.current.disabled = true;
            if(perfil.gender!='' && perfil.edad!==''){
                buttonRef.current.disabled = false;
                edadRef.current.value = perfil.edad;
                if(perfil.gender == 'Masculino'){
                    setButtonM("btn btn-perfil-activo");
                    setButtonF("btn btn-perfil");
                }
                if(perfil.gender == 'Femenino'){
                    setButtonF("btn btn-perfil-activo");
                    setButtonM("btn btn-perfil");
                }
            }
    })



    function handleClickM(e){
        e.preventDefault();
        setPerfil({...perfil, gender: 'Masculino'})

        setButtonM("btn btn-perfil-activo");
        setButtonF("btn btn-perfil");
    }

    function handleClickF(e){
        e.preventDefault();
        setPerfil({...perfil, gender: 'Femenino'})

        setButtonF("btn btn-perfil-activo");
        setButtonM("btn btn-perfil");
    }

    function handleEdad(e){
        e.preventDefault();
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
    
        if (e.target.value === '' || re.test(e.target.value)) {
           
           setPerfil({...perfil, edad: e.target.value});
        }
    }


    function handleSiguiente(e){
        e.preventDefault();

        let i = paso.id + 1;
        
        //contador de aprobados. y se mueve el id
        setPaso({...paso, id: i , gender: perfil.gender, edad: perfil.edad, aprobed_forms:paso.aprobed_forms+1});

    }

    function handleClick(e) {
        e.preventDefault();

        e.target.value = '';
    }
    


    return(
        <div className="perfil">
                <h1>Personaliza tu perfil: </h1>
                <p>Ingresa los datos del paciente que recibirá el tratamiento</p>

                <form className="perfil-form">
                    <div className="perfil-form_input">
                        <button className={classButtonM} onClick={handleClickM}> 
                        { perfil.gender == 'Masculino' ? 
                             <img src={iconMaleActive} alt="Male"/> : <img src={iconMale} alt="Male"/> }
                        </button>
                        <button className={classButtonF} onClick={handleClickF}>    {   perfil.gender == 'Femenino' ? 
                             <img src={iconFemaleActive} alt="Female"/> : <img src={iconFemale} alt="Female"/> }
                        </button>
                    </div>

                    <div className="horizontal-bar"></div>

                    <div className="text-age">
                        <input type="text" name="edad" placeholder="Edad"
                         pattern="[0-9]*"
                         ref={edadRef}
                         value={perfil.edad}
                         onChange={handleEdad}
                         onClick={handleClick}
                         autoComplete="false"
                         />
                        <label id="edad"> años </label>
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