# Hi!

I solved this challenge with a nextjs app. It has a client and an API build-in which implies an simpler implementation of the solution for this problem.
It has a mongo database implemented using moongose, its a clioud

This application uses yarn and css modules. The UI is simple, but its responsive.

## To run

First create an env.local file with
MONGODB_URI=mongodb+srv://admin:admin@database.hop5a.mongodb.net/app?retryWrites=true&w=majority

then, you have two ways

- docker build -t client .
- yarn && yarn dev

## Considerations

First run, it will offer you to create some task, a bulk. I will call the API and insert 10 tasks into the database, and retrieve the first 3, 3 as the default value.
