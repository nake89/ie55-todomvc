// Code a to do SPA app like it's 1999

var todos = [];
createHeading();
createInput();
createTodosContainer();

function createTodosContainer() {
  var todosContainer = document.createElement("div");
  todosContainer.id = "todos-container";
  var heading = getElementById("todo-title", "p");
  heading.parentNode.appendChild(todosContainer);
}

function createHeading() {
  var heading = createElement("p", "todos");
  heading.setAttribute("align", "center");
  heading.className = "todo-title";
  heading.id = "todo-title";
  document.body.insertBefore(heading, document.body.firstChild);
}

function createInput() {
  var input = createElement("input");
  input.className = "todo-input-blur";
  input.id = "todo-input";
  var heading = getElementById("todo-title", "p");
  var inputContainer = createElement("div");
  inputContainer.setAttribute("align", "center")
  inputContainer.appendChild(input);
  heading.parentNode.appendChild(inputContainer);
  addEvent(input, "focus", inputFocusEvent);
  addEvent(input, "blur", inputBlurEvent);
  addEvent(input, "keypress", inputKeyPressEvent);
}

function inputFocusEvent(e) {
  var input = getElementById("todo-input", "input");
  input.className = removeClass(input.className, "todo-input-blur");
  input.className = addClass(input.className, "todo-input-focus");
}

function inputBlurEvent(e) {
  var input = getElementById("todo-input", "input");
  input.className = removeClass(input.className, "todo-input-focus");
  input.className = addClass(input.className, "todo-input-blur");
}

function inputKeyPressEvent(e) {
  if (e.keyCode === 13) {
    // console.log("you pressed enter");
    todos.push(e.target.value);
    addTodo(e.target.value);
    e.target.value = "";
    console.log(todos);
    var todosContainer=getElementById("todos-container", "div")
    todosContainer.className = "todos-container";
  }
}

function addTodo(todo) {
  var todoContainer = getElementById("todos-container", "div");
  var todoDiv = createElement("div", todo);
  todoContainer.appendChild(todoDiv);
}

/**
 * Get element by ID
 *
 * Old browsers do not have document.getElementById(),
 * so we have to make our own implementation.
 *
 * @param {string} id - ID of the element
 * @param {string} tag - HTML tag
 * @returns {Element|null} HTML element
 */
function getElementById(id, tag) {
  var elements = document.getElementsByTagName(tag);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute("id") == id) {
      return elements[i];
    }
  }
  return null;
}

/**
 * Creates a HTML element
 * @param {string} tag - HTML tag
 * @param {string} [content] - Text content
 * @returns {Element} HTML element
 */
function createElement(tag, content = null) {
  var el = document.createElement(tag);
  if (!content) {
    return el;
  }
  var textContent = document.createTextNode(content);
  el.appendChild(textContent);
  return el;
}

// https://stackoverflow.com/questions/6927637/addeventlistener-in-internet-explorer
function addEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj["e" + type + fn] = fn;
    obj[type + fn] = function () {
      obj["e" + type + fn](window.event);
    };
    obj.attachEvent("on" + type, obj[type + fn]);
  } else obj.addEventListener(type, fn, false);
}
function removeEvent(obj, type, fn) {
  if (obj.detachEvent) {
    obj.detachEvent("on" + type, obj[type + fn]);
    obj[type + fn] = null;
  } else obj.removeEventListener(type, fn, false);
}

function removeClass(classes, className) {
  var classesArr = classes.split(" ");
  var newClassesArr = [];
  for (var i = 0; i < classesArr.length; i++) {
    if (classesArr[i] !== className) {
      newClassesArr.push(classesArr[i]);
    }
  }
  return newClassesArr.join(" ");
}

function addClass(classes, className) {
  return classes + " " + className;
}
