import { CellType } from '../logic/GridBlock/GridBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setWall } from '../store/features/cell/cellSlice';
import { RootState } from '../store/store';

function Cell(props: CellType) {
  // Get the cordinates of the cell
  const { i, j } = props;
  const dispatch = useDispatch();

  // Get the isWall property of this cell from store
  const { isWall } = useSelector(
    (state: RootState) => state.cellGrid.cells[i][j]
  );

  const { clickOption } = useSelector((state: RootState) => state.click);

  // Handle cell drag, on mouse enter the cell becomes a wall
  const handleCellDrag = () => {
    if (clickOption !== 'no' && clickOption === 'drag')
      dispatch(setWall({ i, j }));
  };

  // Handle cell click, on mouse click the cell becomes a wall
  const handleCellClick = () => {
    if (clickOption !== 'no' && clickOption === 'click')
      dispatch(setWall({ i, j }));
  };

  return (
    <div
      className={`cell w-6 h-6 ${
        isWall ? 'bg-red-400' : 'bg-gray-200'
      } border-2 border-white active:bg-red-200`}
      onMouseEnter={() => handleCellDrag()}
      onClick={() => handleCellClick()}
    ></div>
  );
}

export default Cell;
