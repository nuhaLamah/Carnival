
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin:'0px 300px',
    direction:'rtl'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    direction:'rtl',
  },
  
  buttonSubmit: {
    marginBottom: 10,
  },
}));