// localstorage module
const saveData = (key, value) => {
    console.log('saveData');
    window.sessionStorage.setItem(key, JSON.stringify(value));
}

const clearData = (key) => {
    console.log('clearData');
    window.sessionStorage.removeItem(key);
}

const loadData = (key) =>    {
    console.log('loaddata');
    let data = window.sessionStorage.getItem(key); 
    return(JSON.parse(data)||[]);
}

const getProjectKeys = () => {
    console.log('getProjectKeys');
    let keys = Object.keys(sessionStorage);
    return keys;
}

export  {saveData, loadData, clearData, getProjectKeys};
