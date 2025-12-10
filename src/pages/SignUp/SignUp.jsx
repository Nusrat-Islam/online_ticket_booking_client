import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

import { imageUpload } from '../../utils'

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

  const handleGoogleSignIn = () => {
   signInWithGoogle()
      .then(result => {
        toast.success(result.user)
        navigate('/');
      })
      .catch((error) => {
        toast.error(error)
      })
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700'
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
      py-2'
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
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
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div className="wrapper ">
            <button
              type='submit'
              className=' w-full btn text-xm rounded-md py-3 font-bold'
            >
             
    <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
    <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
                 {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign Up'
              )}
           
            </button>
               </div>
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
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
