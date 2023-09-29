import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // sign in
    const handleGoogleSignIn = () => {
        // console.log('google mama is coming dude...')
        signInWithPopup(auth, provider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser)
            setUser(loggedInUser)
        })
        .catch (error => {
            console.log( 'tui error khaisot vai, ei karone', error.message)
        })
    }

    // sign out
    const handleGoogleSignOut = () => {
        auth.signOut()
        .then(() => {
            setUser(null)
        })
    }

return (
<div>
    {/* user ? logout : signin */}
    {
        user ?
        <button onClick={handleGoogleSignOut}
         className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
         type="button" data-ripple-light="true">
         Sign Out
     </button> :
     <button onClick={handleGoogleSignIn}
         className="mt-6 block w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
         type="button" data-ripple-light="true">
         Signup With Google
     </button> 
     
    }
           
           
            
            <div>
                {
                    user && <div>
                        <h2>user: {user.displayName}</h2>
                        <p>email: {user.email}</p>
                        <img src={user.photoURL} alt="" />
                    </div>
                }
                
            </div>
       
 
</div>
)
}

export default Login