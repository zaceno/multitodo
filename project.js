import html from 'https://unpkg.com/hyperlit'
import * as tasklist from './task-list.js'
import * as togglebutton from './togglebutton.js'
import * as editbutton from './editbutton.js'
import toggleable from './toggleable.js'
import button from './button.js'
import * as textentry from './textentry.js'
import style from './add-stylesheet.js'

export const init = (name) => ({
    name,
    expanded: true,
    tasks: tasklist.init(),
    entry: textentry.init(),
})

export const wire = ({ get, set, onWantRemove }) => {

    const tasks = tasklist.wire({
        get: (state, id) => get(state, id).tasks,
        set: (state, tasks, id) => set(state, { ...get(state, id), tasks }, id),
    })

    const entry = textentry.wire({
        get: (state, id) => get(state, id).entry,
        set: (state, entry, id) => set(state, { ...get(state, id), entry }, id),
        onSubmit: (state, text, id) => tasks.add(state, text, id),
    })

    const editor = editbutton.wire({
        get: (state, id) => get(state, id).name,
        set: (state, name, id) => set(state, { ...get(state, id), name }, id),
        message: 'Please enter a new project name',
    })

    const folder = togglebutton.wire({
        get: (state, id) => get(state, id).expanded,
        set: (state, expanded, id) => set(state, { ...get(state, id), expanded }, id),
    })

    const Remove = (state, id) => onWantRemove(state, id)

    return (state, id) => ({
        ...get(state, id),
        Remove: [Remove, id],
        folder: folder(state, id),
        editor: editor(state, id),
        entry: entry(state, id),
        tasks: tasks.model(state, id),
    })
}

export const view = ({ name, expanded, editor, Remove, folder, entry, tasks }) => html`
    <div class="panel project">
        <header>
            <span class="project-title">${name}</span>
            <span class="buttongroup">
                <${togglebutton.view} ${folder} trueicon="up" falseicon="down" />
                <${editbutton.view} ${editor} />
                <${button} icon="minus" color="red" onclick=${Remove} />
            </span>
        </header>
        <${toggleable} expanded=${expanded}>
            <${textentry.view} ${entry} class="task-entry" placeholder="Enter a task" />
            <${tasklist.view} ${tasks} />
        </${toggleable}>
    </div>`


style(`
.panel {
    margin: 30px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.3);
    border-radius: 8px;
}
.buttongroup {
    display: inline-block;
    overflow: hidden;
}
.buttongroup button {
    border-radius: 0;
}
.buttongroup button:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
.buttongroup button:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.projectentry {
    margin: 30px;
}

.project header {
    margin-bottom: 30px;
    display: flex
}
.project-title {
    flex: 1 1 auto;
    font-size: 22px;
    font-weight: bold;
    color: #555;
    border-bottom: 1px #555 solid;
    line-height: 40px;
    margin-right: 40px;
}


`)