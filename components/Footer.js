import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  footer:{
    backgroundColor:"#ddd",
    width:"100%",
    minHeight:"200px"
  }
})

class Footer extends React.Component {

  render(){
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>

      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
