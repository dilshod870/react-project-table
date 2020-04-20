import React from "react";

const Table = (props) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th onClick={props.onSort.bind(null,'id')}>ID { props.sortField === 'id' ? props.sort : ''} </th>
                    <th onClick={props.onSort.bind(null,'firstName')}>First Name { props.sortField === 'firstName' ? props.sort : ''}</th>
                    <th onClick={props.onSort.bind(null,'lastName')}>Last Name { props.sortField === 'lastName' ? props.sort : ''}</th>
                    <th onClick={props.onSort.bind(null,'email')}>Email { props.sortField === 'email' ? props.sort : ''}</th>
                    <th onClick={props.onSort.bind(null,'phone')}>Phone { props.sortField === 'phone' ? props.sort : ''}</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => (
                    <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null,item)}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}

export default Table;

