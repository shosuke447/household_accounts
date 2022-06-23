import React, { useEffect, useState, FC } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

type FlowListProps = {
  setExpenditure: Function
}

function createData(
  id: number,
  date: number,
  purchase: string,
  category: string,
  price: number
){
  const idString: string = String(id);
  return {id, date, purchase, category, price};
}

const FlowList: FC<FlowListProps> = ({setExpenditure}) => {
  const columns = [
    {title: '日付', field:'date'},
    {title: '用途', field:'purchase'},
    {title: 'カテゴリ', field:'category'},
    {title: '金額', field:'price'}
  ]
  const [data, setdata] = useState([createData(1, 1, 'チョコレート', '食料品', 150), createData(2, 1, 'アイス', '食料品', 90)]);
  const [date, setdate] = useState('');
  const [purchase, setPurchase] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const addList = () => {
    if(Number.isNaN(date)||Number.isNaN(price)){
      return;
    }
    setdata([ createData(Math.random(), Number(date), purchase, category, Number(price)), ...data])
    setdate('');
    setPurchase('');
    setCategory('');
    setPrice('');
  }

  useEffect(() => {
    var expenditure = 0;
    data.map((e) => {
      expenditure += e.price;
    });
    setExpenditure(expenditure);
  })

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
            <TableCell align="center"><input style={{width: '80%'}} value={date} onChange={(e)=>setdate(e.target.value)} type="text" ></input></TableCell>
            <TableCell align="center"><input style={{width: '80%'}} value={purchase} onChange={(e)=>setPurchase(e.target.value)}></input></TableCell>
            <TableCell align="center"><input style={{width: '80%'}} value={category} onChange={(e)=>setCategory(e.target.value)}></input></TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default FlowList;