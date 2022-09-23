import React from 'react';
import { Answer, FlowItem } from './types';

interface IChatItemsProps {
  flowItem: FlowItem;
  answer: Answer;
  handleUserInput: (
    id: number,
    nextId: number | boolean,
    value: boolean
  ) => void;
}

export const ChatItems: React.FC<IChatItemsProps> = ({
  flowItem,
  answer,
  handleUserInput
}) => {
  return <></>;
};
