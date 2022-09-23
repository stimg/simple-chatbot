import React from 'react';
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
  const getControls = () => {
    if (!flowItem) return;

    return flowItem.valueOptions.map((option) => {
      if (flowItem.uiType === 'button') {
        return (
          <button
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
          </button>
        );
      } else {
        // Other control types
        return null;
      }
    });
  };

  const getChatItem = () => (
    <>
      <div>{flowItem?.text}</div>
      <div>{answer.text || getControls()}</div>
    </>
  );

  const thanksAndSend = (
    <React.Fragment key={'956382a3-b6f7-4159-985e-71c0b24bca49'}>
      <div>{thanksText}</div>
      <div>
        <button onClick={handleSendResult}>Absenden</button>
      </div>
    </React.Fragment>
  );
  return flowItem ? getChatItem() : thanksAndSend;
};
