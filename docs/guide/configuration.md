# Configuration

Without any configuration, the page is pretty minimal, and the user has no way to navigate around the site. To customize your site, let’s first create a `.kduvite` directory inside your docs directory. This is where all VitePress-specific files will be placed. Your project structure is probably like this:

```bash
.
├─ docs
│  ├─ .kduvite
│  │  └─ config.js
│  └─ index.md
└─ package.json
````

The essential file for configuring a KduVite site is `.kduvite/config.js`, which should export a JavaScript object:

```js
module.exports = {
  title: 'Hello KduVite',
  description: 'Just playing around.'
}
```

Check out the [Config Reference](/config/basics) for a full list of options.
