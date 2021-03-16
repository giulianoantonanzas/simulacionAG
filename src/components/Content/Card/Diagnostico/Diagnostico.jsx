import * as React from 'react';

const Diagnostico = () =>{
    return(
        <div className="diagnostico">
                <h1>Datos de tu diagnóstico:</h1>

                <form className="diagnostico-form">
                    <div className="form-control">
                        <label htmlFor="mama">Etapa del cáncer de mama</label>
                        <select name="mama" id="mama">
                            <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="hormonal">Receptor Hormonal</label>
                        <select name="hormonal" id="hormonal">
                            <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="her">Estatus de HER2(modifica)</label>
                        <select name="her" id="her">
                        <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="brca">Estatus de BRCA</label>
                        <select name="brca" id="brca">
                        <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>

                </form>

                <button className="btn btn-siguiente">Siguiente</button>


            </div>
    )

}

export default Diagnostico;