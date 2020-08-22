import html from 'https://unpkg.com/hyperlit'
import * as genericlist from './list.js'
import * as taskitem from './task.js'
import style from './add-stylesheet.js'

export const init = genericlist.init
export const wire = accessors => genericlist.wire(taskitem, accessors)
export const view = ({items}) => html`
    <ul class="task-list">
        ${items.map(task => taskitem.view(task))}
    </ul>`

style(`

.task-list {
    margin-top: 30px;
} 

.task-list li {
    display: flex;
    margin-bottom: 3px;
}
.task-list button {
    flex: 0 0 auto;
    border-radius: 0;
}
.task-list span {
    flex: 1 1 auto;
    background-color: #fffbdb;
    line-height: 19px;
    padding: 10px;
    border-bottom: 1px rgba(0,0,0,0.3) solid;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.task-list span.done {
    background-color: #eee;
    text-decoration: line-through;
    color: #aaa;
}
.task-list li *:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.task-list li *:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
`)