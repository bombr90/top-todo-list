// projects.js module
const project = (title) => {
    const _objList = [];
    let _todoIndex = 0;
    // Todo Factory Function
    const _newTodo = (todoTitle, description, dueDate, priority, index) => {return{todoTitle, description, dueDate, priority, index}};

    // API Calls
    const add = (title, description, dueDate, priority) =>   {
        console.log('add');
        _objList.push(_newTodo(title, description, dueDate, priority, _todoIndex));
        _todoIndex++;
    }

    const remove = (index) =>   {
        console.log('remove');
        let deleteItem = _objList.findIndex(el => el.index===index);
        _objList.splice(deleteItem,1);
    }

    const edit = (index, todoTitle, description, dueDate, priority) => {
        console.log('edit');
        let editItem = _objList.findIndex(el => el.index===index);
        if(editItem>=0) {
            if(todoTitle)  {_objList[editItem].todoTitle = todoTitle};
            if(description)  {_objList[editItem].description = description;}
            if(dueDate)  {_objList[editItem].dueDate = dueDate;}
            if(priority)  {_objList[editItem].priority = priority;}
        }
    }

    const getList = () => _objList;
    const getIndex = () => _todoIndex;
    // const _setIndex = (index) => _todoIndex = index;
    
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

// // OLD CODE
// // project factory function
// const createProject = (title, index) => {
//     const _objList = [];
//     const _projectIndex = index;
//     let _indexNum = 0;
//     // todo factory function    
//     const _createTodo = (title, description, dueDate, priority, checklist, notes, index) => {return {title, description, dueDate, priority, checklist, notes, index}};

//     function addObj(title, description, dueDate, priority, checklist, notes)    {
//         console.log('addObj');
//         _objList.push(_createTodo(title, description, dueDate, priority, checklist, notes, _indexNum));
//         _indexNum++;
//     }
//     function listObjs() {
//         console.log('listObjs:');
//         return(_objList);
//     };
    
//     function deleteObj(index) {
//         console.log('deleteObj');
//         let deleteItem = _objList.findIndex(el => el.index==index);
//         _objList.splice(deleteItem,1);
//     };

//     const getIndex = () => _projectIndex;
//     const getTodoIndex = () => _indexNum;
//     const listObj = (index) => _objList[index];

    
//     return{title, index, addObj, listObjs, listObj,deleteObj, getIndex, getTodoIndex};
// };

// export  {createProject};