import { Box, Container, Paper } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';
import { ChatItem } from './ChatItem';
import { firstItemId, getUrl, putSuccessStatus, putUrl } from './config';
import { Answer, FlowItem, OptionValue } from './types';

interface AppStateProps {
  flow: FlowItem[];
  answers: Answer[];
  message?: string;
}

const initialState: AppStateProps = {
  message: 'Die Chat-Dateien werden heruntergeladen...',
  flow: [],
  answers: [{ id: firstItemId }]
};

const App: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(initialState);

  // Don't use thunks or redux toolikt because of prototype nature
  const fetchFlow = async () => {
    const response = await fetch(getUrl);
    if (response.status === 200) {
      const flow = await response.json();
      setState({
        ...state,
        flow,
        message: undefined
      });
    } else {
      setState({
        ...state,
        message: `Fehler ${response.status}`
      });
    }
  };

  const handleUserInput = (
    id: number,
    nextId: number | boolean,
    value: OptionValue,
    text: string
  ) => {
    const { answers } = state;
    const targetItem = answers.find((answer) => answer.id === id);
    // Flow item has false id
    if (!targetItem) return;

    // Take the answer...
    targetItem.value = value;
    targetItem.text = text;

    setState({
      ...state,
      // ...and continue chat
      answers: [...answers, { id: nextId }]
    });
  };

  // Sure must be in the API slice in the production
  const handleSendResult = async () => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.answers)
    };
    const response = await fetch(putUrl, options);
    if (response.status === putSuccessStatus) {
      setState({
        ...state,
        message: 'Ihre Eingaben sind erfolgreich gespeichert.'
      });
    } else {
      setState({
        ...state,
        message: 'Es ist ein Fehler aufgetreten.'
      });
    }
  };

  const resetChat = () => {
    setState({
      ...state,
      answers: [{ id: firstItemId }]
    });
  };

  const getChatItems = () => {
    const { flow, answers } = state;

    // Render only the answered questions and next one
    return answers.map((answer, index) => {
      const flowItem = flow.find((item) => item.id === answer.id);

      return (
        <ChatItem
          key={index}
          flowItem={flowItem}
          answer={answer}
          handleUserInput={handleUserInput}
          handleSendResult={handleSendResult}
          handleReset={resetChat}
        />
      );
    });
  };

  React.useEffect(() => {
    // Not so elegant, but no with no redux :)
    fetchFlow();
  }, []);

  return state.message ? (
    <div className={classes.message}>{state.message}</div>
  ) : (
    <Container maxWidth={'sm'}>
      <Box
        sx={{
          typography: 'h2',
          color: 'white',
          fontWeight: 600,
          marginBottom: '-18px',
          textShadow: '0px -2px 3px rgba(0,0,0,0.1)'
        }}
      >
        SIMPLE CHATBOT
      </Box>
      <Paper
        className={classes.chatContainer}
        elevation={3}
        sx={{ typography: 'body1' }}
      >
        {getChatItems()}
      </Paper>
    </Container>
  );
};

export default App;
