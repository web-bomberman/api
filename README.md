# Web Bomberman API

This is the API for the Web Bomberman project.

## Getting started

First, clone the repository and install the dependencies.

```
git clone git@github.com:web-bomberman/api.git
cd api
npm install
```

Then, make a `.env.development` file with your configs. You only need a
`PORT` and a `JWT_SECRET` variables, no databases are being used.

## Running locally

To run locally on your machine, run the following command on your terminal
at the folder with the project:

```
npm run dev
```

If you want to run on the Docker environment, use the following command to
run the containers:

```
npm run dev:docker:up
```

To stop them, run this:

```
npm run dev:docker:down
```

Both Docker and non-Docker versions use the same `.env.development` file.
Also, remember to stop the containers and bring run them again to get any
changes.

## Formatting and Linters

We're using the classic ESLinter + Prettier combination. Run the following
before pushing to the repository and make sure you fix all errors.

```
npm run lint
```

The errors that can be automatically fixed can be done so by running this:

```
npm run lint:fix
```

## Credits

[Rafael Bordoni](https://github.com/eldskald)

## License

Licensed under MIT.
