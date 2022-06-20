import BOPMonth from './component/BOPMonth'
import FlowList from './component/FlowList';

export default function App(){
  return(
    <main style={{display: 'flex', justifyContent: 'center', backgroundColor: '#ffe1bd'}}>
      <BOPMonth />
      <FlowList />
    </main>
  );
}