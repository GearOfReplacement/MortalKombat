function getElement ( tagName, className ) {
    let $element = document.createElement(tagName);
    if(className) $element.classList.add(className);
    return $element;
}

const getRandom = ( num ) => { return Math.ceil( Math.random() * num ); }

export {getElement, getRandom };