import "https://unpkg.com/construct-style-sheets-polyfill"
export default (str, scopeSelector = "") => {
    const ss = new CSSStyleSheet()
    ss.replaceSync(
        str
            .split("}")
            .map(directive => {
                if (directive.indexOf("{") < 0) return directive
                const [selectors, rules] = directive.split("{")
                return `${selectors
                    .split(",")
                    .map(selector => `${scopeSelector} ${selector}`)
                    .join(",")} { ${rules}`
            })
            .join("}"),
    )
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, ss]
}