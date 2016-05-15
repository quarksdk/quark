# Quark

Quark is an Electron base app that includes modern web technologies at its core.

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run tests
npm test
```

### Further Reading

+ [Quark is loosely based on vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)
+ [Get the Vue.js Dev Tools](https://github.com/vuejs/vue-devtools)

- main.js: the MainProcess window of Electron
- build.js: the Webpack entry file and configurations
- .env.example: the only version controlled .env file and is used as a template
- dist: the binary distributions for .app and .exe
- build: the compiled down sources from app/
- config: a folder of `.json` (or `.js` if logic is needed) files that represent configurations for the app
- app: the application's ES6 classes and .vue files
- app/Controllers: your renderer processes, typically they'd have a corresponding View by the same name
- app/Console: things like commands or anything that interacts as a background process
- app/Exceptions: just like it sounds, standard exceptions
- app/Listeners: handler classes for IPC messages
- app/Models: any representation of data (may not necessarily be backed by an ORM)
- app/Notifications: like exceptions but not for the typical error reasons
- app/Providers: classes that bind and register services into the service container
- app/Routes: classes that provide routes to the Views
- app/Services: classes that provide a service to other classes like a DB class
- app/Support: classes that support the over all application like a container or helper utilities
- app/Views: .vue files that make up the main app component and usually include routing logic
- app/Views/Components: .vue files that represent the components that make up a UI
- resources/templates: your renderer's main templates and any partials used by views
- resources/scripts: any global scripts not part of a vue, and strictly for DOM manipulation
- resources/styles: any global styles not part of a vue
- resources/lang: .json or .yml documents containing strings for language templating purposes
- tests: where all the unit tests are

1) Setup Service <–– Providers -–> 2) Put Service in Container

3) Resolve Container Instance <–– Service Locator --> Import Service and Return It

instead of "import Foo from './Services/Foo'"
you would "import Foo from './Services/Locators/Foo'"

import Container from '../../Services/Container'
Facades/Foo {
  constructor()
  {
    return Container.resolve('foo')
  }
}

Container {
  providers: {
    database: Services/Database
  }

  instances: {
    singletonDatabase: object
    manyDatabase: [ object ]
  }

  make(class)
  {
    return this.instances[class] ? this.instances[class] : this.providers[class].register()
  }
}

App.make('command')
App.container.resolve('command')
