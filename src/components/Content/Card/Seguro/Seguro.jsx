import * as React from 'react';

const Seguro = () =>{
    return(
        <div className="seguro">
                <h1>Datos de tu seguro:</h1>
                <p>
                Tengo dudas sobre mi póliza <br/> 
                <a href="#" className="link"> Quiero contactar a mi seguro</a>
                </p>

                <form className="seguro-form">
                    <div className="seguro-form-control">
                    <label htmlFor="aseguradora">Aseguradora</label>
                        <select name="hormonal" id="hormonal">
                            <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>

                    <div className="seguro-form-control">
                        <label htmlFor="suma">Suma asegurada:</label>
                        <input type="text" name="suma"/>
                    </div>

                    <div className="seguro-form-control">
                        <label htmlFor="deducible">Deducible:</label>
                        <input type="text"/>
                    </div>

                    <div className="seguro-form-control">
                        <label htmlFor="coasegura">Coaseguro:</label>
                        <input type="text"/>
                    </div>

                </form>

                <div className="seguro-form-control">
                        <label htmlFor="vigencia">Vigencia:</label>
                        <input type="date" name="vigencia"/>
                </div>

                <div className="marginBottom"></div>

                <button className="btn btn-siguiente">Siguiente</button> 

            </div>
    )

}

export default Seguro;