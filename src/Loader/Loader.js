import React from "react";
import './Loader.css';

const Loader = () => {
    return(
        <div className="lds-wrapper">
            <div className='lds-dual-ring'></div>
        </div>
    )
}


export default Loader;