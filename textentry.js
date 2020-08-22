import html from 'https://unpkg.com/hyperlit'
import preventDefault from './prevent-default.js'
import style from './add-stylesheet.js'
import button from './button.js'

const init = () => ''
const wire = ({ get, set, onSubmit }) => {
    const _submit = (state, id) => onSubmit(set(state, '', id), get(state, id), id)
    const Input = (state, { event, id }) => set(state, event.target.value, id)
    const Submit = (state, id) => _submit(state, id)
    const KeyPress = (state, { event, id }) =>
        event.key !== 'Enter' ? state : [_submit(state, id), preventDefault(event)]

    return (state, id) => ({
        value: get(state, id),
        Input: (_, event) => [Input, { id, event }],
        Submit: [Submit, id],
        KeyPress: (_, event) => [KeyPress, { id, event }],
    })
}
const view = (model) => html` <div class=${['inputgroup', model.class]}>
    <input
        type="text"
        placeholder=${model.placeholder}
        value=${model.value}
        oninput=${model.Input}
        onkeypress=${model.KeyPress}
    />
    <${button} color="green" icon="plus" onclick=${model.Submit} />
</div>`

export { init, wire, view }

style(`

.inputgroup {
    overflow: hidden;
    display: flex;
}

.inputgroup input {
    width: 100%;
    flex: 1 1 auto;
    height: 38px;
    font-size: 16px;
    line-height: 38px;
    text-indent: 16px;
    border: 1px #692 solid;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.inputgroup button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;   
}
`)
