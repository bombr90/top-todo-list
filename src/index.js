import './style.css';
import {initLoad} from './initLoad';
import {project} from './projects';
// import {todo} from './todos';
import {saveData, loadData, clearData, getProjectKeys} from './localstorage';
import {addDays, addWeeks} from 'date-fns'
import compareAsc from 'date-fns/compareAsc'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
// import addDays from 'date-fns/addDays'
// import addWeeks from 'date-fns/addWeeks'

const createDefault = (key) => {
    console.log(`createDefault`);
    let defaultData = project(key);
    let today = new Date();
    today = new Date(today.toDateString())
    defaultData.add('Todo', 'Sample to Do', today, 'High');
    defaultData.add('Todo2', 'Sample to Do', addDays(today,3), 'Medium');
    defaultData.add('Todo3', 'Sample to Do', addWeeks(today, 1), 'Low');
    saveData(key, defaultData);
}

const populateProject = (key, data) =>    {
    console.log('populateProject');
    let newProject = project(key);
    data._objList.forEach(todo => newProject.add(
        todo.todoTitle,
        todo.description,
        todo.dueDate,
        todo.priority,
    ));
    return newProject;    
}
////////////////////////////////////////////////////

window.addEventListener('storage',render);
function render(e){
    console.log('sessionstorage event fire!');
}

// clearData('todolist');
sessionStorage.clear();
let projectKeys = getProjectKeys();
if(projectKeys.length===0)  {
    createDefault('Example Todo List');
    createDefault('Another Todo List');
    createDefault('One more Todo List');
    projectKeys = getProjectKeys();
}

let data = loadData(projectKeys[0]);
let project1 = populateProject(projectKeys[0],data);
project1.edit(0,undefined,undefined,'test',undefined);
console.table('project1: ',project1.getList());
// let project1 = project('project1');
// console.log('populating project1');
// console.log('data',data);
// project1._todoIndex=data._todoIndex;
// data._objList.forEach(todo => project1.add(
//     todo.todoTitle,
//     todo.description,
//     todo.dueDate,
//     todo.priority,
// ));
// console.log('project1',project1);
// console.log('data')
// console.log('project1.getList',project1.getList());
saveData('todolist1', project1);
saveData('todoList2', project1);
let data2 = loadData('todoList2');
console.log('data2: ',data2);
// // let data = []
// data = loadData('todolist');
// console.log('data');
// console.log(data.list);
// data.push(project('test'));
// saveData('todoList', data);

// console.log('data.list()');
// console.log(data.list);
// console.log('getlist');


// console.log('sessionstorage:');
// console.log(Object.entries(sessionStorage));
// window.sessionStorage.clear();
// console.log('sessionstorage:');
// console.log(Object.entries(sessionStorage));

// console.log(data.getList());
// let test = project('test project');
// test.add('newtodo', 'this is a test', 'today', 'low');
// test.add('newtodo2', 'this is a test', 'tomorrow', 'low');
// console.log(test.list());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OLD CODE
// import './style.css';
// import {initLoad} from './initLoad';
// import {createProject} from './projects';
// // import {loadProjects, modifyprojects} from './viewprojects';

// //Global Variables 
// let projectIndex = 0;
// let dummyProjectData = [];
// const main = document.getElementById('main');

// //Populate index
// if(window.sessionStorage.getItem('todolist'))   {
//     console.log('Existing Session Data Found: ');
//     dummyProjectData = JSON.parse(window.sessionStorage.getItem('todolist'));
//     projectIndex = dummyProjectData.length;
// } else {
//     for(let i = 0; i<3; i++)    {
//         dummyProjectData.push(createProject('Default Project '+i, projectIndex));
//         for(let j = 0; j<5; j++)  {
//             dummyProjectData[i].addObj('Title '+j,'b','c','d','e','f');
//         }
//         projectIndex++;
//     }
//     autoSave();
// };

// // Render Projects Module IIFE
// const renderProjects = (function()   {
//     console.log('renderProjects');
//     //set local variables to global variables 
//     const modifyDiv = main;
//     const dummyData = dummyProjectData;
//     //create DOM cache variables;
//     let cards;
    
//     (function(){
//         init();
//     })();

