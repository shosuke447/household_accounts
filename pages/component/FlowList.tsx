import React, { useEffect, useState, FC } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Select, MenuItem } from "@mui/material";

type FlowListProps = {
  setExpenditure: Function
}

function createData(
  id: string,
  date: string,
  purchase: string,
  category: string,
  price: number
){
  return {id, date, purchase, category, price};
}

const FlowList: FC<FlowListProps> = ({setExpenditure}) => {
  const columns = [
    {title: '日付', field:'date'},
    {title: '用途', field:'purchase'},
    {title: 'カテゴリ', field:'category'},
    {title: '金額', field:'price'}
  ]
  const [data, setData] = useState([createData('', '','', '', Number())]);
  const [date, setDate] = useState('');
  const [purchase, setPurchase] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const addList = () => {
    if(!validateFlowList()){
      return;
    }
    setData([ createData(String(Math.random()), date, purchase, category, Number(price)), ...data]);
    postFlowItem(date, purchase, category, Number(price));
    setDate('');
    setPurchase('');
    setCategory('');
    setPrice('');
  }

  const validateFlowList = () => {
    const regex = /\d{4}\/\d{1,2}\/\d{1,2}/;
    if(!regex.test(date)){
      return false;
    }
    if(purchase.length<1){
      return false;
    }
    if(category.length<1){
      return false;
    }
    if(Number.isNaN(price)){
      return false;
    }
    return true;
  }

  const deleteList = (id: string) => {
    const newList = data.filter((item) => {
      return id !== item.id;
    });
    deleteFlowItem(id);
    setData(newList);
  }

  useEffect(() => {
    var expenditure = 0;
    data.map((e) => {
      expenditure += e.price;
    });
    setExpenditure(expenditure);
  })

  useEffect(() => {
    getFlowList().then((resultFlowList) => {
      const flowList = resultFlowList.data;
      setData(flowList)
    })
  }, [])

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

  async function postFlowItem(date :string, purchase :string, category :string, price :number) {
    const contentType = "application/json"
    console.log(date)
    try {
      const body = {
        user_id: 'fox',
        date: date,
        purchase: purchase,
        category: category,
        price: price
      }
      const response = await fetch("/api/flowListApi/", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(body),
      })

      const jsonResponse = await response.json()

      console.log(jsonResponse)

      return jsonResponse.data
    } catch (error) {
      throw new Error('登録できませんでした')
    }
  }

  async function deleteFlowItem(id: string) {
    try {
      await fetch(`/api/flowListApi/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      throw new Error('削除できませんでした')
    }
  }

  return(
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2>支出項目リスト</h2>
      <TableContainer component={Paper} >
      <Table stickyHeader sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((e, i) => (
              <TableCell align="center" key={i}>{e.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center"><input style={{width: '80%'}} value={date} onChange={(e)=>setDate(e.target.value)} type="text" ></input></TableCell>
            <TableCell align="center"><input style={{width: '80%'}} value={purchase} onChange={(e)=>setPurchase(e.target.value)}></input></TableCell>
            <TableCell align="center">
              <Select sx={{minWidth: 120, fontSize: 14}} size="small" value={category} onChange={(e)=>setCategory(e.target.value)}>
                <MenuItem value={'食費'}>食費</MenuItem>
                <MenuItem value={'日用品費'}>日用品費</MenuItem>
                <MenuItem value={'通信費'}>通信費</MenuItem>
                <MenuItem value={'水道光熱費'}>水道光熱費</MenuItem>
                <MenuItem value={'保険料'}>保険料</MenuItem>
                <MenuItem value={'交際費'}>交際費</MenuItem>
                <MenuItem value={'医療費'}>医療費</MenuItem>
                <MenuItem value={'交通費'}>交通費</MenuItem>
                <MenuItem value={'その他'}>その他</MenuItem>
              </Select>
            </TableCell>
            <TableCell align="center"><input style={{width: '80%'}} value={price} onChange={(e)=>setPrice(e.target.value)} type="text"></input></TableCell>
            <TableCell><Button variant="contained" onClick={addList}>追加</Button></TableCell>
          </TableRow>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.date}
              </TableCell>
              <TableCell align="center">{row.purchase}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell><Button variant="contained" color="error" onClick={() => deleteList(row.id)}>削除</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default FlowList;