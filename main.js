import html from 'https://unpkg.com/hyperlit'
import style from './add-stylesheet.js'
import * as textentry from './textentry.js'
import * as projectlist from './project-list.js'

export const init = () => ({
    entry: textentry.init(),
    projects: projectlist.init(),
})

export const wire = ({get=(x => x), set=((x,y)=>y)}={}) => {

    const projects = projectlist.wire({
        get: state => get(state).projects,
        set: (state, projects) => set(state, {...get(state), projects})
    })

    const entry = textentry.wire({
        get: state => get(state).entry,
        set: (state, x) => set(state, {...get(state), entry: x}),
        onSubmit: projects.add,
    })
    
    return state => ({
        entry: entry(state),
        projects: projects.model(state)
    })
}

export const view = ({entry, projects}) => html`
    <main id="app">
        <${textentry.view} ${entry} class="projectentry" placeholder="Enter new project"/>
        <${projectlist.view} ${projects} />
    </main>`


style(`
* {
    margin: 0;
    padding: 0;
    border: 0;
}
html, body {
    width: 100%;
    height: 100%;
    position: relative;
}

body {
    font-family: sans-serif;
    font-size: 16px;
}

main {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}
`)