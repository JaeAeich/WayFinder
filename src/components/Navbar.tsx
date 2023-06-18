import { useSelector, useDispatch } from 'react-redux';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';
import { RootState } from '../store/store';
import { setClickOption } from '../store/features/click/clickSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { clickOption } = useSelector((state: RootState) => state.click);

  const handleClickToggle = (selectedValue: string) => {
    dispatch(setClickOption(selectedValue[0]));
  };

  return (
    <div className="navbar w-full h-full">
      <div className="logo">WayFinder</div>
      <div className="options">
        <div className="gridOption">
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
        <div className="algoOption"></div>
      </div>
    </div>
  );
}

export default Navbar;
