import BOPMonth from './component/BOPMonth'
import FlowList from './component/FlowList';
import { useState } from 'react';
import Graph from './component/Graph';

export default function App(){
  const [income, setIncome] = useState<number>(1000);
  const [expenditure, setExpenditure] = useState<number>(0);

  const updateExpenditure = (num: number) => {
    setExpenditure(num);
  };

  return(
    <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffe1bd'}}>
      <BOPMonth income={income} expenditure={expenditure} />
      <FlowList setExpenditure={updateExpenditure} />
      <Graph expenditure={expenditure} />
    </main>
  );
}