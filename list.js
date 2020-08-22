const init = () => ({
    n: 0,
    list: [],
    items: {},
})
const add = ({ n, list, items }, item, last = true, id = 'id-' + n) => ({
    n: n + 1,
    list: last ? [...list, id] : [id, ...list],
    items: { ...items, [id]: item },
})
const remove = ({ n, list, items }, id) => {
    let newitems = { ...items }
    delete newitems[id]
    return { n, list: list.filter((x) => x !== id), items: newitems }
}
const write = (state, id, item) =>
    !state.items[id]
        ? state
        : {
              ...state,
              items: { ...state.items, [id]: item },
          }

const read = ({ items }, id) => items[id]

const list = (state) => state.list

const wire = (itemtype, { get, set }) => {
    const item = itemtype.wire({
        get: (state, id) => read(get(state, id.list), id.item),
        set: (state, item, id) => set(state, write(get(state, id.list), id.item, item), id.list),
        onWantRemove: (state, id) => set(state, remove(get(state, id.list), id.item), id.list),
    })
    return {
        add: (state, data, id) => set(state, add(get(state, id), itemtype.init(data)), id),
        model: (state, id) => ({
            items: list(get(state, id)).map((itemid) => item(state, { list: id, item: itemid })),
        }),
    }
}

export { init, wire }
