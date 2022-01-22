# Customization

You can develop your custom theme by adding the `.kduvite/theme/index.js` file.

```bash
.
├─ docs
│  ├─ .kduvite
│  │  ├─ theme
│  │  │  └─ index.js
│  │  └─ config.js
│  └─ index.md
└─ package.json
````

In `.kduvite/theme/index.js`, you must export theme object and register your own theme layout. Let's say you have your own `Layout` component like this.

```kdu
<!-- .kduvite/theme/Layout.kdu -->
<template>
  <h1>Custom Layout!</h1>
  <Content/><!-- make sure to include markdown outlet -->
</template>
```

Then include it in `.kduvite/theme/index.js`.

```js
// .kduvite/theme/index.js
import Layout from './Layout.kdu'

export default {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Kdu 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Kdu 3 app instance from `createApp()`. router is KduVite'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
}
```

If you want to extend the default theme, you can import it from `kduvite/dist/client/theme-default`.

```js
// .kduvite/theme/index.js
import DefaultTheme from 'kduvite/dist/client/theme-default'

export default {
  ...DefaultTheme
}
```
