import React from 'react'

function View(){
    return(
        
        <tbody>
            <>{userData.length > 0 ? (
            userData.map((udata) => {
                const { id, cate_name, active } = udata;
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{cate_name}</td>
                        <td>{active}</td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3">No data available</td>
            </tr>
        )}</>
        
    </tbody>
    )
}