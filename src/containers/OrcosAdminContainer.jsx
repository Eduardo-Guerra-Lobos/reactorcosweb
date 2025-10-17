import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import OrcosToolbar from '../components/OrcosToolbar'
import RangoForm from '../components/RangoForm'
import RangosView from '../components/RangosView'
import { createRango, getRangos } from '../services/RangosServices';

const OrcosAdminContainer = () => {
    const toast = useRef(null);

    const [rangos, setRangos] = useState([]);

    useEffect(() => {
        setRangos(getRangos());
    }, [])
    

    const handleRangoCreate = (rango)=>{
        if(rangos.find((r)=>r.nombre.toLowerCase() === rango.nombre.toLowerCase()) != null){
            toast.current.show({severity: "error", summary: "Rango ya existente", sticky:true});
            return;
        }
        createRango(rango);
        setRangos(getRangos());
        toast.current.show({severity: "info", summary : "Rago registrado", sticky: true});
    };

    return (
        <>
            <Toast ref={toast}></Toast>
            <OrcosToolbar></OrcosToolbar>
            <div className='row mt-5'>
                <div className="col">
                    <div className="row">
                        <div className="col col-md-4">
                          <RangoForm onCreateRango={handleRangoCreate} ></RangoForm>
                        </div>
                        <div className="col col-md-8">
                            <RangosView rangos={rangos}></RangosView>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-md-4">
                            <h1>Aqui ingreso guerrero</h1>
                        </div>
                        <div className="col col-md-8">
                            <h1>Aqui ver guerreros dataview</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrcosAdminContainer
