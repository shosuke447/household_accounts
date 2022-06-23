import { FC } from "react";

type BOPProps = {
  income: number,
  expenditure: number
}

const BOPMonth: FC<BOPProps> = ({income, expenditure}) => {
  const bop :number= income - expenditure;
  var bopColor = 'black';
  if(bop<0){
    bopColor = 'crimson';
  }else if(bop>0){
    bopColor = 'lightseagreen';
  }

  return(
    <div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.8em', border: 'thick double maroon', backgroundColor: 'white' /*, backgroundColor: '#ffffff40'*/}}>
      <div>
        <h2>今月の収支</h2>
        <div style={{textAlign: 'center'}}><span style={{fontSize: '2em', color: bopColor}}>{bop}</span>円</div>
      </div>
      <div style={{width: '100%',display: 'flex', justifyContent: 'space-around'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h3 style={{paddingRight: '1ex'}}>予算</h3>
          <div style={{textAlign: 'center', marginBottom: '1.8em'}}><span style={{fontSize: '2em'}}>{income}</span>円</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h3 style={{paddingRight: '1ex'}}>支出</h3>
          <div style={{textAlign: 'center', marginBottom: '1.8em'}}><span style={{fontSize: '2em'}}>{expenditure}</span>円</div>
        </div>
      </div>
    </div>
  );
}

export default BOPMonth;