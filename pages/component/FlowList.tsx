import { useEffect, useState, FC } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((e, i) => (
              <TableCell align="right" key={i}>{e.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.purchase}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default FlowList;