import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Link, Route, Switch, useParams } from "react-router-dom";

import './App.css';


function Home() {
  return (
    <h5>Welcome to our Home page.</h5>
  );
}

const PostSummary = (data) => {
  return (
    <>
      <div align="left" className="col-md-10 blogShort" id={data.post.id}>
        <h3>{data.post.title}</h3>
        <img src={data.post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
        <p>{data.post.emTest}</p>
        <Link to={location => `/post-detail/${data.post._id}`}>Detail</Link> &nbsp;
        <Link to={location => `/post-edit/${data.post._id}`}>Edit</Link> &nbsp;
        <Link to={location => `/post-delete/${data.post._id}`}>Delete</Link> &nbsp;
      </div>
      <br></br>
    </>
  )
};

const PostDetails = (data) => {
  let {id} = useParams();
  
  useEffect(async () => {
    const response = await axios(
      `http://127.0.0.1:5000/api/posts/${id}`,
      );
      setPost(response.data.post);
    }, [id]);
    
    let [post, setPost] = useState({});

  return (
    <>
      <div align="left" className="col-md-10 blogShort" id={post._id}>
        <h3>{post.title}</h3>
        <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
        <p>{post.emTest}</p>
        <p>{post.articleText}</p>
        <a className="btn btn-blog pull-right marginBottom10" href={post.readMoreUrl}>READ MORE</a>  &nbsp;
        {/* <Link to={location => `/post-detail/${post.id}`}>Detail</Link> &nbsp; */}
        <Link to={location => `/post-edit/${post._id}`}>Edit</Link> &nbsp;
        <Link to={location => `/post-delete/${post._id}`}>Delete</Link> &nbsp;
      </div>

      <br></br>
    </>
  )
};

const Posts = () => {
  
  let [posts, setPosts] = useState([{
    id: '1',
    title: "Hello 1",
    images: "images 1",
    emtest: "Em Test value 1",
    articleText: "Article Text value 1",
  }, {
    id: '2',
    title: "Hello 2",
    images: "images 2",
    emtest: "Em Test value",
    articleText: "Article Text value",
  }, {
    id: '3',
    title: "Hello 3",
    images: "images 3",
    emtest: "Em Test value",
    articleText: "Article Text value",
  }])

  useEffect(async () => {
    const response = await axios(
      'http://127.0.0.1:5000/api/posts',
    );
    setPosts(response.data.posts);
  }, []);

  let [count, setCount] = useState(100);

  return (
    <div className="container">
      <div id="blog" className="row">
        <div className="col-md-12 gap10">

          {/* -----------Increment && drecrement value-------- */}
          <button className='btn btn-primary' onClick={() => setCount(count - 1)}> -- </button> |.
          <button className='btn btn-info' onClick={() => setCount(count + 1)}> ++</button >
          <p>Default value 100, if you are click so vale will change: <h1>{count}</h1> </p>
          <p>----------------------------------------</p>


          {
            posts.map(p => <PostSummary post={p} key={p.id} />)
          }
        </div>
      </div>
    </div>
  )
}

function PostCreate() {
  const { register, handleSubmit, watch, errors } = useForm();
  
  
  let saveData = async (data) => {
    const response = await axios.post('http://127.0.0.1:5000/api/posts', data)
  }

  const onSubmit = data => {
    saveData(data);
  }


  return (
    <>
      <h2>Create new Post</h2>
      {/* <h4>Location: {location.latitude}, {location.longitude}</h4> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group input-group">
          <input type="text" placeholder="Title" name="title" ref={register({ required: true, maxLength: 100 })} className="form-control" />
          <span>{errors.title && 'Title is required'}</span>
        </div>
        <div className="form-group input-group">
          <input type="text" placeholder="Summary" name="emTest" ref={register({ required: true, maxLength: 100 })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <textarea name="articleText" ref={register({ required: true })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <input type="url" placeholder="Image URL" name="imgUrl" ref={register({ required: true })} className="form-control" />
        </div>
        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </>
  )
}

const PostEdit = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let { id } = useParams();


  useEffect(async () => {
    const response = await axios(
      `http://127.0.0.1:5000/api/posts/${id}`,
      );
      setPost(response.data.post);
    }, [id]);
    
    let [post, setPost] = useState({});
 

  let updateData =async (data) => {
    console.log(data);
    const response = await axios.put(`http://127.0.0.1:5000/api/posts`, data)
  }

  const onSubmit = data => {
    updateData(data);
  };

  return (
    <>
      <h2>Update new Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group input-group">
          <input type="hidden"  name="id" defaultValue={post._id} ref={register({ required: true })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <input type="text" placeholder="Title" name="title" defaultValue={post.title} ref={register({ required: true })} className="form-control" />
          <span>{errors.title && 'Title is required'}</span>
        </div>
        <div className="form-group input-group">
          <input type="text" placeholder="Summary" name="emTest" defaultValue={post.emTest} ref={register({ required: true, maxLength: 100 })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <textarea name="articleText" defaultValue={post.articleText} ref={register({ required: true })} className="form-control" />
        </div>
        <div className="form-group input-group">
          <input type="url" placeholder="Image URL" name="imgUrl" defaultValue={post.imgUrl} ref={register({ required: true })} className="form-control" />
        </div>

        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </>
  )
};

const PostDelete = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let { id } = useParams();

  useEffect(async () => {
    const response = await axios.delete(
      `http://127.0.0.1:5000/api/posts/${id}`,
      );
      setPost(response.data.post);
    }, [id]);
    
    let [post, setPost] = useState({});

  return (
    <>
      <h2>Delete Post</h2>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{post.title}</h2>
        <img src={post.imgUrl} style={{ height: "50px", width: "50px" }} alt="post img" className="pull-left thumb margin10 img-thumbnail"></img>
        <article><p>{post.articleText}</p></article>
        <input type="submit" className="btn btn-primary btn-block" value="Delete" />
      </form> */}
    </>
  )
};


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
                <Route path="/post-detail/:id"><PostDetails /></Route>
                <Route path="/post-create"><PostCreate /></Route>
                <Route path="/post-edit/:id"><PostEdit /></Route>
                <Route path="/post-delete/:id"><PostDelete /></Route>
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
