import React, { useState, useEffect } from 'react';
import { axios } from "axios";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';


function Home() {
  return (
    <h5>Welcome to our Home page.</h5>
  );
}

const PostDetail = (props) => {

  console.log('----------------');
  console.log(props);
  console.log('----------------');
  return (
    <>
      <h4>Title: {props.post.title}</h4>
      <h6>Images: {props.post.images}</h6>
      <h6>Em-Test: {props.post.emtest}</h6>
      <h6>Article: {props.post.articleText}</h6>
      <br></br>
    </>
  )
};

const Posts = () => {

  // let [posts, usePosts] = useState([{
  //   id: '1',
  //   title: "Hello 1",
  //   images: "images 1",
  //   emtest: "Em Test value 1",
  //   articleText: "Article Text value 1",
  // },{
  //   id: '2',
  //   title: "Hello 2",
  //   images: "images 2",
  //   emtest: "Em Test value",
  //   articleText: "Article Text value",
  // },{
  //   id: '3',
  //   title: "Hello 3",
  //   images: "images 3",
  //   emtest: "Em Test value",
  //   articleText: "Article Text value",
  // }])

  let [posts, usePosts] = useState()

  useEffect(async () => {
    const result = await axios(
      'http://127.0.0.1:5000/api/posts',
    );

    console.log(result);

    usePosts(result.data);
  }, []);

  let [count, setCount] = useState(100);

  // const rows =[];
  // for (let i = 0; i < 5; i++) {
  //   rows.push(<PostDetail posts={posts} />)
  // }

  return (
    <div className="container">
      <div id="blog" className="row">
        <div className="col-md-12 gap10">
          {/* <PostDetail post={post} /> */}
          {/* -----------Increment && drecrement value-------- */}
          <button className='btn btn-primary' onClick={() => setCount(count - 1)}> -- </button> |.
          <button className='btn btn-info' onClick={() => setCount(count + 1)}> ++</button >
          <p>Default value 100, if you are click so vale will change: <h1>{count}</h1> </p>
          <p>----------------------------------------</p>

         
          {
            posts.map( p=> <PostDetail post={p} key={p.id} />)
          }
         
        </div>
      </div>
    </div>
  )
}

function PostCreate() {
  return (
    <h5>create Post</h5>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Code with me</div>
            <div className="list-group list-group-flush">

              <Link to="/" className="list-group-item list-group-item-action bg-light">Home</Link>
              <Link to="/posts" className="list-group-item list-group-item-action bg-light">Posts</Link>
              <Link to="/post-create" className="list-group-item list-group-item-action bg-light">Create Post</Link>

            </div>
          </div>

          <div id="page-content-wrapper">

            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <h3>Blog Website</h3>
            </nav>

            <div className="container-fluid">
              <Switch>
                <Route path="/post-create"><PostCreate /></Route>
                <Route path="/posts"><Posts /></Route>
                <Route path="/"><Home /></Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
