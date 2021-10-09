// import logo from './logo.svg';
import { GoogleAuthProvider,getAuth,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile} from "firebase/auth";
import { useState } from "react";

import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
initializeAuthentication();
function App() {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleGoogleAuth=()=>{

    signInWithPopup(auth, googleProvider)
    .then((result)=>{
      const user = result.user;
      console.log(user);
    })

  }
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')
const [isLogin,setIslogin] = useState(false)
const [name,setName] = useState('')
const handleChecked=(e)=>{
  // console.log(e.target.checked);
  setIslogin(e.target.checked)
}
const handleNameChange=(e)=>{
  setName(e.target.value)
}
const hanleEmail=(e)=>{
  setEmail(e.target.value)
 
}
const handlePassword=(e)=>{
  setPassword(e.target.value)
}
  const handleformSubmit=(e)=>{
    e.preventDefault()
    console.log(email,password);
    if(password.length<6){
      setError('Password Should be at Least 6 Characters!')
      return;
    }
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Password Should have at Least two Uppercase Letters!')
      return;
    }
   
    isLogin ? processLogIn(email,password):registerNewUser(email,password)
  }
  
  const processLogIn=(email,password)=>{
    signInWithEmailAndPassword(auth,email,password)
    .then(result=>{
      const user = result.user;
      console.log(user);
      setError('Successfully Login!')
    })
    .catch(error=>{
      setError('invalid email or password!')
    })
  }
  const registerNewUser =(email,password)=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then(result=>{
      const user = result.user;
      console.log(user);
      verifyEmail();
      updateName()
      setError('')
    })
    .catch(error=>{
      setError(error.message)
    })
  }
  const updateName=()=>{
    updateProfile(auth.currentUser,{displayName: name})
    .then(()=>{ })
  }
const verifyEmail = ()=>{
  sendEmailVerification(auth.currentUser);

}
const handleResetPassword=()=>{
  sendPasswordResetEmail(auth,email)
}
  return (
    <div className="mt-4">
      <div className="container">
        <h3 className="text-primary">{isLogin?'Please Login':'Please Register'}</h3>
  <form onSubmit={handleformSubmit} className="mx-4">
   {
     !isLogin && 
     <div className="row mb-3">
     <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
     <div className="col-sm-10">
       <input onBlur={handleNameChange} type="name" className="form-control" id="inputName" required/>
     </div>
   </div>
   }
    <div className="row mb-3">
      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
      <div className="col-sm-10">
        <input onBlur={hanleEmail} type="email" className="form-control" id="inputEmail3" required/>
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
      <div className="col-sm-10">
        <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword3" required/>
      </div>
    </div>
  
    <div className="row mb-3">
      <div className="col-sm-10 offset-sm-2">
        <div className="form-check">
          <input onChange={handleChecked} className="form-check-input" type="checkbox" id="gridCheck1"/>
          <label className="form-check-label" htmlFor="gridCheck1">
            Already Registered?
          </label>
        </div>
      </div>
    </div>
    <div className="row mb-3">
      <p className="text-danger">{error}</p>
    </div>
    <button type="submit" className="btn btn-primary">{isLogin ? 'Log in': 'Register'}</button>
    <button onClick={handleResetPassword} type="button" className="btn btn-secondary ms-4">Password Reset</button>

  </form>
      </div>
      <br /><br /><br />
      <div>----------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleAuth}>Google Sign in</button>
    </div>
  );
}

export default App;
