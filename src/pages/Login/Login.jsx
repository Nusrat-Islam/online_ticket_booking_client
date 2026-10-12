import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveOrUpdateUser } from '../../utils'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      //User Login
      await signIn(email, password)
      
  

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async() => {
    try{
   const {user} = await signInWithGoogle()

   await saveOrUpdateUser({ 
    name : user?.displayName,
     emai: user?.email,
     image:user?.photoURL
    })


       navigate(from, {replace: true})
        toast.success('Signup successfull')
       
    }catch(error) {
        toast.error(error?.message)
  }
  }
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-black px-4 py-4 transition-colors duration-300'>
      <div className='flex flex-col w-full max-w-lg p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-base-content shadow-lg'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-2xl font-bold bg-gradient-to-r from-[#1581BF] to-[#00B7B5] bg-clip-text'>Log In</h1>
          <p className='text-2xl text-gray-500 dark:text-gray-400'>
            Sign in to access your account
          </p>
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
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
              className='w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900 block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 dark:bg-gray-800'
              />
            </div>
          </div>

          <div>
            {/*                   <Link to={"/signup"} className="btn">
 
    <span className="text">Signup</span>
  </div>
</Link> */}

            <button 
              type='submit'
              className='w-full rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:from-sky-700 hover:to-cyan-600 disabled:opacity-60'
            >
             
                 {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Login'
              )}
           
            </button>
               
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
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
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className='hover:underline hover:text-lime-500 text-blue-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
