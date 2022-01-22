# Getting Started

This section will help you build a basic KduVite documentation site from ground up. If you already have an existing project and would like to keep documentation inside the project, start from Step 3.

- **Step. 1:** Create and change into a new directory.

  ```bash
  $ mkdir kduvite-starter && cd kduvite-starter
  ```

- **Step. 2:** Initialize with your preferred package manager.

  ```bash
  $ yarn init
  ```

- **Step. 3:** Install KduVite locally.

  ```bash
  $ yarn add --dev kduvite
  ```

- **Step. 4:** Create your first document.

  ```bash
  $ mkdir docs && echo '# Hello KduVite' > docs/index.md
  ```

- **Step. 5:** Add some scripts to `package.json`.

  ```json
  {
    "scripts": {
      "docs:dev": "kduvite dev docs",
      "docs:build": "kduvite build docs",
      "docs:serve": "kduvite serve docs"
    }
  }
  ```

- **Step. 6:** Serve the documentation site in the local server.

  ```bash
  $ yarn docs:dev
  ```

  KduVite will start a hot-reloading development server at http://localhost:3000.

By now, you should have a basic but functional KduVite documentation site.

When your documentation site starts to take shape, be sure to read the [deployment guide](./deploy).
