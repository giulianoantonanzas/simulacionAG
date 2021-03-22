import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

import Simulacion from '../../../../api/simulacionAPI';

const Seguro = () =>{

    const {paso, setPaso} = React.useContext(PasoContext);
    const [listaS, setListaS] = React.useState([]);
    const [seguro, setSeguro] = React.useState({aseguradora: paso.aseguradora
        , suma: paso.suma, 
        deducible: paso.deducible, 
        coasegura: paso.coasegura,
        vigencia: paso.vigencia });
  
    
    const aseguradoraRef = React.createRef();
    const sumaRef = React.createRef();
    const deducibleRef = React.createRef();
    const coaseguraRef = React.createRef();
    const vigenciaRef = React.createRef();


    const buttonRef = React.useRef();

    React.useEffect(()=>{
        buttonRef.current.disabled = true;
            if(seguro.aseguradora != '' && seguro.suma!= 0 && seguro.deducible != 0 && seguro.coasegura != 0 && seguro.vigencia!=''){
                buttonRef.current.disabled = false;
                
            }

        if(!listaS.length){
            Simulacion.getAseguradoras().then(data => setListaS(data));
        }

        console.log('Seguro: ', seguro)

    },[seguro])

    function handleChangeA(e) {
        setSeguro({...seguro,aseguradora: aseguradoraRef.current.value});
    }

    function handleChangeS(e) {
        setSeguro({...seguro,suma: sumaRef.current.value});
    }

    function handleChangeD(e) {
        setSeguro({...seguro,deducible: deducibleRef.current.value});
    }

    function handleChangeC(e) {
        setSeguro({...seguro,coasegura: coaseguraRef.current.value});
    }

    function handleChangeV(e) {
        setSeguro({...seguro,vigencia: vigenciaRef.current.value});
    }


    function submitForm(e) {
        e.preventDefault();

        console.log('seguro Submit: ',seguro);
        let i = paso.id+1;
        setPaso({...paso, id: i,  ...seguro})

    }
    return(
        <div className="seguro">
                <h1>Datos de tu seguro:</h1>
                <p>
                Tengo dudas sobre mi póliza <br/> 
                <a href="#" className="link"> Quiero contactar a mi seguro</a>
                </p>

                <form className="seguro-form" onSubmit={submitForm}>
                    <div className="seguro-form-control1">
                    <label htmlFor="aseguradora">Aseguradora</label>
                        <select name="hormonal" id="hormonal" onChange={handleChangeA} value={seguro.aseguradora} ref={aseguradoraRef}>
                        <option value="select" disabled>Seleccionar</option>
                        {
                            listaS.map((item)=>{
                                return (                                    
                                <option value={item.nombre}>{item.nombre}</option>
                                )
                            })
                        }
                        </select>
                    </div>

                    <div className="seguro-form-control2">
                        <label htmlFor="suma">Suma asegurada:</label>
                        <span>$<input type="text" name="suma" onChange={handleChangeS} value={seguro.suma} ref={sumaRef}/></span>
                    </div>

                    <div className="seguro-form-control3">
                        <label htmlFor="deducible">Deducible:</label>
                        <span>$<input type="text" name="deducible" onChange={handleChangeD} value={seguro.deducible} ref={deducibleRef}/></span>
                    </div>

                    <div className="seguro-form-control4">
                        <label htmlFor="coasegura">Coaseguro:</label>
                        <span><input type="text" name="coasegura" onChange={handleChangeC} value={seguro.coasegura} ref={coaseguraRef}/>%</span>
                    </div>
                    
                    <div className="seguro-form-control5">
                           <label htmlFor="vigencia">Vigencia:</label>
                           <input type="date" name="vigencia" onChange={handleChangeV} value={seguro.vigencia} ref={vigenciaRef}/>
                    </div>

                    <div className="seguro-form-control6">
                        <input  className="btn btn-siguiente" ref={buttonRef}   value="Siguiente" type="submit"/>
                    </div>

                </form>

               

                <div className="marginBottom"></div>


            </div>
    )

}

export default Seguro;