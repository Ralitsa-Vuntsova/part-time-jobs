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

Firstly, add values to the following variables in your .env file:
- PTJ_DB_NAME - name for you local DB
- PTJ_JWT_SECRET - generate random JTW secret

Then create a database in MongoDB Compass with the name you provided for PTJ_DB_NAME.

Secondly, navigate to `org` directory and install all npm packages:

```
npm install
```

To start the server, run the following command:

```
npm run start:api
```

To start the client, run the following command:

```
npm run start:client
```
