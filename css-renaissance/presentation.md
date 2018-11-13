# CSS Renaissance

---

## From the Middle Age to modern CSS

- Shadow DOM
- Custom Properties
- Houdini (Paint API)

---

# Reusable components

```css
/* styles.css */
.button {
  background-color: #var(--bg-color, #eee);
  border-radius: 5px;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  font-size: var(--btn-font-size, 18px);
  font-weight: 700;
  letter-spacing: 1px;
  padding: 10px 15px;
}
```

---

# Reusable components

```js
export function Button(props) {
  return (
    <ShadowDOM>
      <button class="button"></button>
      <style>{styles}</style>
    </ShadowDOM>
  )
}
```

---

# Reusable components

```js
export function PromoButton(props) {
  return (
    <Button
      class="button"
      style={{
        '--primary-color:' aquagreen;
        '--bg-color': #eee;
      }} 
      {...props}
    />
  )
}
```

---

# Interoperability

- Sass
- React/Angular/Vue
- hyperHTML
- styled-components

^ Anything since it's standard

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

# vjeux CSS-in-JS

No runtime cost for
  - dead-code elimination
  - minification

---

# Custom properties in JS

```html
<button style={{ '--primary': colors.primary }}></button>
```
