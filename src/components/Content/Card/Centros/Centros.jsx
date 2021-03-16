import * as React from 'react';

const Centros = () =>{
    return(
        <div className="centros">
                <h1>Elige la el tipo de atención que te gustaría contar:</h1>

                <form className="centros-form">

                    <div className="form-control">
    
                        <button className="btn btn-centros">
                        <h3>Centro Oncológico </h3>
                            <p> 
                            Atención exclusiva por profesionales 
                            de salud con especialidad oncológica
                            </p>
                        </button>

                    </div>
                    
                    <div className="horizontal-bar"></div>

                    <div className="form-control">
                        <button className="btn btn-centros">
                        <h3>Enfoque Multidiscuplinario </h3>                 
                            <p>
                            Atención por un equipo médico con distintas especialidades para 
                            cubrir un tratamiento integral.Ejemplo: Psicológico, Nutrición y Oncológico
                            </p>
                        </button>
                    </div>

                </form>

                <button className="btn btn-siguiente">Siguiente</button>

        </div>
    )

}

export default Centros;