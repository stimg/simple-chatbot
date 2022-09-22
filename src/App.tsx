import React from 'react';

export type ValueOption = {
  nextId: number;
  value: boolean;
  text: string;
}

export type FlowItem = {
  id: number;
  name: string;
  text: string;
  uiType: string;
  valueType: boolean;
  valueOptions: ValueOption[];
}

interface AppStateProps {
  isLoading: boolean;
  flow: FlowItem[];
  error: boolean;
}

const initialState: AppStateProps = {
  isLoading: true,
  flow: [],
  error: false
}

const App: React.FC = () => {
  const [state, setState] = React.useState(initialState);

  fetch('https://raw.githubusercontent.com/mzronek/task/main/flow.json')
    .then((response) => response.json()
        .then((flow) => setState({
            ...state,
            isLoading: false,
            flow
          })
        ),
      (error) => setState({
        ...state,
        error: true
      }));

  return state.error ? <div>ERROR</div> : state.isLoading ? <div>Loading...</div> : (
    <div>
      {state.flow.map((item) => {
        return (
          <div>
            {item.text}
          </div>
        )
      })}
    </div>
  );
}

export default App;
