<div align="center">
  <h1>LOADABLE LIBRARY ✂</h1>
  <br/>
  <img src="./assets/imported-logo.png" alt="imported library" width="409" align="center">
  <br/>
  <br/>
  Dont code-split components - code split libraries 
  <br/>
  <br/>
  
  <a href="https://www.npmjs.com/package/react-imported-library">
    <img src="https://img.shields.io/npm/v/react-imported-library.svg?style=flat-square" />
  </a>
    
  <a href="https://travis-ci.org/theKashey/react-loadable-library">
   <img src="https://travis-ci.org/theKashey/react-loadable-library.svg?branch=master" alt="Build status">
  </a> 
  
  <img src="https://badges.greenkeeper.io/theKashey/react-imported-library.svg" />
    
  <br/>
</div>

Use the power of renderprop to delived a Library as a React component. Based on 
[React-lodable](https://github.com/jamiebuilds/react-loadable). Does __not__ support SSR and React Suspense.
Use [react-imported-library](https://github.com/theKashey/react-imported-library) if you are looking for them.

- ⛅️ You can codesplit momentjs, you may async load any library and use it.
- 🔒 Written in TypeScript.
 
## Usage

Have you heard, than moment.js is super hudge? Code split it!
```javascript
import {importedLibrary, importedLibraryDefault, setConfig} from 'react-loadable-library';

// do you need SSR support? Probably not (affect react-imported-component settings)
setConfig({SSR: false});

// this will import `default` export
const Moment = importedLibraryDefault( () => import('momentjs'));

<Moment>
 { (momentjs) => <span> {momentjs(date).format(FORMAT)}
</Moment>
```

May be you have a small library, you may use somewhere inside your components?

Codesplit it! 
```js
import {importedLibrary} from 'react-loadable-library';
const Utils = importedLibrary( () => import('./utils.js'));

<Utils>
 { ({a,b,c }) => <span> {a(b+c())}
</Utils>
```

May be you also have to caclucate something heavy, not to do it on every `render`?
```js
// you may use "initialization hook" to offload some computations

<Utils
  initial={ ({a,b,c}) => ({ result: a(b+c()) })}
>
 {(_,state) => <span>{state.result}</span>} 
</Utils>


```

## API

- importedLibrary(`importer`, options?): Component
  - `importer` is an `import` statement, or any Promise resolver
  - options 
    - options.async:boolean - enables React.suspense, ie throws a Promise on loading
    - options.exportPicker - allows you to "pick" export from the original file
    
- importedLibraryDefault - is just importedLibrary with _exportPicker_ configured to pick `.default`

- Component
  - `initial: (library: T) => K;` - state initializator
  - `children: (library: T, state: K) => React.ReactNode` - function-as-children
  - `error: ReactComponent` - error indicator
  - `loading: ReactComponent` - __unthrottled__ loading indicator.       


## Licence
MIT
