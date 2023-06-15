import { useSelector } from 'react-redux';
import { CellType } from '../logic/GridBlock/GridBlock';
import { RootState } from '../store/store';

function CellContainer() {
  const { cells } = useSelector((state: RootState) => state.cellGrid);
  console.log(cells);

  return (
    <div>
      {cells.map((cellRow: CellType[]) => (
        <div key={cellRow[0].i}>
          <div className="row" style={{ display: 'flex' }}>
            {cellRow.map((cell) => (
              <div key={`${cell.i}-${cell.j}`}>cell</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CellContainer;
