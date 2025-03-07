## Software Platform for Posting Service Advertisements

### Overview:

The goal of the system is to significantly simplify the process of offering and searching for services by enabling users to:

- Post service ads with minimal effort.
- Apply for service ads through a simple and transparent process.

The system is designed to minimize the effort for both users seeking service providers and those offering their skills. The job poster can quickly and easily publish ads for the services they need, while job seekers have access to a structured list of ads and can apply for those that match their skills and preferences with minimal actions.

### Prerequisites:

You need to have the following installed on your machine:

- nx (v20.1.2)
- node (v18.19.1)
- npm (v9.2.0)
- mongo (v8.0.3)
- MongoDB Compass - UI for the DB

### Setup:

Firstly, add values to the following variables in an .env file, which needs to be created under `/org/apps/api` dir:
- PTJ_DB_NAME - name for you local DB
- PTJ_JWT_SECRET - generate random JTW secret

Do the same for the client (`/org/apps/client`):
- VITE_REACT_APP_SERVER_URL - the default value is 'http://localhost:3000'

Then create a database in MongoDB Compass with the name you provided for PTJ_DB_NAME.

Secondly, navigate to `org` directory and install all npm packages:

```
npm install
```

To start the server, run the following command:

```
npm run start:api
```

_Note: Starting the server automatically adds 3 test users and 15 test ads of each type to the DB._

To start the client, run the following command:

```
npm run start:client
```
