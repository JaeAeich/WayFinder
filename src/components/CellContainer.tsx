import {
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import {
  setAlgo,
  setClickOption,
  setPositionSelectOption,
} from '../store/features/click/clickSlice';
import { setEndIndex, setStartIndex } from '../store/features/click/clickSlice';
import { useSelector } from 'react-redux';
import { CellType } from '../logic/GridBlock/GridBlock';
import { RootState } from '../store/store';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import FlagCircleTwoToneIcon from '@mui/icons-material/FlagCircleTwoTone';
import cellInitializer from '../store/data';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import DepthFirstSearch from '../logic/Algorithm/DepthFirstSearch';
// import DFS from '../logic/Algorithm/DFS';

function CellContainer() {
  // const { cells, isLoading } = useSelector(
  //   (state: RootState) => state.cellGrid
  // );
  const initCells: CellType[][] = [];
  const [cells, setCells] = useState<CellType[][]>(initCells);

  const { clickOption, positionSelectOption, algorithm, startIndex, endIndex } =
    useSelector((state: RootState) => state.click);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const setVis = (i: number, j: number) => {
    // Check if the cell is already visible to avoid unnecessary updates
    if (!cells[i][j].isVis) {
      // Create a copy of the cell object before modifying it
      const updatedCells = [...cells]; // Create a shallow copy of the outer array
      updatedCells[i] = [...updatedCells[i]]; // Create a shallow copy of the inner array
      updatedCells[i][j] = { ...updatedCells[i][j], isVis: true }; // Update the property of the cell

      // Update the state with the new 2D array
      setCells(updatedCells);
    }
  };

  const setWall = (i: number, j: number) => {
    // Check if the cell is already visible to avoid unnecessary updates
    if (!cells[i][j].isVis) {
      // Create a copy of the cell object before modifying it
      const updatedCells = [...cells]; // Create a shallow copy of the outer array
      updatedCells[i] = [...updatedCells[i]]; // Create a shallow copy of the inner array
      updatedCells[i][j] = { ...updatedCells[i][j], isWall: true }; // Update the property of the cell

      // Update the state with the new 2D array
      setCells(updatedCells);
    }
  };

  const isValid = (i: number, j: number) => {
    if (
      i >= cells.length ||
      j >= cells[0].length ||
      i < 0 ||
      j < 0 ||
      cells[i][j].isWall ||
      cells[i][j].isVis
    )
      return false;
    return true;
  };

  // State variables to hold height and width of the second div
  const [secondDivHeight, setSecondDivHeight] = useState(0);
  const [secondDivWidth, setSecondDivWidth] = useState(0);

  // useEffect to update state when the content or window size changes
  useEffect(() => {
    const updateSecondDivSize = () => {
      const secondDiv = document.getElementById('grid-container');
      if (secondDiv) {
        setSecondDivHeight(secondDiv.clientHeight);
        setSecondDivWidth(secondDiv.clientWidth);
      }
    };

    // Initial calculation on mount
    updateSecondDivSize();

    const containerWidth = secondDivWidth || 0;
    const containerHeight = secondDivHeight || 0;
    const cellDimension = containerWidth / Math.floor(containerWidth / 24);

    const newCells = cellInitializer(
      Math.floor(cellDimension),
      Math.min(Math.floor(containerWidth / cellDimension), 50),
      Math.floor(containerHeight / cellDimension)
    );
    setCells(newCells);

    // Add event listener to update when window resizes
    window.addEventListener('resize', updateSecondDivSize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateSecondDivSize);
    };
  }, [secondDivHeight, secondDivWidth]);

  useEffect(() => {
    console.log('I was called');
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const cellDimension = containerWidth / Math.floor(containerWidth / 24);

      const newCells = cellInitializer(
        Math.floor(cellDimension),
        Math.min(Math.floor(containerWidth / cellDimension), 50),
        Math.floor(containerHeight / cellDimension)
      );
      setCells(newCells);
    };

    window.addEventListener('resize', handleResize); // Add event listener for window resize

    handleResize(); // Initial resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener on component unmount
    };
  }, []);

  const handleClickToggle = (selectedValue: string) => {
    dispatch(setClickOption(selectedValue[0]));
  };

  const handleSelectOptionToggel = (positionSelectValue: string) => {
    dispatch(setPositionSelectOption(positionSelectValue[0]));
  };

  const handleAlgoChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
    dispatch(setAlgo(event.target.value as string));
  };

  const handleStartClick = async () => {
    if (algorithm === 'DFS') DepthFirstSearch(startIndex, endIndex, setVis, isValid);
  };

  // Handle cell drag, on mouse enter the cell becomes a wall
  const handleCellDrag = (i: number, j: number) => {
    if (
      // Start and end positions can't be walls
      (startIndex[0] !== i || startIndex[1] !== j) &&
      (endIndex[0] !== i || endIndex[0] !== j) &&
      clickOption !== 'no' &&
      clickOption === 'drag'
    )
      setWall(i, j);
  };

  // Handle cell click, on mouse click the cell becomes a wall
  const handleCellClick = (i: number, j: number) => {
    if (
      // Start and end positions can't be walls
      (startIndex[0] !== i || startIndex[1] !== j) &&
      (endIndex[0] !== i || endIndex[0] !== j) &&
      clickOption !== 'no' &&
      clickOption === 'click'
    )
      setWall(i, j);
  };

  // Handle setting of start/end position
  const handledblClick = (i: number, j: number, isWall: boolean) => {
    if (clickOption === 'no') {
      if (isWall) setWall(i, j);
      if (positionSelectOption === 'start') {
        dispatch(setStartIndex([i, j]));
      } else dispatch(setEndIndex([i, j]));
    }
  };

  return (
    <div className="container w-screen h-full grid grid-rows-[auto,1fr]">
      <div className="navbar w-screen ">
        <div className="logo">WayFinder</div>
        <div className="options flex">
          <div className="gridOption flex">
            <div className="click-select">
              <ToggleButtonGroup
                size="small"
                aria-label="Small sizes"
                onChange={(_, newValue) => handleClickToggle(newValue)}
              >
                <ToggleButton
                  color="success"
                  value="click"
                  selected={clickOption == 'click'}
                  aria-label="click"
                >
                  <AdsClickOutlinedIcon fontSize="small"></AdsClickOutlinedIcon>
                </ToggleButton>
                <ToggleButton
                  color="success"
                  value="drag"
                  selected={clickOption == 'drag'}
                >
                  <div className="slot">
                    <MouseOutlinedIcon fontSize="small"></MouseOutlinedIcon>
                  </div>
                </ToggleButton>
                <ToggleButton
                  color="warning"
                  value="no"
                  selected={clickOption == 'no'}
                >
                  <DoNotTouchOutlinedIcon fontSize="small"></DoNotTouchOutlinedIcon>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="position-select">
              <ToggleButtonGroup
                size="small"
                aria-label="Small sizes"
                onChange={(_, newValue) => handleSelectOptionToggel(newValue)}
              >
                <ToggleButton
                  color="primary"
                  value="start"
                  selected={positionSelectOption == 'start'}
                >
                  <DirectionsRunRoundedIcon fontSize="small"></DirectionsRunRoundedIcon>
                </ToggleButton>
                <ToggleButton
                  color="primary"
                  value="end"
                  selected={positionSelectOption == 'end'}
                >
                  <FlagCircleTwoToneIcon fontSize="small"></FlagCircleTwoToneIcon>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div className="algoOption">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={algorithm}
                label="Algorithm"
                onChange={handleAlgoChange}
              >
                <MenuItem value="BFS">BFS</MenuItem>
                <MenuItem value="DFS">DFS</MenuItem>
                <MenuItem value="DJIKS">DJIKSTRA</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button variant="outlined" onClick={handleStartClick}>
            Start
          </Button>
        </div>
      </div>
      <div
        className="grid-container flex justify-center items-center"
        id="grid-container"
      >
        <div>
          {cells.map((cellRow: CellType[]) => (
            <div key={cellRow[0].i}>
              <div className="row flex justify-center items-center">
                {cellRow.map((cell) => (
                  <div className="flex w-6 h-6" key={`${cell.i}-${cell.j}`}>
                    <div
                      className={`cell w-6 h-6 transition-colors ${
                        cell.isWall ? 'bg-red-400' : ''
                      } ${
                        cell.isVis ? 'bg-blue-400' : 'bg-gray-200'
                      } border-2 border-white active:bg-red-200`}
                      onMouseEnter={() => handleCellDrag(cell.i, cell.j)}
                      onTouchMove={() => handleCellDrag(cell.i, cell.j)}
                      onTouchStart={() => handleCellDrag(cell.i, cell.j)}
                      onTouchEnd={() => handleCellDrag(cell.i, cell.j)}
                      onClick={() => handleCellClick(cell.i, cell.j)}
                      onDoubleClick={() =>
                        handledblClick(cell.i, cell.j, cell.isWall)
                      }
                      onTouchStartCapture={() =>
                        handledblClick(cell.i, cell.j, cell.isWall)
                      }
                    >
                      {startIndex[0] === cell.i && startIndex[1] === cell.j && (
                        <DirectionsRunRoundedIcon />
                      )}
                      {endIndex[0] === cell.i && endIndex[1] === cell.j && (
                        <FlagCircleTwoToneIcon />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CellContainer;
