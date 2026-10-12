import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

import { imageUpload, saveOrUpdateUser } from '../../utils'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
 


  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.value
    
  //imgbb

const fileInput = form.image;
const imageFile = fileInput.files[0];

if (!imageFile) {
  toast.error("Please upload an image!");
  return;
}
// const formData = new FormData();
// formData.append("image", imageFile);

    //password authentication
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("❌ Invalid password. Must be at least 6 characters, include uppercase and lowercase letters.");
      return;
    }

    try {

  //       const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
  //   formData
  // )
  const imageURL = await imageUpload(imageFile)

      //2. User Registration
      const result = await createUser(email, password)
  
      //user
      await saveOrUpdateUser({name, email, image: imageURL})
      //3. Save username & profile photo
      await updateUserProfile(
        name,
       imageURL
      )
      console.log(result)

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    }  catch(error) {
        console.error("Firebase Error:", error.code, error.message);
        const errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          toast.error("This email is already registered!");
        }
        else if (errorCode === "auth/invalid-email") {
          toast.error("Invalid email address!");
        }
        else if (errorCode === "auth/weak-password") {
          toast.error("Password must be at least 6 characters!");
        }
        else if (errorCode === "auth/missing-password") {
          toast.error("Please enter a password!");
        }
        else if (errorCode === "auth/internal-error") {
          toast.error("Internal error occurred. Try again!");
        }
        else {
          toast.error("Something went wrong. Try again later!");
          console.error("Register error:", error);
        }
      }
  }

  // Handle Google Signin

  const handleGoogleSignIn = async() => {
    try{
   const {user} = await signInWithGoogle()

   await saveOrUpdateUser({ 
    name : user?.displayName,
     email: user?.email,
     image:user?.photoURL})


       navigate(from, {replace: true})
        toast.success('Signup successfull')
       
    }catch(error) {
        toast.error(error?.message)
  }
  }
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-950 px-4 py-4 transition-colors duration-300'>
     <div className='flex flex-col w-full max-w-lg p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text'>Create Your Account</h1>
          <p className='text-md text-gray-400'>Welcome to Ticket Bari</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-3'
        >
          <div className='space-y-4'>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div>
              <label htmlFor='email' className='block mb-2 text-sm  dark:text-white  dark:placeholder-gray-400'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium dark:text-white'
              >
                Profile Image
              </label>
              <input
                name='image'
                type='file'
                id='image'
                 accept='image/*'
                className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-lime-700
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
      py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor='email' className='block mb-2 text-sm  dark:text-white'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-200 dark:bg-gray-800'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
              />
            </div> 
            </div>
          </div>

          
            <button
              type='submit'
              
className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:from-sky-700 hover:to-cyan-600 disabled:opacity-60"

            >
             
  
                 {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign Up'
              )}
           
            </button>
               
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-lime-500 text-blue-600'
          >
            Login
          </Link>
        
        </p>
      </div>
    </div>
  )
}

export default SignUp
