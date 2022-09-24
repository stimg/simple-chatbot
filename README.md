## Simple Chatbot

### Features
- Load the chatbot data asynchronously from GitHub repo
- The chatbot flow starts with question id 100
- Use the chosen option‘s nextId to guide the user through the dynamic flow
- All previously entered answers need to be displayed
- If the nextId is false, the flow is terminated and the following message is shown: „Herzlichen Dank für Ihre Angaben“
- Finally, the answers are sent combined as a PUT request to this endpoint

### Tools & Technology Stack
- WebStorm
- NPM
- Git
- Typescript 4+ (Strict Mode)
- React 18+
- Eslint
- Prettier
- Material UI 4+ and JSS

### Target
ECMAScript 2015

### Browser compatibility
- Internet Explorer Edge 15+
- Firefox 54+
- Chrome 51+
- Safari 10+

### Local development
- Clone repository
- `npm i`
- `npm start`

Have fun!
