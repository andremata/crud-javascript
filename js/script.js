window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'tres', 'Quatro'];
var inputName = null;
var isEdit = false;
var currentIndex = null;

function start() {
    inputName = document.querySelector('#inputName');

    preventFormSubmit();
    activateInput();
    render();
}

function preventFormSubmit() {
    function handleFormSubmit(e) {
        e.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    inputName.addEventListener('keyup', handleTyping);

    function handleTyping(e) {
        if (e.key === 'Enter') {
            if (isEdit) {
                updateName(e.target.value);

            } else {
                if (e.target.value.trim() !== "") {
                    insertName(e.target.value);
                    
                } else {
                    clearInput();
                }
            }

            isEdit = false;

            clearInput();
        }
    }

    function insertName(name) {
        globalNames.push(name);

        render();
    }

    function updateName(name) {
        globalNames[currentIndex] = name;

        render();
    }

    inputName.focus();
}

function render() {
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for (var i = 0; i < globalNames.length; i++) {
        var li = document.createElement('li');

        var button = createButton(i);
        var span = createSpan(globalNames[i], i);

        li.appendChild(button);
        li.appendChild(span)
        ul.appendChild(li);
    }

    divNames.appendChild(ul);

    function createButton(index) {
        function deleteName() {
            globalNames.splice(index, 1);

            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'X';

        button.addEventListener('click', deleteName);

        return button;
    }

    function createSpan(name, index) {
        function editName() {
            inputName.value = name;
            inputName.focus();

            isEdit = true;
            currentIndex = index;
        }
        
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;

        span.addEventListener('click', editName);

        return span;
    }

    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}
