import React from "react";

const TableSearch = (props) => {
    return(
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
            </div>
            <input type="text" className="form-control"/>
        </div>
    )
}

export default TableSearch;


