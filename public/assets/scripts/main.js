const app = { __vars: {}, __events: {} }

app.get = function get(name) {
    return app.__vars[name] ?? null
}

app.set = function set(name, value) {
    app.__vars[name] = value
}

app.on = function on(event, handler) {
    if (app.__events[event]) {
        app.__events[event].push(handler)
    } else {
        app.__events[event] = [handler]
    }
}

app.off = function off(event, handler) {
    const index = app.__events[event].findIndex(function (x) {
        return x?.toString() === handler?.toString();
    })
    if (index > -1) app.__events[event].splice(index, 1)
}

app.emit = function emit(event, params = {}) {
    app.__events[event]?.forEach((handler) => {
        handler(params)
    })
}

app.switchDarkMode = function switchDarkMode() {
    const theme = app.get("theme") === "dark" ? "light" : "dark"
    app.emit("themeChanged", { theme })
}

app.on("themeChanged", function themeChanged({ theme }) {
    const oldTheme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.replace(oldTheme, theme)
    localStorage.setItem("theme", theme)
    app.set("theme", theme)
})

app.on("init", function init() {
    const theme = app.get("theme")
    app.emit("themeChanged", { theme })
    const navLinks = document.querySelectorAll("a.nav-link")
    navLinks.forEach(function (link) {
        if (location.pathname.startsWith(link.getAttribute("href"))) {
            link.classList.add("active")
        } else {
            link.classList.remove("active")
        }
    })
    app.off("init", init)
})

window.onload = function onload() {
    app.emit("init")
}

app.set("theme", localStorage.getItem("theme") ?? "light")
