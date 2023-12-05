## Authentication Process

- How should we implement?
  1. use pre-built authentication like Firebase Auth
  2. use Auth0 by Okta
  3. use Django's user authentication
     - how do I get cookie-based user sessions from Django to React Native?
  4. Something else?

## Prompt Screen

- need an endpoint for getting the prompt for today.
- need an endpoint for submitting the response and its visibility.
  - this endpoint must return success/error status so the app can redirect to home screen.

## Responses, Response Screens

- need an endpoint for getting friends' response for today's prompt.
  - only friends of logged in user.
- need an endpoint for getting a response's details.
  - \# of likes, comments, shares.
  - an array of comments (must include a timestamp or somthing).
- need an endpoint for reporting a response.
  - return success/error

## Friends, Friend Screens

- need an endpoint for getting list of friends of current user.
- need an endpoint for deleting a friend from list of friends.
- need an endpoint for getting friend's details.
  - username, email address
  - list of responses
- need an endpoint for adding a friend with username (or email).

## History, PreviousPrompt Screens

- need an endpoint for getting a list of prompts from the past.
- need an endpoint for getting a past prompt's details
  - the text
  - all responses from friends (including current user)

## Profile Screen

- need an endpoint for updating current user's profile.
  - username
  - email address
  - password
