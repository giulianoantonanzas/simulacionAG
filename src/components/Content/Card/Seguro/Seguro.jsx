import * as React from 'react';

const Seguro = () =>{
    return(
        <div className="seguro">
                <h1>Datos de tu seguro:</h1>
                <p>
                Tengo dudas sobre mi póliza Quiero contactar a mi seguro
                </p>

                <form className="seguro-form">
                    <div className="seguro-form-control">
                        <label htmlFor="aseguradora">Asegurador:</label>
                        <input type="text" name="aseguradora"/>
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

                    <div className="seguro-form-control">
                        <label htmlFor="vigencia">Vigencia:</label>
                        <input type="text" name="vigencia"/>
                    </div>


                    <button className="btn btn-siguiente">Siguiente</button>
                </form>


            </div>
    )

}

export default Seguro;