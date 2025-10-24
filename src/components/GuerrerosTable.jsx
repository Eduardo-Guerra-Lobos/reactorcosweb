import React from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
        
function GuerrerosTable({guerreros, onRemoveGuerrero}) {

    const asesinarGuerrero = (guerrero)=>{
        onRemoveGuerrero(guerrero);
    }

    const accionesTemplate = (guerrero)=>{
        return <Button severity='danger' label='Asesinado por la aparicion' onClick={()=>asesinarGuerrero(guerrero)} ></Button>
  };
  return (
    <div>
           <DataTable value={guerreros} tableStyle={{ minWidth: '50rem' }}>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="tipo" header="Tipo"></Column>
                <Column field="nivel" header="Nivel"></Column>
                <Column field="rango.nombre" header="Rango"></Column>
                <Column header="Acciones" body={accionesTemplate}></Column>
            </DataTable>
    </div>
  )
}

export default GuerrerosTable