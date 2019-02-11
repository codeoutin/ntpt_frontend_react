# NTPT React Frontend
The NTPT React Frontend is a GUI, written in [React.js](https://reactjs.org/) for the NTPT Server component. It basically triggers a Camunda BPM Process, which generates Software Components like git branches and databases. It will also talk to Camundas API to receive informations about the tasks. To setup the NTPT Project you also need
* [NTPT Server Component](https://github.com/stegerpa/ntpt_camunda_server)
* [NTPT Docker Environment](https://github.com/stegerpa/ntpt_docker_compose)

<img width="200" alt="github_architecture" src="https://user-images.githubusercontent.com/18348827/35306966-c96738ca-00a0-11e8-8c0e-c8e3e097222d.png">

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
For environments that have [Node.js](https://nodejs.org/) installed, use [serve](https://github.com/zeit/serve) and let it do its magic:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.
