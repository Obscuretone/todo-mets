# METS Todo App

This is a simple Todo application built using the **METS** stack:
- **MongoDB** - A NoSQL database for storing tasks.
- **Express** - A web framework for Node.js to handle HTTP requests.
- **TypeScript** - A superset of JavaScript that adds static typing for better developer tooling and reliability.

## Features

- Create new tasks
- Get a list of all tasks
- Update tasks
- Delete tasks

## Technologies

- **MongoDB** - Used for persistent storage of tasks.
- **Express** - Handles the routing and HTTP logic.
- **TypeScript** - Provides type safety and modern JavaScript features.

## Installation

Follow these steps to set up the application:

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/todo-mets.git
    cd todo-mets
    ```

2. Install the dependencies:

    ```bash
    docker-compose up --build
    ```

## Running Tests

To run the unit tests with Jest:

```bash
npm test
```

Tests include checking CRUD operations on the Todo tasks.