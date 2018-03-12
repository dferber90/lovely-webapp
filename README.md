# webapp

Playground to experiment with new web technologies.

## Setup on development machine

### Enable yarn workspaces

```
$ yarn config set workspaces-experimental true
```

[Blog post](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

## GraphQL

The app uses [graph.cool](https://www.graph.cool/) as a backend.

```
# one-time global installation of graphcool required
npm install -g graphcool

# then go to pacakges/api and open the playground
graphcool playground
```

https://console.graph.cool/wa/playground
