import * as React from 'react';
import { PasoContext } from '../../context/PasoContext';

const NavBar = () => {
    const {paso, setPaso} = React.useContext(PasoContext);

    function handleClick(e) {
        e.preventDefault();

        setPaso({...paso, id: 1});
    }

    return(
        <div className="nav">
            <div className="nav-logo">
                <h1>Logo</h1>
            </div>
            <div className="nav-inicio">
                <a href="#" className="link" onClick={handleClick}>inicio</a>
            </div>
        </div>
    )
}

export default NavBar;