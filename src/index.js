import './style.css';
import {project} from './projects';
import {saveData, loadData, clearData, getProjectKeys} from './localstorage'
import {addDays, parseISO, format} from 'date-fns'
import {render} from './render';

const model = (() => {
    let _currentProjectTodos = [];
    let _currentProjectKey = '';

    const createDefault = (key) => {
        let defaultData = project(key);
        let today = new Date().toISOString();
        let today1 = new Date();
        defaultData.add({
            todoTitle:'My First Todo',
            description:'Sample todo',
            dueDate: format(today1,'yyyy-MM-dd'),
            priority:'Low',
            projectKey: key,
        });
        defaultData.add({
            todoTitle:'My Second Todo',
            description:'Sample todo',
            dueDate: format(addDays(parseISO(today),3),'yyyy-MM-dd'),
            priority:'Medium',
            projectKey: key,
        });
        return defaultData;
    }

    const sortTodos = (data) =>    {
        const sorted = data._objList.sort((a, b) => {
            return (a.dueDate < b.dueDate) ? -1 : ((a.dueDate > b.dueDate) ? 1 : 0)
          });
    }

    const populateProject = (key, data) =>    {
        let newProject = project(key);
        if('_objList' in data)   {
            data._objList.forEach(todo => {
                newProject.add({
                todoTitle: todo.todoTitle,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority,
                projectKey: todo.projectKey,
            })});    
        }
        return newProject;    
    }

    const expandProject = (key) => {
        _currentProjectKey = key;
        render.rendermainHeader(key);
        render.rendermainDescription('List of Existing Todos');
        render.setProject(key);
        render.clearTodos();
        let data = loadData(key);
        model.sortTodos(data);
        _currentProjectTodos = populateProject(key, data);
        render.renderTodoHeader();
        _currentProjectTodos.getList().forEach(key => {render.renderTodo(key)});
        render.addTodoButton();
    }

    const expandAllProjects = () => {
        projectKeys = getProjectKeys();
        let masterList = {_objList: [],};
        _currentProjectKey='All Projects';
        render.rendermainHeader('Home');
        render.rendermainDescription('Master List of Existing Todos');
        render.setProject('All Projects');
        render.clearTodos();
        projectKeys.forEach(key => {
            loadData(key)._objList.forEach(todo => {
                todo.projectKey = key;
                masterList._objList.push(todo);
            })
        });
        model.sortTodos(masterList);
        _currentProjectTodos = populateProject('All Projects', masterList);
        render.renderTodoHeader('readonly');
        _currentProjectTodos.getList().forEach(key => {render.renderTodoReadOnly(key)});
    }

    const createTodo = (key, formInputs)    =>  {
        render.clearTodos();
        render.rendermainDescription(`List of Existing Todos`);
        _currentProjectTodos.add(formInputs);
        saveData(key,_currentProjectTodos);
        render.renderTodoHeader();
        _currentProjectTodos.getList().forEach(key => {render.renderTodo(key)}); 
        render.addTodoButton();
    }

    const editTodo = (key, valindex, formInputs) => {
        render.clearTodos();
        render.rendermainDescription(`List of Existing Todos`);
        _currentProjectTodos.edit(valindex, formInputs);
        saveData(key,_currentProjectTodos);
        render.renderTodoHeader();
        _currentProjectTodos.getList().forEach(key => {render.renderTodo(key)}); 
        render.addTodoButton();   
    }

    const deleteTodo = (key, valIndex) => {
        _currentProjectTodos.remove(valIndex);
        saveData(key,_currentProjectTodos);
    }

    const createNewProject = (newproject) => {
        projectKeys = getProjectKeys();
        if(newproject.trim()==='') {
            alert('empty name, try again.');
        }   else if (projectKeys.includes(newproject))  {
            alert('duplicate, try again');
        }   else    {
            _currentProjectTodos = createDefault(newproject);
            saveData(newproject,_currentProjectTodos);
            render.setProject(newproject);
            render.renderProject(newproject);
        }
    }

    const deleteProject = (key) =>  {
        clearData(key);
    }

    return{
        createDefault,
        createNewProject,
        deleteProject,
        populateProject,
        expandProject,
        createTodo,
        editTodo,
        deleteTodo,
        sortTodos,
        expandAllProjects,
    }
})();

export {model}

////////////////////////////////////////////////////
//Initialize Page///////////////////////////////////
////////////////////////////////////////////////////

let projectKeys = getProjectKeys().sort();
if(projectKeys.length===0)  {
    saveData('Example Todo List', model.createDefault('Example Todo List'));
    projectKeys = getProjectKeys();
}
projectKeys.forEach(key => render.renderProject(key));
model.expandAllProjects();