import footer from './static/footer.html';
import header from './static/header.html';
import nav from './static/nav.html';
import main from './static/main.html';


const initalLoad = (function() {
    console.log('initialLoad success');
    //cacheDOM
    let _content = document.getElementById('content');
    //create unique div elements and append
    const _header = _addDiv('header');
    const _nav = _addDiv('nav');
    const _main = _addDiv('main');
    const _footer = _addDiv('footer');
    //populate div elements with imported html
    _nav.innerHTML += nav;
    _header.innerHTML += header;
    _main.innerHTML += main;
    _footer.innerHTML += footer;
    //methods
    function _addDiv(name)   {
        let newDiv = document.createElement('div');
        newDiv.id = name;
        _content.appendChild(newDiv);
        return newDiv;
    }
})();

export {initalLoad};