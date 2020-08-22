import html from 'https://unpkg.com/hyperlit'
import prompt from './prompt.js'
import button from './button.js'

export const wire = ({ get, set, message }) => {
    const Edit = (state, id) => [state, prompt(message, get(state, id), (state, val) => set(state, val, id))]
    return (_, id) => ({ Edit: [Edit, id] })
}
export const view = ({ Edit }) => html`<${button} color="yellow" icon="pencil" onclick=${Edit} />`
