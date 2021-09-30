import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const Slider1 = createMuiTheme({
  overrides:{
    MuiSlider: {
    thumb:{
        color:"#FE8F8F"
    },
    track: {
        height: 5,
        borderRadius: 2,
    },
    rail:{
        height: 5,
        borderRadius: 2,
    },
    mark:{
        height: 5,
        borderRadius: 2,
    },
      markLabel:{
          color: 'white'
      },
      markLabelActive:{
          color: 'white'
      }
    }
}
});


export {Slider1}