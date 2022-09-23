import { Container, Paper } from '@mui/material';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { ChatItem } from './ChatItem';
import { Answer, FlowItem, OptionValue } from './types';

interface AppStateProps {
  isLoading: boolean;
  flow: FlowItem[];
  answers: Answer[];
  error: boolean;
}

// Can be put in the config
const firstItemId = 100;

const initialState: AppStateProps = {
  isLoading: true,
  flow: [],
  answers: [{ id: firstItemId }],
  error: false
};

export const useStyles = createUseStyles({
  chatContainer: {
    marginBottom: '20vh',
    padding: 40,
    height: '40vh'
  },
  chatItemContainer: {},
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
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(initialState);

  const fetchFlow = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/mzronek/task/main/flow.json'
    );
    if (response.status === 200) {
      const flow = await response.json();
      setState({
        ...state,
        flow,
        isLoading: false
      });
    } else {
      setState({
        ...state,
        isLoading: false,
        error: true
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

    targetItem.value = value;
    targetItem.text = text;
    setState({
      ...state,
      answers: [...answers, { id: nextId }]
    });
  };

  const handleSendResult = async () => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.answers)
    };
    const response = await fetch(
      'https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation',
      options
    );
    if (response.status === 204) {
      console.log('Success');
    } else {
      console.log('Error: ', response);
    }
    setState({
      ...state,
      answers: []
    });
  };

  const getChatItems = () => {
    const { flow, answers } = state;
    return answers.map((answer, index) => {
      const flowItem = flow.find((item) => item.id === answer.id);

      return (
        <ChatItem
          key={index}
          flowItem={flowItem}
          answer={answer}
          handleUserInput={handleUserInput}
          handleSendResult={handleSendResult}
        />
      );
    });
  };

  React.useEffect(() => {
    fetchFlow();
  }, []);

  return state.error ? (
    <div>ERROR</div>
  ) : state.isLoading ? (
    <div>Loading...</div>
  ) : (
    <Container maxWidth={'sm'}>
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
