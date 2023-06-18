import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import FlagCircleTwoToneIcon from '@mui/icons-material/FlagCircleTwoTone';
import { CellType } from '../logic/GridBlock/GridBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setWall } from '../store/features/cell/cellSlice';
import { RootState } from '../store/store';
import { setEndIndex, setStartIndex } from '../store/features/click/clickSlice';

function Cell(props: CellType) {
  // Get the cordinates of the cell
  const { i, j } = props;
  const dispatch = useDispatch();

  // Get the isWall property of this cell from store
  const { isWall } = useSelector(
    (state: RootState) => state.cellGrid.cells[i][j]
  );

  const { clickOption, positionSelectOption, startIndex, endIndex } =
    useSelector((state: RootState) => state.click);

  // Handle cell drag, on mouse enter the cell becomes a wall
  const handleCellDrag = () => {
    if (
      // Start and end positions can't be walls
      startIndex[0] !== i &&
      startIndex[1] !== j &&
      endIndex[0] !== i &&
      endIndex[0] !== j &&
      clickOption !== 'no' &&
      clickOption === 'drag'
    )
      dispatch(setWall({ i, j }));
  };

  // Handle cell click, on mouse click the cell becomes a wall
  const handleCellClick = () => {
    if (
      // Start and end positions can't be walls
      startIndex[0] !== i &&
      startIndex[1] !== j &&
      endIndex[0] !== i &&
      endIndex[0] !== j &&
      clickOption !== 'no' &&
      clickOption === 'click'
    )
      dispatch(setWall({ i, j }));
  };

  // Handle setting of start/end position
  const handledblClick = () => {
    if (isWall) dispatch(setWall({ i, j }));
    if (positionSelectOption === 'start') {
      dispatch(setStartIndex([i, j]));
    } else dispatch(setEndIndex([i, j]));
  };

  return (
    <div
      className={`cell w-6 h-6 ${
        isWall ? 'bg-red-400' : 'bg-gray-200'
      } border-2 border-white active:bg-red-200`}
      onMouseEnter={() => handleCellDrag()}
      onTouchMove={() => handleCellDrag()}
      onTouchStart={() => handleCellDrag()}
      onTouchEnd={() => handleCellDrag()}
      onClick={() => handleCellClick()}
      onDoubleClick={() => handledblClick()}
    >
      {startIndex[0] === i && startIndex[1] === j && (
        <DirectionsRunRoundedIcon />
      )}
      {endIndex[0] === i && endIndex[1] === j && <FlagCircleTwoToneIcon />}
    </div>
  );
}

export default Cell;
