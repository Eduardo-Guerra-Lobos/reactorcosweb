import { Panel } from 'primereact/panel'
import React, { useState } from 'react'
import {SelectButton} from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

//TODO: Para validar props se tienda a utilizar PropTypes

function GuerreroForm({rangos=[], onCreateGuerrero=(guerrero)=>{}}) {
    const [nombre, setNombre] = useState("");
    const tiposGuerreros = ["Orco", "Uruk"];
    const [tipo, setTipo] = useState(tiposGuerreros[0]);
    const [nivel, setNivel] = useState(1);
    const [rangoSel, setRangoSel] = useState(rangos[0])
   
    const handleClick = ()=>{

        const guerrero = {nombre: nombre,tipo:tipo,nivel:nivel, rango: rangoSel};
        onCreateGuerrero(guerrero);
    }

    return (
        <Panel header="Ingresar Guerrero">
            <div className="mb-3 d-flex flex-column">
                <label htmlFor="nombre-guerrero-txt">Nombre</label>
                <InputText id="nombre-guerrero-txt"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    aria-describedby="nombre-guerrero-help" />
            </div>
            <div className="mb-3 d-flex flex-row justify-content-between">
                    <label htmlFor="tipo-guerrero-select">Tipo de Guerrero</label>
                    <SelectButton id='tipo-guerrero-select' options={tiposGuerreros} value={tipo} onChange={e=>setTipo(e.value)} ></SelectButton>
            </div>
            <div className="mb-3 d-flex flex-row justify-content-between">
                <label htmlFor="nivel-knob">Nivel</label>
                <Knob id='nivel-knob' value={nivel} min={1} max={100} onChange={e=>setNivel(e.value)} ></Knob>
            </div>
            <div className="mb-3 d-flex flex-column">
                 <label htmlFor="rango-guerrero-select">Rango</label>
                 <Dropdown id="rango-guerrero-select" value={rangoSel} onChange={e=>{setRangoSel(e.value)}} options={rangos} optionLabel="nombre" 
                    placeholder="Seleccione un Rango" checkmark={true} highlightOnSelect={false} />
      
            </div>
            <div className="mb-3 d-flex flex-column">
                <Button label='Registrar' severity='info' onClick={handleClick} rounded></Button>
            </div>
        </Panel>
    )
}

export default GuerreroForm
