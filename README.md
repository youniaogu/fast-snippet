## Fast Snippet

a vscode extensions for fast write snippet to clipboard

### 1. What it do

replace snippet keyword by rule and copy to clipboard

rule:

| e.g name              | loadUserInfo     |
| --------------------- | ---------------- |
| `#NAME#`              | `loadUserInfo`   |
| `#FIRSET_UPPER_NAME#` | `LoadUserInfo`   |
| `#UPPER_NAME#`        | `LOAD_USER_INFO` |

E.g:

![](static/pic1.gif)

#### snippet:

```javascript
const template = `export const #UPPER_NAME# = Symbol('#UPPER_NAME#');

export function #NAME#() {
  return {
    type: #UPPER_NAME#,
  };
}`;
```

#### name: loadUserInfo

#### output:

```javascript
export const LOAD_USER_INFO = Symbol('LOAD_USER_INFO');

export function loadUserInfo() {
  return {
    type: LOAD_USER_INFO,
  };
}
```

### 2. Before use

#### step 1: write a template(suggest use template string by es6)

E.g:

```javascript
`export const #UPPER_NAME# = Symbol('#UPPER_NAME#');

export function #NAME#() {
  return {
    type: #UPPER_NAME#,
  };
}`;
```

#### step 2: translate to common string(if es6)

[Babel online translator](https://babeljs.io/repl/#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=FBA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.12.9&externalPlugins=) can do it easy!

![](static/pic2.png)

#### step 3: copy and put in `settings.json`

setting name is call `fastSnippet.template`

![](static/pic3.png)

#### step 4: enjoy it!
