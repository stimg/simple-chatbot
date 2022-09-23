export type OptionValue = boolean | string | number;

export type ValueOption = {
  nextId: number | boolean;
  value: OptionValue;
  text: string;
};

export type FlowItem = {
  id: number;
  name: string;
  text: string;
  uiType: string;
  valueType: OptionValue;
  valueOptions: ValueOption[];
};

export type Answer = {
  id: number | boolean;
  text?: string;
  value?: OptionValue;
};
