Survey Lemur

FRONT END DEPLOYED - https://thebestgasquad.github.io/FrontEnd/

FRONT END REPO - https://github.com/TheBestGASquad/FrontEnd

BACKEND REPO - https://github.com/TheBestGASquad/surveyPlatformAPI
BACKEND DEPLOYED - https://radiant-plains-78167.herokuapp.com/

Explanation of project:

The purpose of this application is to create custom surveys and collect the responses.  The user can create an account, create, update, and delete surveys.  These surveys will be stored in a database for the user.  The user will need to sign up, sign in, and press “Show My Surveys” for a list of his/her current surveys.  As these surveys are created, there is a delete and rename button next to each survey which will allow the user to rename or delete a survey.  The user can also click “View Survey” to see the questions that he/she created for each survey.


Technologies Used

* Javascript
* Jquery
* Handlebars
* HTML
* Bootstrap
* Express
* CSS

User Stories

* As a user, I want to be able to sign up for an account - POST
* As a user, I want to be able to sign into my account - POST
* As a user, I want to be able to log out of my account - DELETE
* As a user, I want to be able to change my password - PATCH
* As a user, I want to be able to create a survey that consists of multiple true/false questions- POST
* As a user, I want to be able to delete a survey - DELETE
* As a user, I want to be able to rename a survey - PATCH
* As a user, I want to be able to view the surveys I created - GET
* As a non-authenticated user, I want to be able to get a survey by id - GET
* As a non-authenticated user, I want to be able to take a survey - PATCH
Process

Project Lead: Andrew Easterling

Front-End Lead: Lisa Wang

Back-End Lead: Alex Mollohan

QA: Pinaro Ouk

Even though we had our set roles we worked closely together as a team.  In the beginning we pair programmed quite frequently.  We started by creating user stories to help determine what kind of user experience we wanted.  We used Bootstrap and HTML/CSS to set up the front-end to give us a visual of what we wanted the app to entail.  We also used Handlebars to create the table of surveys and questions.

ERD and Wireframes

https://goo.gl/photos/p8UULyL3fwY7haRx6

One to Many

* User has many surveys
* Surveys have many questions
Major Hurdles/Unsolved Problems

Overall we were able to meet the technical requirements.  In the future, we would like to clean up our code and CSS.  We also had stretch goals of creating open ended and 1-5 range questions as well as being able to view the survey answers.  One hurdle was merging/rebasing our branches on Git.  We realized that a lot of times our code was altered after we tried to rebase in order to have the same code.
