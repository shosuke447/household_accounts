import React, { useEffect, useState, FC } from "react";
import {PieChart, Pie, Text} from 'recharts';
import { getEnvironmentData } from "worker_threads";

type graphProps = {
  expenditure: number
}

type flowListContent = {
  id: string,
  date: string,
  purchase: string,
  category: string,
  price: number
}

const Graph: FC<graphProps> = ({expenditure}) => {
  const [pieData, setPieData] = useState([{
    id: '',
    date: '',
    purchase: '',
    category: '',
    price: 0
  }]);
  const [data, setData] = useState([{
    category: '',
    price: 0
  }]);

  
  useEffect(()=>{
    async function getFlowList () {
      try{
        const response = await fetch(`/api/flowListApi/`, {
          method: "GET",
        })
        return await response.json()
      }catch(error) {
        throw error
      }
    }
    
    async function getData() {
      const gotFlowList = await getFlowList()
      setPieData(gotFlowList.data);
      const tmp:any = [];
      pieData.map((e) => {
        if(e.category.length>0){
          tmp.push({category: e.category, price: e.price});
        }
      })
      setData(tmp);
    }
    
    getData();
  }, [expenditure]);
  
  console.log(data);
  console.log(pieData);

  type labelProps = {name:string,value:number,cx: any,x:any,y:any};

  const label:FC<labelProps> = ({name, value, cx, x, y}) => {
    return(
      <Text x={x} y={y}>{name}</Text>
    )
  }

  return(
    <div>
      <PieChart width={700} height={300}>
        <Pie data={data} dataKey="price" nameKey="category" label={label} />
      </PieChart>
    </div>
  );
}

export default Graph;