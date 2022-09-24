import { Box, Button } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';
import { Answer, FlowItem, OptionValue } from './types';

interface IChatItemsProps {
  flowItem?: FlowItem;
  answer: Answer;
  handleUserInput: (
    id: number,
    nextId: number | boolean,
    value: OptionValue,
    text: string
  ) => void;
  handleSendResult: () => Promise<void>;
  handleReset: () => void;
}

const thanksText = 'Herzlichen Dank für Ihre Angaben!';

export const ChatItem: React.FC<IChatItemsProps> = ({
  flowItem,
  answer,
  handleUserInput,
  handleSendResult,
  handleReset
}) => {
  const classes = useStyles();
  const getControls = () => {
    // If we have false flow item id (the end of the conversation)
    if (!flowItem) return;

    // Render possible input controls for the user
    return flowItem.valueOptions.map((option) => {
      if (flowItem.uiType === 'button') {
        return (
          <Button
            variant={'contained'}
            sx={{
              marginRight: '10px',
              marginTop: '10px',
              paddingTop: '3px',
              paddingBottom: '3px'
            }}
            key={option.text}
            onClick={() =>
              handleUserInput(
                flowItem.id,
                option.nextId,
                option.value,
                option.text
              )
            }
          >
            {option.text}
          </Button>
        );
      } else {
        // Other control types
        return null;
      }
    });
  };

  // Render question with the answer or the input controls
  const getChatItem = () => (
    <Box component={'div'}>
      <Box
        component={'div'}
        className={classes.question}
      >
        {flowItem?.text}
      </Box>
      <Box
        component={'div'}
        className={classes.answer}
      >
        {
          // Render answer, if given,
          // or controls, if not answered yet
          answer.text || getControls()
        }
      </Box>
    </Box>
  );

  // End of chat, final thanks and send button
  const thanksAndSend = (
    <React.Fragment key={'956382a3-b6f7-4159-985e-71c0b24bca49'}>
      <Box
        component={'div'}
        className={classes.thanks}
      >
        {thanksText}
      </Box>
      <div>
        <Button
          variant={'outlined'}
          onClick={handleReset}
          sx={{ marginRight: '10px' }}
        >
          Zurücksetzen
        </Button>
        <Button
          variant={'contained'}
          onClick={handleSendResult}
        >
          Absenden
        </Button>
      </div>
    </React.Fragment>
  );
  return flowItem ? getChatItem() : thanksAndSend;
};
