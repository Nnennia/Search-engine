# Movie Search Application

This project is a movie search application built with MongoDB, Redis, and Elasticsearch, and served through an Express API. It allows users to search for movies by various fields like movieName, cinema, actorName, and genre. The application caches search results using Redis to speed up repeated queries.

## Features

    Movie Indexing: Index movie details (such as name, cinema, actor, genre) to Elasticsearch.
    Search: Efficient search functionality to query movies based on multiple fields.
    Redis Caching: Stores search results in Redis for fast retrieval and reduces load on Elasticsearch.
    MongoDB: Stores movie details in a MongoDB database.

## Tech Stack

    Node.js
    Express
    MongoDB with Mongoose
    Redis
    Elasticsearch

## Installation

1.  Clone the repository

        git clone https://github.com/yourusername/search-engine.git
        cd search-engine

2.  Install Dependencies

        npm install

3.  Setup Environment Variables

        Create a .env file at the root of the project and add the following environment variables:

        MONGO_URL=<your_mongodb_connection_url>
        REDIS_HOST=<your_redis_host>
        REDIS_PORT=<your_redis_port>
        REDIS_PASSWORD=<your_redis_password>
        PORTCLIENT=<your_elasticsearch_node_url>
        APIKEY=<your_elasticsearch_api_key>

4.  Start the Application

        npm start

## API Endpoints

1. POST /indexMovie

This endpoint is used to index a new movie into Elasticsearch.

### Example Request:

POST /indexMovie

    {
    "movieName": "Inception",
    "cinema": "AMC",
    "actorName": "Leonardo DiCaprio",
    "seatAvailable": 50,
    "genre": "Sci-Fi"
    }

2. GET /search

Search for movies based on a query. The query will search across the fields movieName, cinema, actorName, and genre.

### Example Request:

GET /search?query=inception

#### Example Response:

    [
    {
    "movieName": "Inception",
    "cinema": "AMC",
    "actorName": "Leonardo DiCaprio",
    "seatAvailable": 50,
    "genre": "Sci-Fi"
    }
    ]

## How It Works

    MongoDB stores movie details (name, cinema, actor, etc.).
    Elasticsearch indexes the movie details for fast search across multiple fields.
    Redis caches search results for one hour to prevent redundant queries to Elasticsearch.
    The Express API allows users to index new movies and search for existing movies.

## Flow of Search Operation:

    A user makes a GET request to /search?query=<search term>.
    The system checks Redis cache for the result.
        If the result is cached, it returns the data immediately (cache hit).
        If the result is not cached, it queries Elasticsearch, stores the result in Redis, and returns the data (cache miss).
