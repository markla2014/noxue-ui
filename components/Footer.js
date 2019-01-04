import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer:{
    // backgroundColor:theme.,
    width:"100%",
    minHeight:"200px",
    textAlign:"center"
  }
})

class Footer extends React.Component {
  render(){
    const { classes } = this.props;
    return (
      <footer color="primary" className={classes.footer}>
        &copy;不学网
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
