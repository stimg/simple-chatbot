import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  chatContainer: {
    marginBottom: '10vh',
    padding: 40,
    paddingTop: 20,
    height: '450px'
  },
  question: {
    marginTop: '15px'
  },
  answer: {
    color: 'blueviolet',
    fontStyle: 'italic'
  },
  thanks: {
    marginTop: '35px',
    marginBottom: '15px'
  },
  message: {
    marginTop: '-20vh',
    fontSize: '32px',
    fontWeight: 100,
    color: 'silver',
    textAlign: 'center',
    width: '100%'
  }
});
