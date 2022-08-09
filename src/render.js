// render.js
import {initLoad} from './initLoad';
import { eachWeekOfInterval } from 'date-fns';
import { model } from './index';
import editform from './static/editForm.html'


const render = (() => {
    // cacheDOM
    const home = document.getElementById('home');
    const projectbar = document.getElementById('projectbar');
    const projectform = document.getElementById('projectform');
    const content = document.getElementById('main');
    const mainContent = document.getElementById('mainContent');

    let _currentProject;
    let _currentTodo;
    let _currentClicked = home;

    //add events/classes to static elements
    
    home.addEventListener('click', el => {
        _currentClicked.classList.remove('clicked');
        _currentClicked = el.target;
        _currentClicked.classList.add('clicked');
        model.expandAllProjects();
    });
    
    projectform.lastElementChild.addEventListener('click', el => newProjectSubmit(el))

    function newProjectSubmit(el){
        let newproject = el.target.previousElementSibling;
        model.createNewProject(newproject.value);      
    }

    //render methods
    const rendermainHeader = (text) => {
        _clearDiv(content.firstElementChild);
        let header = document.createElement('h1');
        header.textContent = text;
        content.firstElementChild.appendChild(header);
    }

    const rendermainDescription = (text) => {
         _clearDiv(content.firstElementChild.nextElementSibling);

        let description = document.createElement('p'); 
        description.textContent = text;
        content.firstElementChild.nextElementSibling.appendChild(description);
    }

    const renderTodoHeader = (type) =>  {
        let header = document.createElement('div');
        header.classList.add('todo');
        header.classList.add('todoHeader');

        header.appendChild(_text('Title'));
        header.appendChild(_text('Description'));
        header.appendChild(_text('Due Date'));
        if(type === 'readonly') {
            header.appendChild(_text('Project'));
            header.classList.add('readOnly');
        } else     {
            header.appendChild(_text('Edit'));
            header.appendChild(_text('Del.'));
        }
        mainContent.appendChild(header);
    }
    const renderTodo = (el) => {
        let todo = document.createElement('div');
        let delbtn = document.createElement('button');
        let editbtn = document.createElement('button');
        
        editbtn.textContent = 'Edit';
        editbtn.addEventListener('click', el => {
            render.setTodo(el.target.parentElement.dataset.index);
            render.renderForm('Edit');
            el.stopPropagation();
        });
        
        delbtn.innerHTML = '&#10006';
        delbtn.addEventListener('click', el => {
            render.removeTodo(el.target);
            model.deleteTodo(render.getProject(), el.target.parentElement.dataset.index);
            el.stopPropagation();
        });
        
        todo.classList.add('todo');
        todo.classList.add(el.priority.toLowerCase());
        todo.dataset.index = el.index;
        
        for (const [key, value] of Object.entries(el)) {
            if( key === 'todoTitle'||key==='description'){
                let val = document.createElement('div');
                val.append(value);
                todo.appendChild(val);
            }
            if(key ==='dueDate'){
                let val = document.createElement('div');
                val.append(value);
                todo.appendChild(val);
            }
        }
        todo.appendChild(editbtn);
        todo.appendChild(delbtn);
        
        mainContent.appendChild(todo);
    }

    const renderTodoReadOnly = (el) => {
        let todo = document.createElement('div');
        todo.classList.add('todo');
        todo.classList.add('readOnly');
        todo.classList.add(el.priority.toLowerCase());
        for (const [key, value] of Object.entries(el)) {
            if( key === 'todoTitle'||key==='description'||key ==='dueDate'||key === 'projectKey'){
                let val = document.createElement('div');
                val.append(value);
                todo.appendChild(val);
            }
        }
        mainContent.appendChild(todo);
    }
    

    const renderProject = (el) =>    {
        let project = document.createElement('li');
        let delbtn = document.createElement('button');
        delbtn.innerHTML = '&#10006';
        project.addEventListener('click', el => {
            _currentClicked.classList.remove('clicked');
            _currentClicked = el.target;
            _currentClicked.classList.add('clicked');
            model.expandProject(el.target.dataset.key);
        });
        delbtn.addEventListener('click', el => {
            render.removeProject(el.target);
            model.deleteProject(el.target.parentElement.dataset.key);
            el.stopPropagation();
        });
        project.dataset.key = el;
        project.append(`${el}`);
        project.appendChild(delbtn);
        projectbar.appendChild(project);
    };

    function renderForm(type)   {
        clearTodos();  
        
        let form = document.createElement('form');
        form.onsubmit="return false"
        form.id = `${type}Form`;
        form.classList = 'todoForm';
        form.innerHTML += editform;
        if(type === 'Edit')    {
            render.rendermainDescription(`Editing an existing todo`)
        }  
        else if(type === 'Create')  {
            render.rendermainDescription(`Creating a new Todo`)
            form.low.checked = true; 
            form.dueDate.value = new Date().toISOString().slice(0, 10);
        };

        let buttonList = form.getElementsByTagName('button');
        buttonList[0].textContent = type;
        buttonList[0].addEventListener('click', el =>{
            let parsedInputs = parseFormInputs(form.id);
            if(type === 'Edit'){
                model.editTodo(render.getProject(), render.getTodo(), parsedInputs);
            }   else if (type === 'Create'){
                model.createTodo(render.getProject(), parsedInputs);
            }
        });
        
        buttonList[1].addEventListener('click', () => {
            model.expandProject(render.getProject());
        });
        
        mainContent.appendChild(form);
    }
    
    // helper functions
    function parseFormInputs(formId)    {
        let obj = [];
        let form = document.getElementById(formId);
        let inputs = form.getElementsByTagName('input');
        for(let i=0; i<inputs.length; i++)  {
            if(inputs[i].type !== 'radio') {
                obj[inputs[i].name] = inputs[i].value;
            } else if((inputs[i].type === 'radio' && inputs[i].checked)) {
                obj[inputs[i].name] = inputs[i].id;
            }
        }
        return obj;
    }

    const addTodoButton = () => {
        let button = document.createElement('button');
        button.textContent = 'Add New Todo';
        button.addEventListener('click', () => {    
            render.rendermainDescription(`Creating a new Todo`);
            render.renderForm('Create')});
        mainContent.append(button);
    }

    const setProject = (projectKey) =>  { 
        _currentProject = projectKey;
    }
    const _text = (string) => {
        let text = document.createElement('div');
        text.textContent = string;
        return text;
    }

    const _clearDiv = (div) =>  div.replaceChildren();
    const removeTodo = (el) =>  el.parentElement.remove();
    const clearTodos = () =>    _clearDiv(mainContent);
    const clearProjects = () =>  _clearDiv(projectbar);
    const removeProject = (el) =>   el.parentElement.remove();        
    const setTodo = (index) => _currentTodo = index;
    const getProject = () => _currentProject;
    const getTodo = () => _currentTodo;

    return{
        rendermainHeader,
        renderTodoHeader,
        rendermainDescription,
        renderTodo,
        renderTodoReadOnly,
        renderProject,
        clearTodos,
        removeTodo,
        renderForm,
        clearProjects,
        removeProject,
        setProject,
        getProject,
        setTodo,
        getTodo,
        addTodoButton,
    }
})();

export {render};
