// localstorage module
const saveData = (key, value) => {
    let saveValue = value||[];
    window.localStorage.setItem(key, JSON.stringify(saveValue));
}

const clearData = (key) => {
    window.localStorage.removeItem(key);
}

const loadData = (key) =>    {
    let data = window.localStorage.getItem(key); 
    return(JSON.parse(data)||[]);
}

const getProjectKeys = () => {
    let keys = Object.keys(localStorage);
    return (keys||[]);
}

export  {saveData, loadData, clearData, getProjectKeys};
