const localKey = "guerreros_list_data";

const createGuerrero = (guerrero) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null){
        lista = JSON.parse(data);
    }
    lista = [...lista, guerrero];
    localStorage.setItem(localKey, JSON.stringify(lista));
}

const getGuerreros = () => {
    const data = localStorage.getItem(localKey);
    if(data != null){
        return JSON.parse(data);
    }
    return [];
}

const deleteAllGuerreros = () => {
    localStorage.removeItem(localKey);
}

const removeGuerrero = (guerrero)=>{
    const guerreros = getGuerreros();
    const lista = guerreros.filter(g=> g.nombre != guerrero.nombre)
    localStorage.setItem(localKey, JSON.stringify(lista));
}


export { createGuerrero, getGuerreros, deleteAllGuerreros, removeGuerrero };