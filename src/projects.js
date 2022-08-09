// projects.js module
const project = (title) => {
    const _objList = [];
    let _todoIndex = 0;
    
    const _newTodo = (todoTitle, description, dueDate, priority, projectKey, index) => {return{todoTitle, description, dueDate, priority, projectKey, index}};

    // API Calls
    const add = (data) =>   {
        _objList.push(_newTodo(
            data.todoTitle||'Default Todo Title',
            data.description||'Javascript is Fun!',
            data.dueDate||(new Date((new Date).toDateString())).toDateString(),
            data.priority||'Low',
            data.projectKey||'Default',
            _todoIndex
        ));
        _todoIndex++;
    }

    const remove = (index) =>   {
        let deleteItem = _objList.findIndex(el => el.index===+index);
        if(deleteItem>=0){
            _objList.splice(deleteItem,1)
        }
    }

    const edit = (index, data) => {
        let editItem = _objList.findIndex(el => el.index===+index);
        if(editItem>=0) {
            if(data.todoTitle)  {_objList[editItem].todoTitle = data.todoTitle};
            if(data.description)  {_objList[editItem].description = data.description;}
            if(data.dueDate)  {_objList[editItem].dueDate = data.dueDate;}
            if(data.priority)  {_objList[editItem].priority = data.priority;}
        }
    }

    const getList = () => _objList;
    const getIndex = () => _todoIndex;
    const toJSON = () =>  {
        return {
            _objList,
            _todoIndex,
        };
    };

    return {
        getList,
        getIndex, 
        add,
        remove, 
        edit,
        toJSON,
    };
}
export  {project};