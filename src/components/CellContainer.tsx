import { useSelector } from 'react-redux';
import { CellType } from '../logic/GridBlock/GridBlock';
import { RootState } from '../store/store';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resizeCellGrid } from '../store/features/cell/cellSlice';
import Cell from './Cell';

function CellContainer() {
  const { cells, isLoading } = useSelector(
    (state: RootState) => state.cellGrid
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;
    const cellDimension = containerWidth / Math.floor(containerWidth / 24);
    // Use the containerWidth for any further calculations or updates
    dispatch(
      resizeCellGrid({
        dimension: Math.floor(cellDimension),
        rowNum: Math.floor(containerWidth / cellDimension),
        colNum: Math.floor(containerHeight / cellDimension),
      })
    );
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container w-full h-full" ref={containerRef}>
      {cells.map((cellRow: CellType[]) => (
        <div key={cellRow[0].i}>
          <div className="row flex justify-center items-center">
            {cellRow.map((cell) => (
              <div className="flex w-6 h-6" key={`${cell.i}-${cell.j}`}>
                <Cell
                  dimension={cell.dimension}
                  i={cell.i}
                  j={cell.j}
                  isWall={cell.isWall}
                  isVis={cell.isVis}
                ></Cell>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CellContainer;
