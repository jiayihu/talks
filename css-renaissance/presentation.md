footer: CSS Renaissance
slidenumbers: true
slidecount: true

# CSS Renaissance

---

# From the Middle Age to modern CSS

- Custom Properties
- Shadow DOM
- Houdini (Paint API)

---

# Custom Properties

**Runtime** CSS variables

Or

**Inherited user-defined** properties

--- 

# Runtime CSS Variables

```css
:root {
  --primary: #007bff;
}

.btn-primary {
  color: var(--primary, deepskyblue);
}
```

^ Syntax to avoid ambiguity

--- 

# Runtime CSS Variables

[.code-highlight: 5, 6, 7]

```css
:root { --primary: #007bff; }

.btn-primary { color: var(--primary, deepskyblue); }

.btn-primary:hover {
  --primary: crimson;
}
```

---

![](assets/bootstrap.mp4)

---

# Inherited user-definied properties [^1]

CSS

```css
div > p { --primary: crimson; }
p { --primary: aqua; }

.c-block { background-color: var(--primary) }
```

HTML

```html
<div>
  <p class="c-block"></p>
</div>
```

[^1]: [glazman: CSS Variables, why we drop the $foo notation](http://www.glazman.org/weblog/dotclear/index.php?post/2012/08/17/CSS-Variables%2C-why-we-drop-the-%24foo-notation)

---

![fit](assets/caniuse.png)

^ In Firefox since 2014

---

# Interoperability

- Sass/Less
- React/Angular/Vue
- hyperHTML
- styled-components

^ Anything since it's standard
Sass files cannot be used without Sass

---


# Valid values

Values can be any valid CSS value: numbers, strings, lengths, colors, etc.

```css
:root {
  --foo: if(x < 5) this.width = 10;
}
```

---

# i18n [^0]

```css
:root,
:root:lang(en) {
  --message-external-link: "external link";
}

:root:lang(de) {
  --message-external-link: "externer Link";
}

:root:lang(es) {
  --meesage-external-link: "Link externo";
}

a[href^="http"]::after {content: " (" var(--external-link) ")"}
```

[^0]: [publishing-project.rivendellweb.net](https://publishing-project.rivendellweb.net/theming-the-web-with-css-custom-properties/)

---

# Operations

```css
:root {
  --columns: 12;
  --gutter: 16px;
}

.o-col {
  margin: 0 calc(var(--gutter) * 2);
  width: calc(100% / var(--columns));
}
```

---

# Operations

```css
:root {
  --gutter: 16px;
  --margin: (var(--gutter) * 2)
}

.o-col {
  margin: 0 calc(var(--margin));
}
```

^ You can think of these as simple textual replacements

---

# Operations

```css
:root {
  --alpha-hover: 0.04;
  --primary: 98, 0, 238;
}

.c-box {
  background-color: rgba(var(--primary), var(--alpha-hover))
}
```

---

# Operations

```css
:root {
  --animation-duration-simple: 0.1s;
  --easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
}

.c-box {
  transition: all var(--animation-duration-medium) var(--easing-standard);
}
```

---

# Custom properties in JS

```html
<button style={{ '--primary': colors.primary }}></button>
```

Vanilla JS

```javascript
const getVariable = (el, propertyName) => {
  const styles = el.getComputedStyle();
  
  return String(styles.getPropertyValue(propertyName)).trim();
};

const setDocumentVariable = (propertyName, value) => {
  document.documentElement.style.setProperty(propertyName, value);
};
```

---

# Mettere demo figa con JS

---

# Complaints

1. Syntax is ugly and verbose
2. Sass/Less already have variables

---

# Preprocessor vs CSS Variables [^2]

- Sass variables are static and lexically scoped
- CSS variables are live and scoped to the DOM

[^2]: [philipwalton: Why I'm Excited About Native CSS Variables](https://philipwalton.com/articles/why-im-excited-about-native-css-variables/)

^ Custom properties fill a gap that preprocessor variables simply can’t.

---

# What preprocessor cannot do

1. Interact with Javascript or 3rd party stylesheets
2. Aware of the DOM or CSSOM
3. Be changed dynamically
4. Cascade
5. Inherit

^ There are also many things preprocessor can do.

---

# Responsive properties with media queries

```scss
$gutterSm: 1em;
$gutterMd: 2em;
$gutterLg: 3em;

.o-container {
  padding: $gutterSm;
}

@media (min-width: 30em) {
  .o-container {
    padding: $gutterMd;
  }
}

@media (min-width: 48em) {
  .o-container {
    padding: $gutterLg;
  }
}
```

---

# Responsive properties with media queries

```css
:root { --gutter: 1.5em; }

@media (min-width: 30em) {
  :root { --gutter: 2em; }
}
@media (min-width: 48em) {
  :root { --gutter: 3em; }
}

.o-container {
  padding: var(--gutter);
}
```

^ Media query breakpoints can also use CSS variables

---

# Responsive modular scale

```css

:root {
  --base-font-size: 1em;
  --modular-scale: 1.2;
}
p { font-size: var(--base-font-size); }
h1 { font-size: calc(var(--modular-scale) * 3 * var(--base-font-size)); }
h2 { font-size: calc(var(--modular-scale) * 2 * var(--base-font-size)); }

@media (min-width: 30em){
  :root { --modular-scale: 1.333 }
}
@media (min-width: 48em){
  :root { --modular-scale: 1.414 }
}
```

---

# Reusable and extensible components

```css
.c-button {
  background-color: #eee;
  border: 2px solid crimson;
  color: crimson;
  font-size: 18px;
}

.c-header-button {
  background-color: #333;
  border: 2px solid aqua;
  color: aqua;
  font-size: 24px;
}

/* Or worse ... */
.header .c-button {}
```

^ Overriding implementation details
Error-prone, difficult to undo/override

---

# Reusable and extensible components

```css
.c-button {
  background-color: var(--btn-bg-color, #eee);
  border: 2px solid var(--btn-primary-color, crimson);
  color: var(--btn-primary-color, crimson);
  font-size: var(--btn-font-size, 18px);
}

.c-header-button {
  --btn-bg-color: #333;
  --btn-primary-color: aqua;
  --btn-font-size: 24px;
}
```

^ Using only styling API

---

# Reset component

```css
/* Best to avoid... */
.header .promo .c-button {}

/* ✌️ */
.c-promo-button {
  --btn-bg-color: initial;
  --btn-primary-color: initial;
  --btn-font-size: initial;
}
```

---

# Component styling API [^3]

API: Application programming interface [^4]

> “By abstracting the underlying implementation and only exposing objects or actions the developer needs, an API simplifies programming.”

[^3]: [mrmrs: Component styling API](http://mrmrs.cc/writing/2018/06/18/component-styling-api/)

[^4]: [Wikipedia - API](https://en.wikipedia.org/wiki/Application_programming_interface)

---

# Theming

> The act of laying a veneer over the top of an already styled website: an optional extra which alters or customises the UI

---

![fit](assets/bbc.png)

---

![fit](assets/bbc1.png)

---

# Theming

```css
/* Navigation.css */
:host {
  --navigation-bg: var(--primary)
}

.c-navigation {
  background-color: var(--navigation-bg, brown);
}
```

```css
/* NewsNavigation.css */
.c-news-navigation {
  --navigation-bg: darkred;
}
```

---

# Theming

```css
/* settings.css */
:root {
  --main-color: #1b70de;
  --bg-color: #FFF;
  --text-color: #000;
  --button-color: rgba(0, 0, 0, 0.8);
  --header-color: #424242;
}

:root.dark {
  --main-color: darkblue;
  --bg-color: #333;
  --text-color: white;
  --button-color: black;
  --header-color: #333;
}
```

---

[.hide-footer]
[.slidenumbers: false]
[.slidecount: false]

![fit](assets/twitter.png)

---

# User theme

````css
:root {
  --user-color: #01579B;
}

.u-textUserColor,
.u-borderUserColor {
  color: var(--user-color) !important;
}
```

---

# Runtime performance

1. Start-up performance
  - **3x slower**
2. Style-recalculation
  - avoid frequent :root changes
3. Setting with JS
  - prefer `el.setProperty('--color', 'green')`
  - `el.style = "color: green"`

---

# Start-up performance

![inline](assets/start-up-static-css.png)

---

# Start-up performance [^5]

![inline](assets/start-up-CSS-variable.png)

[^5]: [jiayihu: CSS Custom Properties performance in 2018](https://blog.jiayihu.net/css-custom-properties-performance-in-2018/)

---

# Theming with Sass

```css
/* Navigation.css */
:host {
  --navigation-bg: var($primary)
}

.c-navigation {
  background-color: var(--navigation-bg, $primary);
}
```

---

# vjeux CSS-in-JS

1. Global namespace
2. Dependencies
3. Dead code
4. Minification
5. Sharing constants
6. Non-deterministic resolution
7. Breaking isolation

---

# vjeux CSS-in-JS

1. Global namespace => **Shadow DOM**
2. Dependencies  => **Shadow DOM**
3. Dead code => **Shadow DOM**
4. Minification => **Shadow DOM (?)**
5. Sharing constants => **CSS variables**
6. Non-deterministic resolution => **Shadow DOM (?)**
7. Breaking isolation => **Shadow DOM**

---

# Dependencies

With [postcss-import](https://github.com/postcss/postcss-import)

```css
@import "normalize";
@import "local/foo.css";

.c-nav {
  background: rebeccapurple;
}
```

---

# vjeux CSS-in-JS

No runtime cost for
  - dead-code elimination
  - minification
