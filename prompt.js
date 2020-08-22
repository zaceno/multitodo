const prompt = (dispatch, options) =>
    dispatch(
        options.handler,
        (window.prompt(options.message,options.default) || options.default)
    )

export default (message, deflt, handler) => [
    prompt,
    {message, default: deflt, handler}
]
