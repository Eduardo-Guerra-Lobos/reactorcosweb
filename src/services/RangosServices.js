const localKey = "rangos_data";

const createRango = (rango) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null){
        lista = JSON.parse(data);
    }
    lista = [...lista, rango];
    localStorage.setItem(localKey, JSON.stringify(lista));
}

const getRangos = () => {
    const data = localStorage.getItem(localKey);
    if(data != null){
        return JSON.parse(data);
    }
    return [];
}

const deleteAllRangos = () => {
    localStorage.removeItem(localKey);
}

export { createRango, getRangos, deleteAllRangos };