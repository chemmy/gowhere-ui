# GoWhere UI

A simple application that will provide user with traffic image and weather forecast given date, time and location

## Local setup

1. Clone repository or download zip
2. Also clone or download this project's server repository from https://github.com/chemmy/gowhere-server and follow readme instructions
3. Add .env to root folder, copy from envsample file and update if necessary
4. Run `npm i` to install dependencies
5. Run `npm run dev` to start application

## Application

1. The app will prompt user for date and time
2. Upon submission, user will be shown:
   - list of locations
   - recently searched locations by user
   - recently searched locations by other users
3. The use can then select a location
4. Then app will show the traffic image and weather forecast

## Assumptions

1. Only 1 page will be available for users, reports can be accessed by directly calling endpoints
2. Display 5 recent searches
3. Saved search history only has location, not datetime. As it won't make sense to search a time that has already passed.

## Architecture Overview

### Structure

```
/src
  /assets       # images, shared styles, static assets
  /common       # shared functionalities, constants
  /components   # reusable ui components
  /containers   # higher-level or page-level components
  /services     # api services
```

### State management

React-Query is used for this application's state management. It is also great for managing server state - fetching, caching, and synchronizing.

### UI Component & Styling

Antd provides comprehensive and consistent UI components that allows us to build and deploy UI components without spending excessive time on styling.

In addition, LESS css preprocessor is used for styling as it is the primary styling language of antd

## Critical Decisions

Using technologies that are new to me (e.g. React-Query, Vite, Antd) as they are recommended by the community. I have yet to explore their best use cases but so far I did not regret it as it made my development easier, while learning new things.

## Improvements

1. User identity to track and link a search to a user
2. Sentry for error-tracking
3. Mono-repo
