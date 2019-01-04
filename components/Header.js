import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Link from 'next/link'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {

  }
};

class Header extends React.Component {
  state = {
    leftDrawerOpen: false,
    rightDrawerOpen: false,
  }
  toggleDrawer = (type, open) => () => {
    this.setState({ [type]: open });
  };

  render() {
    const { classes, isLogin } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("leftDrawerOpen", true)} >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              不学网
          </Typography>



            {
              isLogin ?
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer("rightDrawerOpen", true)}
                >
                  <AccountCircle />
                </IconButton>
                :
                <div>
                  <Link href="/user/register">
                    <Button color="inherit">注册</Button>
                  </Link>
                  <Link href="/user/login">
                    <Button color="inherit">登陆</Button>
                  </Link>
                </div>
            }
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.leftDrawerOpen} onClose={this.toggleDrawer("leftDrawerOpen", false)} className={classes.leftDrawer}>
          <div
            tabIndex={0}
            onClick={this.toggleDrawer("leftDrawerOpen", false)}
            onKeyDown={this.toggleDrawer("leftDrawerOpen", false)}
          >
            <List>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="首页" />
              </ListItem>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="文章" />
              </ListItem>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="教程" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="关于我们" />
              </ListItem>
            </List>
          </div>
        </Drawer>

        <Drawer
          anchor="right"
          open={this.state.rightDrawerOpen}
          onClose={this.toggleDrawer("rightDrawerOpen", false)}
          className={classes.rightDrawer}>
          <div
            tabIndex={0}
            onClick={this.toggleDrawer("rightDrawerOpen", false)}
          >
            <List>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="个人中心" />
              </ListItem>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="修改资料" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <InboxIcon />
                <ListItemText primary="退出" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
