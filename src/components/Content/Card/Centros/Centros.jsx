import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

const Centros = () =>{

    const {paso, setPaso} = React.useContext(PasoContext);
    const [centro, setCentro] = React.useState(paso.centro);

    const buttonRef = React.useRef()

    React.useEffect(()=>{
        buttonRef.current.disabled = true;
            if(centro!='' &  paso?.aprobed_forms> 2){
                buttonRef.current.disabled = false;
                if(centro == 'Centro Oncológico'){
                    setCentro('Centro Oncológico');
                    setClassO('btn btn-centros activo');
                    setClassE('btn btn-centros');
                }else {
                    setCentro('Enfoque Multidisciplinario');

                    setClassE('btn btn-centros activo');
                    setClassO('btn btn-centros');
                }
            }
    }, [centro]);

    const [classO, setClassO] = React.useState('btn btn-centros');
    const [classE, setClassE] = React.useState('btn btn-centros');

    function handleClickO(e) {
        e.preventDefault();

        setCentro('Centro Oncológico');
        setClassO('btn btn-centros activo')
        setClassE('btn btn-centros')
    }

    function handleClickE(e) {
        e.preventDefault();

        setCentro('Enfoque Multidisciplinario');

        setClassE('btn btn-centros activo')
        setClassO('btn btn-centros')
    }

    function handleSiguiente(e) {
        e.preventDefault();

        let i = paso.id + 1;
        setPaso({...paso, id: i, centro: centro, aprobed_forms:paso.aprobed_forms+1})
        
    }

    return(
        <div className="centros">
                <h1 className="centros-title">Elige el tipo de atención que te gustaría contar:</h1>

                <form className="centros-form">

                    <div className="form-control">
    
                        <button className={classO} onClick={handleClickO}>
                        <h3>Centro Oncológico </h3>
                            <p> 
                            Atención médica por especialistas en oncología
                            </p>
                        </button>

                    </div>
                    
                    <div className="horizontal-bar"></div>

                    <div className="form-control">
                        <button className={classE} onClick={handleClickE}>
                        <h3>Enfoque Multidisciplinario </h3>                 
                            <p>
                            Atención médica por diversos especialistas
                            </p>
                        </button>
                    </div>

                </form>

                <button className="btn btn-siguiente" ref={buttonRef} onClick={handleSiguiente}>Siguiente</button>

        </div>
    )

}

export default Centros;