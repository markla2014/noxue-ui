import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/Layout';

class Index extends React.Component {

  render() {
    return (
      <Layout title="首页">
        <div style={{ margin: "20px auto" }}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={16}>
            <Grid item md={6} xs={12}>
              <Paper style={{ padding: "10px" }}>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
              </Paper>
            </Grid>
            <Grid item md={3} xs={12}>
              <Paper style={{ padding: "10px" }}>
              <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
                <p>测试内容测试内容测试内容</p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Layout>
    )
  }
}
export default Index
