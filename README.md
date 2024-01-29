# SelfishPoly

The main purpose of creating **SelfishPoly** app is to get familiar with **CRUD** operations, duplex real-time operations with WebSockets,~~and making it serverless~~

App architectural ideas:

- Let’s make it share one TypeScript types source between FE & BE

- BE: The Post/Put request have validation, they fail if sent content doesn't include word “Poly”

- BE: Databases can be any, even custom in memory. ~~(for future we can use AWS DynamoDB)~~

- FE app should:

- - display List of all poly-notes,

- - **C**reate a note,

- - **R**ead single note,

- - **U**pdate/edit a note,

- - **D**elete a note.

- FE should have some state manager for CRUD views: Redux (not lib but pattern), React Context, RxJS, ReactQuery, or what you want.  \
  **Try to use less 3rd party libraries as possible**, recreate stuff by yourself just to understand how it all evolved.

- FE should have a Chat mechanism.

- - The PolyChat should just repeat what you send him, but prefixing with word “Poly_“


Example app for ideas.
[https://drive.google.com/file/d/1X9FXDIAyxbWyqMd7-XjAep_fDV20uIV1/view?usp=sharing](https://drive.google.com/file/d/1X9FXDIAyxbWyqMd7-XjAep_fDV20uIV1/view?usp=sharing)

![parrot.png](docs%2Fparrot.png)


## Step 1: setup Monorepo


```
# How to setup monorepo with npm
# initializing project itself
npm init -y

# initializing workspaces
npm init -y --scope @poly -w packages/server
npm init -y --scope @poly -w packages/client
npm init -y --scope @poly -w packages/domain

# binding workspaces
npm install @poly/domain -w @poly/client
npm install @poly/domain -w @poly/server

# initialize dependencies
npm install
# OR independently
npm install --workspace @poly/client
npm install --workspace @poly/server
npm install --workspace @poly/domain

# install new common dependencies between all workspaces
npm install -D typescript

# install new dependencies to workspaces
npm install @types/node -w @poly/server --save-dev
npm install react --workspace @retro/client

# run workspace
npm run test --workspace package-a
npm run start --workspace @poly/client
# Tip - this also works:
npm run test -w package-a
```


Sometimes when creating a monorepo with npm, when binding workspaces, an error like this may occur:
```
💚 🔱(main)❗ npm install @poly/domain -w @poly/client                                                                                                                          ~/Documents/linux-wo/SelfishPoly
npm WARN config legacy-bundling This option has been deprecated in favor of `--install-strategy=nested`
npm ERR! code E404
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@poly%2Fdomain - Not found
npm ERR! 404
npm ERR! 404  '@poly/domain@*' is not in this registry.
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.
```

just delete [package-lock.json](package-lock.json),
this happens because there are entries like this when workspaces are initialized:

```json lines
"node_modules/@poly/server": {
  "resolved": "packages/server",
  "link": true
},
"packages/server": {
  "name": "@poly/server",
  "version": "1.0.0",
  "license": "ISC"
}
```

## Step 2: create FE
```
cd packages\client\
npx create-react-app my-app --template typescript
```
in **packages\client\my-app\package.json** do changes
```json lines
{
    "name": "@poly/client",
    "dependencies": {
        // can manually add or with console "npm install @poly/domain -w @poly/client"
        "@poly/domain": "^1.0.0"
    },
}

```

move stuff from **packages\client\my-app** folder, to **packages\client\**

install dependencies like so: ```npm install --workspace @poly/client```

run app like so:: ```npm run start --workspace @poly/client``` OR ```npm start -w @poly/client```

**Add this in package.json for future BE to work**
```json lines
"options": {
  "allowedHosts": ["localhost", ".localhost"],
  "proxy": "http://localhost:5000"
},

```
## Step 3: create BE
```
cd packages/server
tsc --init
```
P.S. TypeScript tsc --init  generates this
```json
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    }
}
```


BUT paste this setup in tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "moduleResolution": "NodeNext",
        "strict": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "jsx": "react"
    },
    "outDir": "./build",
    "include": ["src"]
}
```

Lets setup express framework and nodemon+ts-node (when developing the server restarts automatically)
```
npm install @types/express -w @poly/server --save-dev
npm install nodemon -w @poly/server --save-dev
npm install ts-node -w @poly/server --save-dev
npm install express -w @poly/server

```

nodemon config [nodemon.json](packages%2Fserver%2Fnodemon.json)
```json
{
    "restartable": "rs",
    "ignore": [ "node_modules", "server-dist" ],
    "watch": ["./src", "./index.ts"],
    "ext": "js,json,ts",
    "execMap": { "ts": "ts-node" },
    "env": { "NODE_ENV": "development" }
}
```
in [package.json](packages%2Fserver%2Fpackage.json) to "script" section add
```
  "scripts": {
    "start": "nodemon --config ../packages/server/nodemon.json index.ts",
    "debug": "nodemon --config ../packages/server/nodemon.json --inspect-brk index.ts"
  },
```

to run server ```npm start -w @poly/server```

## Step 4: create Domain/Model/Types with Typescript
create a file where you will store TypeScript types & export them.
add **tsconfig.json** same as in packages/server

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "moduleResolution": "NodeNext",
        "strict": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "jsx": "react"
    },
}

```


## Step X: Play
start doing stuff you can look for answers in other branches:
* branch **main** contains only readme.md's files
* branch **solutions/1-monorepo_finished** has monorepo setup finished
* branch **solutions/2-setup-node_react_and_typescript** has a basic reusable @domain, both in express.js @server & FE @client

#### NOTE!
If you want to start coding FE without above setup, but figure it out on the go, start from branch **solutions/2-setup-node_react_and_typescript**

