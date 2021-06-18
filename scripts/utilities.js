const getElement = ( tagName, className ) => {
    let $element = document.createElement(tagName);
    if(className) $element.classList.add(className);
    return $element;
}

const getRandom = ( num ) => { return Math.ceil( Math.random() * num ); }

const getBattleTime = () => {
    let date = new Date();
    return `${checkTime( date.getHours() )}:${checkTime( date.getMinutes() )}:${checkTime( date.getSeconds() )}`;
}

const checkTime = ( time ) => {
    return (time.toString().length === 1) ? `0${time}` : time;
}

export {getElement, getRandom, getBattleTime };