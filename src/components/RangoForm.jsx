import React, { useState } from 'react'
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
function RangoForm({onCreateRango= (rango)=>{}}) {

    const [nombre, setNombre] = useState("");
    const handleClick = ()=>{
        const rango = {nombre};
        onCreateRango(rango);
    };

    return (
        <Panel header="Registrar Rango">
            <div className="mb-3 d-flex flex-column">
                <label htmlFor="nombre-rango-txt">Nombre</label>
                <InputText id="nombre-rango-txt"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                aria-describedby="nombre-rango-help" />
                <small id="nombre-rango-help">
                    Ingrese descripcion (nombre) del rango
                </small>
            </div>
            <div className="mb-3 mt-2">
                <Button onClick={handleClick} label='Registrar' severity='info' ></Button>
            </div>
        </Panel>
    )
}

export default RangoForm
