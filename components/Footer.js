import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer:{
    backgroundColor:"#fff",
    width:"100%",
    minHeight:"150px",
    padding:"20px",
    textAlign:"center"
  }
})

class Footer extends React.Component {
  render(){
    const { classes } = this.props;
    return (
      <footer color="primary" className={classes.footer}>
        &copy;不学网<br/>项目源代码地址 <a href="//github.com/noxue/noxue" target="new">github.com/noxue/noxue</a><br/>
        欢迎有兴趣的一起加入我们的项目
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
