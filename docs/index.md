# What is KduVite?

::: warning WARNING
KduVite is early WIP! Currently the focus is on making Vite stable and feature complete first. It is not recommended to use this for anything serious yet.
:::

## Improvements Over KduPress

There're couple of things that are improved from KduPress....

### It Uses Kdu 3

Leverages Kdu 3's improved template static analysis to stringify static content as much as possible. Static content is sent as string literals instead of JavaScript render function code – the JS payload is therefore *much* cheaper to parse, and hydration also becomes faster.

Note the optimization is applied while still allowing the user to freely mix Kdu components inside markdown content – the compiler does the static/dynamic separation for you automatically and you never need to think about it.

### It Uses Vite Under The Hood

- Faster dev server start
- Faster hot updates
- Faster build (uses Rollup internally)

### Lighter Page Weight

- Kdu 3 tree-shaking + Rollup code splitting
- Does not ship metadata for every page on every request. This decouples page weight from total number of pages. Only the current page's metadata is sent. Client side navigation fetches the new page's component and metadata together.
- Does not use `kdu-router` because the need of KduVite is very simple and specific - a simple custom router (under 200 LOC) is used instead.
- (WIP) i18n locale data should also be fetched on demand.

## Other Differences

KduVite is more opinionated and less configurable: KduVite aims to scale back the complexity in the current KduPress and restart from its minimalist roots.

KduVite is future oriented: KduVite only targets browsers that support native ES module imports. It encourages the use of native JavaScript without transpilation, and CSS variables for theming.

## Will This Become The Next KduPress in The Future?

Probably not. It's currently under a different name so that we don't over commit to the compatibility with the current KduPress ecosystem (mostly themes and plugins). We'll see how close we can get without compromising the design goals listed above. But the overall idea is that KduVite will have a drastically more minimal theming API (preferring JavaScript APIs instead of file layout conventions) and likely no plugins (all customization is done in themes).
