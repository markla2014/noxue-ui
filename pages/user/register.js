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
import { GetCaptcha, GetCode, UserReg } from '../../api/user'
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

class Register extends React.Component {

  state = {
    open: false, // 图片验证码输入界面是否显示
    data: "", // 收到的图片验证码图片base64加密后的值，用于显示图片验证码
    captcha_id: "", // 图片验证码的唯一标志
    captcha_code: "", // 用户输入的图片验证码
    nick: "",  // 用户昵称
    name: "", // 用户名，这里是邮箱或手机号
    secret: "", // 用户密码
    secretConfirm: "", // 重复输入的确认密码
    id: "", // 邮箱或手机验证码的唯一标志
    code: "", // 邮箱或手机验证码
    time:0, // 当点击获取验证码之后，用于记录还有多久能获取验证码 
  }

  getCaptcha = () => {
    if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.state.name)
      && !(/^1(3|4|5|7|8)\d{9}$/.test(this.state.name))) {
      alert("请输入正确的邮箱或手机号")
      return
    }
    GetCaptcha().then(res => {
      console.log(res)
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

  handleSendCode = () => {

    GetCode(this.state.captcha_id, this.state.captcha_code, this.state.name).then(res => {
      this.setState({ id: res.id, open: false,time:60 })
      var that = this
      var t = setInterval(function(){
        that.setState({time:that.state.time-1})
        if (that.state.time==0){
          clearInterval(t)
        }
      },1000)
      alert("验证码发送成功，请注意查收，若是邮箱注册没收到邮件，请尝试手机注册")

    }).catch(e => {
      this.getCaptcha()
    })
  }

  handleReg = () => {
    if (this.state.secret != this.state.secretConfirm) {
      alert("两次密码不一致，请确认")
      return
    }
    UserReg(this.state.nick, this.state.name, this.state.secret, this.state.id, this.state.code).then(res => {
      Router.push("/user/login")
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
  changeSecretConfirm = (e) => {
    this.setState({ secretConfirm: e.target.value })
  }


  render() {
    const { classes } = this.props

    return (
      <NoSsr>
        <Layout title="用户注册">
          <Card style={{ width: "400px", margin: "50px auto" }}>
            <CardHeader title="不学网用户注册" className={classes.header} />
            <CardContent>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item sm={10} xs={10} md={10} lg={10} xl={10}>
                  <TextField fullWidth onChange={this.changeNick} label="用户昵称" />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item sm={7} xs={7} md={7} lg={7} xl={7}>
                  <TextField fullWidth onChange={this.changeName} label="邮箱或手机号" />
                </Grid>
                <Grid item>
                  <Button size="small" variant="contained" color="secondary" disabled={this.state.time>0} onClick={this.handleClickOpen}>获取验证码{this.state.time>0?"("+this.state.time+")":""}</Button>
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item sm={10} xs={10} md={10} lg={10} xl={10}>
                  <TextField fullWidth onChange={this.changeCode} label="邮箱或手机收到的验证码" />
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
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item sm={10} xs={10} md={10} lg={10} xl={10}>
                  <TextField fullWidth type="password" onChange={this.changeSecretConfirm} label="确认密码" />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={this.handleReg}>注册</Button>
              <div>
                <Link href="/user/login">
                  <Button color="secondary">已有账号？点击登陆</Button>
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
              <Button onClick={this.handleSendCode} variant="contained" color="primary">
                确认
            </Button>
            </DialogActions>
          </Dialog>
        </Layout>
      </NoSsr>
    );
  }

}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);