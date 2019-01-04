import Link from 'next/link'
import Head from 'next/head'
import Header from "./Header"
import CssBaseline from '@material-ui/core/CssBaseline';
import "./common.scss"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import Footer from './Footer';
import theme from './theme'

export default ({ children, title = '不学网', keywords = "不学网", description = "不学网" }) => (
  <React.Fragment>
    <CssBaseline />
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
    </Head>

    <MuiThemeProvider theme={theme}>
      <Header isLogin={false}/>
      {children}
      <Footer />
    </MuiThemeProvider>

  </React.Fragment>
)
