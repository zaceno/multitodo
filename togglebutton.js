import html from 'https://unpkg.com/hyperlit'
import button from './button.js'

export const wire =({get, set}) => {
    const Toggle = (state, id) => set(state, !get(state, id), id)
    return (state, id) => ({value: get(state, id), Toggle: [Toggle, id]})
}

export const view = ({Toggle, value, trueicon, falseicon}) => html`
    <${button} icon=${value ? trueicon : falseicon} color="blue" onclick=${Toggle} />` 