//     function init() {
//         main.replaceChildren();
//         let header = `<h2>View Existing Projects</h2>`;
//         let description = `<p>Click on an existing project to view, edit or delete Todo list items.</p>`;
//         modifyDiv.appendChild(_addComponent(header));
//         modifyDiv.appendChild(_addComponent(description));
//         modifyDiv.appendChild(_addCarddeck());
//         cards = document.getElementById('carddeck');
//         dummyData.forEach(el => cards.appendChild(_addProjectCard(el)));
//         cards.appendChild(_addNewProjectCard());    
//     };

//     function _addComponent(str)    {
//         const element = document.createElement('div');
//         element.innerHTML = str;
//         return element;
//     }

//     function _addCarddeck()  {
//         const cards = document.createElement('div');
//         cards.classList = 'cards';
//         cards.id = 'carddeck';
//         return cards;
//     }

//     function _addProjectCard(el){
//         const card = document.createElement('div');        
//         card.dataset.indexNumber = el.index; 
//         const delbtn = document.createElement('button');
//         const viewbtn = document.createElement('button');
//         card.classList = 'projectCard';
//         delbtn.addEventListener('click', deleteCard);
//         viewbtn.addEventListener('click', expandTodos);
//         delbtn.textContent = 'Del Project';
//         viewbtn.textContent = 'View Todos';
//         const content = `
//         <h3>${el.title}</h3>`;
//         card.innerHTML += content;
//         card.appendChild(viewbtn);
//         card.appendChild(delbtn);
//         return card;
//     }

//     function _addTodoCard(el){
//         const card = document.createElement('div');        
//         card.dataset.indexNumber = el.index; 
//         const delbtn = document.createElement('button');
//         const viewbtn = document.createElement('button');
//         card.classList = 'todoCard';
//         delbtn.addEventListener('click', deleteTodoCard);
//         viewbtn.addEventListener('click', viewTodo);
//         delbtn.textContent = 'Delete';
//         viewbtn.textContent = 'View/Edit';
//         const content = `
//         <h3>${el.title}</h3>`;
//         card.innerHTML += content;
//         card.appendChild(viewbtn);
//         card.appendChild(delbtn);
//         return card;
//     }

//     function _addNewProjectCard() {
//         const card = document.createElement('div');
//         const newprojectbtn = document.createElement('button');
//         card.classList = 'card newproject';
//         card.id = 'newproject';
//         newprojectbtn.textContent = 'New Project';
//         newprojectbtn.addEventListener('click', _newProject)
//         card.appendChild(newprojectbtn);
//         return card;
//     }

//     function _addNewTodoCard() {
//         const card = document.createElement('div');
//         const newtodobtn = document.createElement('button');
//         const backbtn = document.createElement('button');
//         card.classList = 'card newtodo';
//         card.id = 'newtodo';
//         newtodobtn.textContent = 'New Todo';
//         backbtn.textContent = 'Back to Projects';
//         newtodobtn.addEventListener('click', _newTodo)
//         backbtn.addEventListener('click', init)
//         card.appendChild(newtodobtn);
//         card.appendChild(backbtn);

//         return card;
//     }

//     function _editTodoCard() {
//         const card = document.createElement('div');
//         const editbtn = document.createElement('button');
//         const delbtn = document.createElement('button');
//         const backbtn = document.createElement('button');
//         card.classList = 'card edittodo';
//         card.id = 'edittodo';
//         editbtn.textContent = 'Edit';
//         delbtn.textContent = 'Delete';
//         backbtn.textContent = 'Back to Todos';
//         // editbtn.addEventListener('click', _newTodo);
//         // delbtn.addEventListener('click', expandTodos);
//         backbtn.addEventListener('click', init);
//         card.appendChild(editbtn);
//         card.appendChild(delbtn);
//         card.appendChild(backbtn);

//         return card;
//     }

//     function _removeFromDisplay(el)   {
//         console.log('removeFromDisplay');
//         if(el >= 0)   {
//             let list = cards.childNodes;
//             cards.removeChild(list[el]);    
//         }        
//     }

// // callbacks
//     function deleteCard(e) {
//         console.log('deleteCard');
//         let index = e.target.parentNode.dataset.indexNumber;
//         let arrIndex = modifyProjects.deleteProject(index);
//         if(arrIndex >= 0) {
//             _removeFromDisplay(arrIndex);
//         };
//     }

//     function deleteTodoCard(e)  {
//         console.log('deleteTodoCard');
//         let index = e.target.parentNode.dataset.indexNumber;
//         let arrIndex = modifyProjects.deleteProject(index);
//         if(arrIndex >= 0) {
//             _removeFromDisplay(arrIndex);
//         };
//     }

