import * as React from 'react';
import { PasoContext } from '../../../../context/PasoContext';

import Simulacion from '../../../../api/simulacionAPI';

const matriz = [{id: 1, name: "gonzalo"},{id: 3, name: "zalo" },{id: 2, name: "lo" }]

const Seguro = () =>{

    const {paso, setPaso} = React.useContext(PasoContext);
    const [listaS, setListaS] = React.useState([]);
    const [seguro, setSeguro] = React.useState({id_aseguradora:-1,aseguradora: paso.aseguradora
        , suma_asegurada: paso.suma_asegurada, 
        deducible: paso.deducible, 
        coaseguro: paso.coaseguro,
        vigencia: paso.vigencia });
  
    
    const aseguradoraRef = React.createRef();
    const sumaRef = React.createRef();
    const deducibleRef = React.createRef();
    const coaseguraRef = React.createRef();
    const vigenciaRef = React.createRef();


    const buttonRef = React.useRef();

    React.useEffect(()=>{
        buttonRef.current.disabled = true;
            if(seguro.aseguradora !== '' && seguro.suma_asegurada!== 0 && seguro.deducible !== 0 && seguro.coasegura !== 0 && seguro.vigencia!==''){
                buttonRef.current.disabled = false;
                
            }

        if(!listaS.length){
            Simulacion.getAseguradoras().then(data => setListaS(data));
        }

        console.log('Seguro: ', seguro)

    },[seguro])
   
    function handleChangeA(e) {
        const aseguradoraID = listaS.filter(data => data.nombre === aseguradoraRef.current.value)
        // console.log(aseguradoraID);
        setSeguro({...seguro,id_aseguradora: aseguradoraID[0].id,aseguradora: aseguradoraRef.current.value});
    }

    function handleChangeS(e) {
        //Expresion regular para solo aceptar numero en input
        const re = /^[0-9\b]+$/;

        // solo toma valor ingresado si esta en blanco o pasa el test ER
        if (e.target.value === '' || re.test(e.target.value)) {
            setSeguro({...seguro,suma_asegurada: e.target.value}); 
        }
    }

    function handleChangeD(e) {
         //Expresion regular para solo aceptar numero en input
         const re = /^[0-9\b]+$/;

         // solo toma valor ingresado si esta en blanco o pasa el test ER
         if (e.target.value === '' || re.test(e.target.value)) {
             
             setSeguro({...seguro,deducible: e.target.value});
         }
    }

    function handleChangeC(e) {
          //Expresion regular para solo aceptar numero en input
          const re = /^[0-9\b]+$/;

          // solo toma valor ingresado si esta en blanco o pasa el test ER
          if (e.target.value === '' || re.test(e.target.value)) {
              setSeguro({...seguro,coaseguro: e.target.value});
          }
    }

    function handleChangeV(e) {
  
        setSeguro({...seguro,vigencia: vigenciaRef.current.value});
    }

    function handleClick(e) {
        e.preventDefault();
  
        switch(e.target.name){
            case 'suma':{
                e.target.value = '';
                break;
            }
            case 'deducible':{
                e.target.value = '';
                break;
            }
            case 'coasegura':{
                e.target.value = '';
                break;
            }
            
            
        }

    }


    function submitForm(e) {
        e.preventDefault();

        //id_aseguradora:

        // console.log('seguro Submit: ',seguro);
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
                        
                        {
                        (seguro.aseguradora!=='')?
                        // Si hay datos en PasoContext muestra el valor al usuario
                        <select name="aseguradora" id="aseguradora" onChange={handleChangeA} value={seguro.aseguradora} ref={aseguradoraRef}>
                        <option value="select" selected disabled>Seleccionar</option>
                        {
                            listaS.map((item)=>{
                                return (                                    
                                <option key={item.id} value={item.nombre}>{item.nombre}</option>
                                )
                            })
                        }
                        </select>
                        :
                        //Si  no hay valor en PasoConext le da a elegir
                        <select name="aseguradora" id="aseguradora" onChange={handleChangeA} ref={aseguradoraRef}>
                        <option value="select" selected disabled>Seleccionar</option>
                        {
                            listaS.map((item)=>{
                                return (                                    
                                <option key={item.id} value={item.nombre}>{item.nombre}</option>
                                )
                            })
                        }
                        </select>
                        }
                    </div>

                    <div className="seguro-form-control2">
                        <label htmlFor="suma">Suma asegurada:</label>
                        <span>$<input type="text" name="suma" onChange={handleChangeS} onClick={handleClick} value={seguro.suma_asegurada} ref={sumaRef}/></span>
                    </div>

                    <div className="seguro-form-control3">
                        <label htmlFor="deducible">Deducible:</label>
                        <span>$<input type="text" name="deducible" onChange={handleChangeD} onClick={handleClick} value={seguro.deducible} ref={deducibleRef}/></span>
                    </div>

                    <div className="seguro-form-control4">
                        <label htmlFor="coasegura">Coaseguro:</label>
                        <span><input type="text" name="coasegura" onChange={handleChangeC} onClick={handleClick} value={seguro.coaseguro} ref={coaseguraRef}/>%</span>
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