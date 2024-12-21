import loader from "/loader.gif";

function Loading() {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <img className="h-[40%]" src={loader} alt="loader" />
    </div>
  )
}

export default Loading