//     function _newProject(e) {
//         console.log('_newProject');
//         let newProject = prompt('Enter New Project Name.');
//         if(!(newProject === null || newproject === '')) {
//             modifyProjects.addNewProject(newProject);
//             cards.insertBefore(_addProjectCard(dummyData[dummyData.length-1]),cards.lastElementChild);    
//         };
//     }

//     function _newTodo(e)    {
//         console.log('_newTodo');
//         console.log(e.target.parentNode.dataset.indexNumber);
//         modifyProjects.addNewTodo(e.target.parentNode.dataset.indexNumber);
//         cards.insertBefore(_addTodoCard(dummyData[dummyData.length-1]),cards.lastElementChild);
//     }

//     function expandTodos(e) {
//         console.log('expandTodos');
//         let index = e.target.parentNode.dataset.indexNumber;
//         let arrIndex = dummyData.findIndex(el => el.index==index);
//         let header = `<h2>${dummyData[index].title} Existing Todos</h2>`;
//         let description = `<p>Click on an existing Todo to view/edit details or delete.</p>`;
//         modifyDiv.replaceChild(_addComponent(header),modifyDiv.children[0]);
//         modifyDiv.replaceChild(_addComponent(description),modifyDiv.children[1]);
//         cards.replaceChildren();
//         if(arrIndex >= 0)   {
//             dummyData[index].listObjs().forEach(el => cards.appendChild(_addTodoCard(el)));
//             console.log(el);
//         }
//         cards.appendChild(_addNewTodoCard());
//     }

//     function viewTodo(e)    {
//         console.log('viewtodo');
//         let index = e.target.parentNode.dataset.indexNumber;
//         console.log('index: '+index);
//         // let arrIndex = dummyData[index].getTodoIndex(index);
//         let arrIndex = dummyData.findIndex(el => el.index==index);
//         console.log(arrIndex);
//         let header = `<h2>${dummyData[index].listObj[0]}</h2>`;
//         let description = `<p>Full details.</p>`;
//         modifyDiv.replaceChild(_addComponent(header),modifyDiv.children[0]);
//         modifyDiv.replaceChild(_addComponent(description),modifyDiv.children[1]);
//         cards.replaceChildren();
//         cards.appendChild(_editTodoCard());
//         console.log(dummyData[index].listObj(index));
        
//     }

//     return{
//         init, cards 
//     }
// })();

// const modifyProjects = (function()    {  
//     console.log('modifyProjects created');
//     //set local variables to global variables 
//     const dummyData = dummyProjectData;

//     function addNewProject(name)    {
//         console.log('modifyProjects.addNewProject');
//             dummyProjectData.push(createProject(name, projectIndex));
//             autoSave();
//             projectIndex++;
//     };

//     function addNewTodo(currProject)   {
//         console.log('modifyProjects.addNewTodo');
//         let title = prompt('Enter New Todo Name.');
//         if(title) {
//             dummyProjectData[currProject].addObj(title+': '+dummyData[currProject].getTodoIndex, 'b','c','d','e','f');
//             return true;
//         }
//         return false;
//     };
//     // callbacks
//     function deleteProject(index) {
//         console.log('deleteProject');
//         let arrIndex = dummyData.findIndex(el => el.index==index);
//         if(arrIndex >= 0)  {
//             dummyData.splice(arrIndex,1);
//             autoSave();           
//             return arrIndex
//         }
//         return false;
//     };

//     // function expandTodos(e) {
//     //     console.log('expandTodos');
//     //     let index = e.target.parentNode.dataset.indexNumber;
//     //     let arrIndex = dummyData.findIndex(el => el.index==index);
//     //     if(arrIndex >= 0)   {
//     //         console.log(dummyData[arrIndex].listObjs());
//     //         modifyDiv.childNodes
//     //         let carddeck = document.getElementById('carddeck');
//     //         modifyDiv.replaceChildren();
//     //         viewtodos(modifyDiv, dummyData, arrIndex);
//     //     }
//     // };

// return {addNewProject, addNewTodo, deleteProject};
// })();

// function autoSave() {
//     window.sessionStorage.setItem('todolist', JSON.stringify(dummyProjectData));
//     console.log(dummyProjectData.length);
//     if(dummyProjectData.length===0) {
//         window.sessionStorage.removeItem('todolist');
//     }
// };
