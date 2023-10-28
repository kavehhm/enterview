import '@/styles/globals.css'

export default function App({ Component, pageProps }) {

  return(
  <div className='p-10'>
   <p className='font-bold'>
      enter
      <span className='text-blue-600'>view</span>
     </p>
  <Component {...pageProps} />
  </div>)
}
