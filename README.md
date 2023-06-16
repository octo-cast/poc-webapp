# Nextjs and Websocket Livestream WebApp

This web application is developed using Next.js and TypeScript. It allows you to view and launch livestreams. The application uses a WebSocket server to broadcast the stream to a remote NGINX server using a child process FFMPEG.

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- Node.js (version X.X.X)
- NPM (version X.X.X)
- FFMPEG (version X.X.X)

## Installation

1. Clone this repository to a directory of your choice:

```shell
git clone https://github.com/octo-cast/poc-webapp.git
```

2. Navigate to the project directory:

```shell
cd poc-webapp
```

3. Install the required dependencies:

```shell
npm install
```

## Usage

1. Start the WebSocket server and the web application:

```shell
npm run ws
```

2. Open your browser and access the following URL:

```
http://localhost:5555
```

3. You can now view and launch livestreams from the application.

## Contributing

If you would like to contribute to this project, you can follow these steps:

1. Fork this repository and clone it to your machine.

2. Create a branch for your modifications:

```shell
git checkout -b feature/new-feature
```

3. Make your changes and test them thoroughly.

4. Commit your changes:

```shell
git commit -m "Add a new feature"
```

5. Push your changes to your fork:

```shell
git push origin feature/new-feature
```

6. Open a pull request in this repository to submit your changes.
