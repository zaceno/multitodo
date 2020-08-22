import html from 'https://unpkg.com/hyperlit'
import style from './add-stylesheet.js'

const icons = {
    plus: '\u{002B}',
    burger: '\u{2630}',
    minus: '\u{0229D}',
    pencil: '\u{0270E}',
    checked: '\u{02611}',
    unchecked: '\u{02610}',
    left: '\u{021A4}',
    up: '\u{021A5}',
    right: '\u{021A6}',
    down: '\u{021A7}',
}

export default ({icon, color, active, ...props}) => html`
    <button
        ${props}
        class=${['color-' + color, active && 'active']}
    >
        ${icons[icon]}
    </button>`

style(`

button {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 29px;
    line-height: 29px;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0px -1px 1px rgba(0,0,0,0.5);
    border: 0;
    border-bottom: 1px rgba(0,0,0,0.3) solid;
    cursor: pointer;
}

button.color-red {background-color: #c40;}
button.color-yellow {background-color: #ec0;}
button.color-purple {background-color: #c5c;}
button.color-orange {background-color: #e90;}
button.color-blue {background-color: #48f;}
button.color-green {background-color: #8b4;}

button.active.color-red, button.color-red:active {background-color: #a20;}
button.active.color-yellow, button.color-yellow:active {background-color: #ca0;}
button.active.color-purple, button.color-purple:active {background-color: #a3a;}
button.active.color-orange, button.color-orange:active {background-color: #c70;}
button.active.color-blue, button.color-blue:active {background-color: #26d;}
button.active.color-green, button.color-green:active {background-color: #692;}

button.active, button:active {
    position: relative;
    border-bottom: none;
    border-top: 1px rgba(0,0,0,0.3) solid;
    margin-top: -1px;
    top: 1px;
}


`)