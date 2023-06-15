import { CellType } from '../logic/GridBlock/GridBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setWall } from '../store/features/cell/cellSlice';
import { RootState } from '../store/store';
// import { useEffect, useState } from 'react';

function Cell(props: CellType) {
  //   const [cellWall, setCellWall] = useState(false);

  // Get the cordinates of the cell
  const { i, j } = props;
  const dispatch = useDispatch();

  // Get the isWall property of this cell from store
  const { isWall } = useSelector(
    (state: RootState) => state.cellGrid.cells[i][j]
  );

  // Change the isWall property of this cell
  const handleSetWall = () => {
    console.log('handler called');
    dispatch(setWall({ i, j }));
    console.log('isWall here is: ', isWall);
  };

  return (
    <div
      className={`cell w-6 h-6 ${
        isWall ? 'bg-red-400' : 'bg-gray-200'
      } border-2 border-white active:bg-red-200`}
      onMouseEnter={() => handleSetWall()}
    ></div>
  );
}

export default Cell;
