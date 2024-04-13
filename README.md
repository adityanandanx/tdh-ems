# TDH - Event Management System

## Project Overview

This Event management system is built with Next.js and utilizes Supabase as the backend database. Supabase is set up to run locally using Docker containers. Below are instructions on how to set up, run, and manage the project.

## Setup

### Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- Node.js
- Yarn

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.

### Setting up Supabase Locally

1. Run the following command to start Supabase locally:
   ```
   yarn db:start
   ```
2. Verify the status of the local Supabase instance:
   ```
   yarn db:status
   ```
3. Copy the example env file [`.env.example`](./.env.example) to `.env.local`
   ```
   cp .env.example .env.local
   ```
4. Copy the `API URL` and `anon key` from the output of step 2 and paste it as respective variable in `.env.local` file

### Database Migration

1. To generate migration files based on changes in the database schema, run:
   ```
   yarn migration:generate
   ```
2. Push the generated migrations to the local Supabase instance with the following command:
   ```
   yarn migration:push
   ```

### Starting the Development Server

To start the Next.js development server, run:

```
yarn dev
```

## Scripts

- `dev`: Starts the Next.js development server.
- `db:start`: Starts the local Supabase instance using Docker containers.
- `db:stop`: Stops the local Supabase instance.
- `db:status`: Checks the status of the local Supabase instance.
- `db:types`: Generates TypeScript types to the file [`./schema.gen.ts`](./schema.gen.ts) based on the Supabase schema.
- `db:reset`: Resets the local Supabase database.
- `migration:generate`: Generates migration files based on database schema changes.
- `migration:push`: Pushes migration files to the local Supabase instance.

## Additional Information

For more information about Next.js, visit the [Next.js documentation](https://nextjs.org/docs).
For more information about Supabase, visit the [Supabase documentation](https://supabase.io/docs).
