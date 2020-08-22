import * as genericlist from './list.js'
import * as projectitem from './project.js'
export const init = genericlist.init
export const wire = accessors => genericlist.wire(projectitem, accessors)
export const view = ({items}) => items.map(projectitem.view)
