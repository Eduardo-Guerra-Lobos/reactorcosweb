import React from 'react'

import { DataScroller } from 'primereact/datascroller';
        
function RangosView({rangos}) {

    const itemTemplate = (rango)=>{
        return <h1>{rango?.nombre}</h1>
    }
  return (
    <div>
       <DataScroller value={rangos} itemTemplate={itemTemplate} inline scrollHeight='200px'  rows={5} buffer={0.4} header="Rangos existentes" />
    </div>
  )
}

export default RangosView
