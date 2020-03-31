# Full Stack Developer Test Challenge (Back-End part)

## Task
You should create a simple Web application where you can achieve the next challenge.

### User Story
As a user, I will provide a rank number between 1 to 5 (1 worst, 5 best) and make comments for all movies released in a specific year.

### Description
The user will have a simple screen where he can select a year and he will get all movies ordered from January to December released in that year, the user could navigate all movies and he will provide a rank value from 1 (worst) to 5 (best), the user could made comments for each movie as well. The user can change his rank value anytime. 

The information to be queried in the mobile app is the one provided by the open source database for movies called: The Movie DB https://www.themoviedb.org/documentation/api

### Acceptance Criteria
* The user will just have available the range of years to select from 2010 until 2019.
* All movies will keep the rank provided by the user when he is navigating the Website.
* The user could see the rank provided by himself for each movie and see all the comments from him and other users.
* The user could change the rank value for the movies in any time or he could remove it.

### High Level Design

![High level design schema](https://raw.githubusercontent.com/petervavro/Developer-Test-Challenge/master/images/developer-test-challenge_High-Level-Design.png)

### General conditions

* Use React in the frontend
* Use Node.js in the backend
* Use Postgres as Database
* Use a responsive design for the Website (HTML, CSS and a framework for the responsive design)
* Remember to use the backend as gateway to communicate the frontend with the backend
* The backend will have the CRUD for comments and Rank for movies

![Application Schema](https://raw.githubusercontent.com/petervavro/Developer-Test-Challenge/master/images/developer-test-challenge_App-Design.png)

### Deliverables
Upload your code in a free public repository in GitHub.

## The solution

### Installation

* Rename `.env.example` to `.env`
* Get your API key TMDB, [here.](https://www.themoviedb.org/settings/api)

### Run

`$ docker-compose up --build`

[API Documentation](https://documenter.getpostman.com/view/3890313/SzYW418v)

### Useful stuff

#### Postgres Container
```
$ docker exec -it developer_test_challenge_postgres_1 psql -U postgres
```