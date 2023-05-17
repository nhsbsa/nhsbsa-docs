# Local development

## Prerequisites

* [Node 16][node_js]
* [Node package manager (npm)][npm]
* [Git][git]

> To check if node and npm are installed, type `node -v` or `npm --v`. Each should then log a version number.
> To check if git is installed, type `git -v`. This should print a version number like "git version 2.39.2".

## Quick start

### 1. Fork the repository

[Fork the repository][fork_a_repo] first, if you're an external contributor.

### 2. Clone the repository

You can clone the repository directly if you're a member of the [NHSBSA GitHub organisation][nhsbsa_github]

```bash
git clone git@github.com:nhsbsa/nhsbsa-docs.git
```

Otherwise you'll have to clone your own fork
> Replacing '[Username]' with your own GitHub username.

```bash
git clone https://github.com/[Username]/nhsuk-frontend.git
```

### 3. Install dependencies

Make sure that you are in the correct `nshbsa-docs` directory that you have cloned.

```bash
cd nhsbsa-docs
```

Install the project dependencies:

```bash
npm i
```

### 4. Create a local package or symlink

After making changes to your local project.

You can package the nhsbsa-docs code. Then install the compiled package within the project you wish to use the library.

```bash
npm pack
```

```bash
npm i [relative-path]/nhsbsa-docs-[version].tgz
```

> Replace '[relative-path]' with the destination of your compiled package.
> Replace '[version]' with the appropriate version of your package.

#### Creating a symlink

Run the following command within the `nhsbsa-docs` directory.

```bash
npm link
```

Then within your projects directory, run the following:

```bash
npm link nhsbsa-docs
```

> Node symlink documentation can be found [here][npm_symlink].

## Testing the application

Running test scripts only applies to local-development, meaning that tests won't be available when the package is added as a dependency to your project.

```bash
1. npm test
2. npm test:unit
3. npm test:coverage
```

Test scripts can be found in the `package.json`.

[node_js]: <https://nodejs.org/en/>
[npm]: <https://docs.npmjs.com>
[git]: <https://help.github.com/articles/set-up-git/>
[fork_a_repo]: <https://help.github.com/articles/fork-a-repo/>
[nhsbsa_github]: <https://github.com/nhsbsa/>
[npm_symlink]: <https://docs.npmjs.com/cli/v9/commands/npm-link>
