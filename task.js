import html from 'https://unpkg.com/hyperlit'
import button from './button.js'
import * as togglebutton from './togglebutton.js'
import * as editbutton from './editbutton.js'


export const init = text => ({text, done: false})

export const wire = ({get, set, onWantRemove}) => {
    const editor = editbutton.wire({
        get: (state, id) => get(state, id).text,
        set: (state, text, id) => set(state, {...get(state, id), text}, id),
        message: 'Please enter a new task name',
    })

    const checker = togglebutton.wire({
        get: (state, id) => get(state, id).done,
        set: (state, done, id) => set(state, {...get(state, id), done}, id)
    })

    const Remove = (state, id) => onWantRemove(state, id)
    
    return (state, id) => ({
        ...get(state, id),
        editor: editor(state, id),
        checker: checker(state, id),
        Remove: [Remove, id],
    })
}

export const view = ({done, text, editor, checker, Remove}) => html`
    <li>
        <${togglebutton.view} ${checker} trueicon="checked" falseicon="unchecked" />
        <span class=${{done}}>${text}</span>
        <${editbutton.view} ${editor} />
        <${button} icon="minus" onclick=${Remove} color="red" />
    </li>`