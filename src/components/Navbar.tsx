import { useSelector, useDispatch } from 'react-redux';
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
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import FlagCircleTwoToneIcon from '@mui/icons-material/FlagCircleTwoTone';
import { RootState } from '../store/store';
import {
  setAlgo,
  setClickOption,
  setPositionSelectOption,
} from '../store/features/click/clickSlice';
import DFS from '../logic/Algorithm/DFS';

function Navbar() {
  const dispatch = useDispatch();
  const { clickOption, positionSelectOption, algorithm, startIndex, endIndex } =
    useSelector((state: RootState) => state.click);
  const { cells } = useSelector((state: RootState) => state.cellGrid);

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
    //implement DFS from startIndex to endIndex
    await DFS({ cells, startIndex, endIndex, dispatch });
  };

  return (
    <div className="navbar w-full h-full">
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
  );
}

export default Navbar;
