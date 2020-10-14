# cinnanym

This is a related words finder app built on React using the [WordsAPI](https://www.wordsapi.com/) through [RapidAPI](https://rapidapi.com/dpventures/api/wordsapi/). It gets a list of synonyms, related words, and rhymes.

[View Site](https://cinnanym.netlify.app/)

![](https://github.com/stormcloud266/cinnanym/blob/main/screenshot.png)

## Tech Details
This project is built with [Create React App](https://create-react-app.dev/), uses [Netlify](https://www.netlify.com/) for hosting and Netlify's lambda functions for backend services. It's styled using CSS modules.

## Working with this project
### Development

1. devHeaders must be uncommented in functions/getData send function to eliminate CORS issues.
2. API key must be added manually to functions/getData headers variable.
3. `npm run lambda-serve`
4. `npm start`

## Production

1. REACT_APP_WORDS_API_KEY variable must be in Netlify
2. `npm run lambda-build`
3. push to Github
