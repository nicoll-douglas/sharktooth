<div align="center">
  <img src="./assets/images/logo.png" width="400" alt="Sharktooth Logo" />
  <br>

  <h1>Sharktooth</h1>

  <div>
  <img src="https://img.shields.io/badge/License-MIT-green" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" />
  </div>

  <div>
    <img src="https://img.shields.io/badge/React-gray?logo=react" />
    <img src="https://img.shields.io/badge/Typescript-gray?logo=typescript" />
    <img src="https://img.shields.io/badge/Python-gray?logo=python" />
    <img src="https://img.shields.io/badge/Electron-gray?logo=electron" />
    <img src="https://img.shields.io/badge/SQLite-gray?logo=sqlite" />
    <img src="https://img.shields.io/badge/Vite-gray?logo=vite" />
    <img src="https://img.shields.io/badge/Pytest-gray?logo=pytest" />
  </div>
</div>

## About

Sharktooth is a feature-rich desktop application that allows you to download audio from YouTube. There are a number of YouTube to audio converters on the internet but they all fall short in one way or another—too many ads, poor handling of file metadata, etc. To fix this I built this project so that music collectors can download files and handle metadata quickly, seamlessly, and hassle-free.

### Disclaimer

Users are responsible for their actions and potential legal consequences. I do not support unauthorized downloading of copyrighted material and take no responsibility for user actions.

## Features

- Search for audio tracks or paste a YouTube URL to download.
- Set file metadata such as track artist, name, album, release date, genre and more before download.
- Download audio in either .mp3 or .flac format.
- A queue based downloads system with real-time updates and
  CRUD operations.

## Folder Structure

- `frontend` - Contains React and TypeScript code for the electron renderer.
- `electron` - Contains TypeScript code used by the main Electron process.
- `shared` - Contains shared TypeScript code for the renderer and main processes.
- `scripts` - Contains Node.js scripts used at build-time.
- `backend` - Contains Python code for the backend API of the application.
- `bin` - Contains binaries used by the application.
- `assets` - Contains static project assets.

## Running Locally

### Prerequisites

- [Python 3](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download)

### 1. Clone the Repo

```bash
git clone https://github.com/nicoll-douglas/sharktooth.git
cd sharktooth
```

### 2. Set up a Python Virtual Environment

Create a Python virtual environment with the command below:

```bash
python3 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Or if you are on windows:

```bash
.venv\Scripts\Activate.ps1
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
npm install
```

### 4. Set up Envrionment Variables

Consult the [.env.example](.env.example) file to see the expected environment variables and structure of the .env file. Use the following command to get a headstart:

```bash
cp .env.example .env
```

### 5. Running the Application

Run the following command to start a development instance of the application:

```
npm run dev
```

## Demo

A project demo can be found on my website at [https://nicolldouglas.xyz/projects](https://nicolldouglas.xyz/projects)

## License

[MIT](https://opensource.org/license/mit)
