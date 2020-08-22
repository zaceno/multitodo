const preventDefault = (_, {event}) => event.preventDefault()
export default (event) => [preventDefault, {event}] 
