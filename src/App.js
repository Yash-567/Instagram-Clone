import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './components/Post/Post';
import { db, auth } from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button , Input} from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle())
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false) 

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
    })
  }, [])

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(authUser=>{
      if(authUser){
        // User is logged in
        console.log(authUser)
        setUser(authUser)
        console.log("user in state: ",user)
        // if(authUser.displayName){
        //   // dont update username

        // }else{
        //   // if we just created an account it does not have a username so set it now
        //   return authUser.updateProfile({
        //     displayName: username
        //   })
        // }
      }else{
        // User is logged out
        console.log("no user detected. signing out... ")
        setUser(null)
      }
    })
    return ()=>{
      // perform cleanup as we do not want multiple listeners
      unsubscribe()
    }
  }, [user, username])

  const signUp = (event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser=>{
      authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error=>alert(error.message))

    setOpen(false)
  }

  const signIn = (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch(error=>alert(error.message))

    setOpenSignIn(false)
  }
  return (
    <div className="App">
      <div className="app_header">
            <img 
            className="app_headerImage" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            alt="Instagram Logo"/>
            {user? (
            <Button onClick={()=>auth.signOut()}>Logout</Button>
            ): (
              <div className="app_loginContainer">
                <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={()=>setOpen(true)}>Sign up</Button>
              </div>
            )}
      </div>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img 
                className="app_headerImage" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                alt="Instagram Logo"/>
            </center>
                <Input
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button onClick={signUp}>Sign Up</Button>
                
          </form>
      </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img 
                className="app_headerImage" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                alt="Instagram Logo"/>
            </center>
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button onClick={signIn}>Sign In</Button>
                
          </form>
      </div>
      </Modal>
      <div className="app_posts">
        {posts.map(({id, post})=>(
          <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
        ))}
      </div>
    </div>
  );
}

export default App;
