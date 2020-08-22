import html from 'https://unpkg.com/hyperlit'
import style from './add-stylesheet.js'

export default  ({ expanded }, content) => html` <div
    appendChild=${function (child) {
        let _expanded = expanded
        if (!_expanded) {
            child.style.height = '0'
            child.style.opacity = '0'
        }
        Object.defineProperty(child, 'expanded', {
            get: () => _expanded,
            set: (should) => {
                if (should === _expanded) return
                _expanded = should
                let trueHeight = child.scrollHeight
                if (!should) {
                    let tx = child.style.transition
                    child.style.transition = ''
                    requestAnimationFrame(() => {
                        child.style.transition = tx
                        child.style.height = trueHeight + 'px'
                        requestAnimationFrame(() => {
                            child.style.height = '0'
                            child.style.opacity = '0'
                        })
                    })
                } else {
                    child.style.height = trueHeight + 'px'
                    child.style.opacity = '1'
                    child.addEventListener('transitionend', function tHandler() {
                        child.removeEventListener('transitionend', tHandler)
                        child.style.height = null
                    })
                }
            },
        })
        HTMLElement.prototype.appendChild.call(this, child)
    }}
>
    <div class="toggleable" expanded=${expanded}>
        ${content}
    </div>
</div>`


style(`
.toggleable {
    transition: height 0.3s, opacity 0.3s;
    height: auto;
    overflow: hidden;
}
`)