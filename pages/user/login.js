import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock'
import Layout from '../../components/Layout';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GetCaptcha, UserLogin } from '../../api/user'
import NoSsr from '@material-ui/core/NoSsr';
import Link from 'next/link'
import Router from 'next/router'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  header: {
    backgroundColor: theme.palette.common.primary,
  }
});

class Login extends React.Component {

  state = {
    open: false, // 图片验证码输入界面是否显示
    data: "", // 收到的图片验证码图片base64加密后的值，用于显示图片验证码
    captcha_id: "", // 图片验证码的唯一标志
    captcha_code: "", // 用户输入的图片验证码
    name: "", // 用户名，这里是邮箱或手机号
    secret: "", // 用户密码
  }

  getCaptcha = () => {
    if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.state.name)
      && !(/^1(3|4|5|7|8)\d{9}$/.test(this.state.name))) {
      alert("请输入正确的邮箱或手机号")
      return
    }
    GetCaptcha().then(res => {
      this.setState({ data: res.data, captcha_id: res.id, captcha_code: "" })
      this.setState({ open: true });
    })
  }

  handleClickOpen = () => {
    if (this.state.name == "") {
      alert("请先输入邮箱或手机号")
      return
    }
    this.getCaptcha()
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleLogin = () => {
    UserLogin(this.state.name, this.state.secret, this.state.captcha_id, this.state.captcha_code).then(res => {
      console.log(res)
      localStorage.setItem("user", JSON.stringify(res))
      Router.push("/")
    }).catch(err => {
      this.getCaptcha()
    })
  }

  changeCaptcha = (e) => {
    this.setState({ captcha_code: e.target.value })
  }
  changeNick = (e) => {
    this.setState({ nick: e.target.value })
  }
  changeName = (e) => {
    this.setState({ name: e.target.value })
  }
  changeCode = (e) => {
    this.setState({ code: e.target.value })
  }
  changeSecret = (e) => {
    this.setState({ secret: e.target.value })
  }


  render() {
    const { classes } = this.props

    return (
      <NoSsr>
        <Layout title="用户登陆">
          <Card style={{ width: "400px", margin: "50px auto" }}>
            <CardHeader title="不学网用户登陆" className={classes.header} />
            <CardContent>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item sm={10} xs={10} md={10} lg={10} xl={10}>
                  <TextField fullWidth onChange={this.changeName} label="邮箱或手机号" />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item sm={10} xs={10} md={10} lg={10} xl={10}>
                  <TextField fullWidth type="password" onChange={this.changeSecret} label="密码" />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" color="primary" onClick={this.handleClickOpen}>登陆</Button>
              <div>
                <Link href="/user/register">
                  <Button color="secondary">没有账号？点击注册</Button>
                </Link>
              </div>
            </CardActions>
          </Card>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">点击图片刷新验证码</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <img onClick={this.getCaptcha} style={{ cursor: "pointer" }} src={this.state.data} />
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="code"
                label="验证码"
                type="text"
                fullWidth
                value={this.state.captcha_code}
                onChange={this.changeCaptcha}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                取消
            </Button>
              <Button onClick={this.handleLogin} variant="contained" color="primary">
                确认
            </Button>
            </DialogActions>
          </Dialog>
        </Layout>
      </NoSsr>
    );
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);