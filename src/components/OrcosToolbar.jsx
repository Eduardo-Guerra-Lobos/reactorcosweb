import React from 'react'
import { Toolbar } from 'primereact/toolbar';
import { Image } from 'primereact/image';
import icono from '../assets/icono.png';
function OrcosToolbar() {
    return (
        <div className="row">
            <Toolbar start={<Image width='60px' src={icono} />}
                end={<h3>Uno para Dominarlos a todos</h3>}>
            </Toolbar>
        </div>
    )
}

export default OrcosToolbar
