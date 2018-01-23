# NTPT React Frontend

This Project is part of my Bachelor Thesis and represents the Frontend. It will connect to [NTPT Server](https://github.com/stegerpa/ntpt_camunda_server) using its REST-API and to the [Docker Containers](https://github.com/stegerpa/ntpt_docker_compose). Code is written in [React.js](https://reactjs.org/) and [ES6](http://es6-features.org/)

<img width="345" alt="github_architecture" src="https://user-images.githubusercontent.com/18348827/35306698-76b69086-009f-11e8-8af2-f979e6c8eaa7.png">


## Start Development Server
Make sure [NodeJS](https://nodejs.org/en/) is installed on your machine.
* Clone the repo
* Run command `npm install` and `npm start`
* Open http://localhost:3000 in your browser

## Build
See https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment

### Deployment

`npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

#### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.
