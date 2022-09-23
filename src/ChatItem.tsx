import { Box, Button } from '@mui/material';
import React from 'react';
import { useStyles } from './App';
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
}

const thanksText = 'Herzlichen Dank für Ihre Angaben!';

export const ChatItem: React.FC<IChatItemsProps> = ({
  flowItem,
  answer,
  handleUserInput,
  handleSendResult
}) => {
  const classes = useStyles();
  const getControls = () => {
    if (!flowItem) return;

    return flowItem.valueOptions.map((option) => {
      if (flowItem.uiType === 'button') {
        return (
          <Button
            variant={'contained'}
            sx={{ marginRight: '10px', marginTop: '10px', padding: '3px' }}
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

  const getChatItem = () => (
    <Box
      component={'div'}
      className={classes.chatItemContainer}
    >
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
        {answer.text || getControls()}
      </Box>
    </Box>
  );

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
