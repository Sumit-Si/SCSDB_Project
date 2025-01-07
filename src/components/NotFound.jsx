import notfound from "/404.svg";

function NotFound() {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <img className="h-[40%]" src={notfound} alt="loader" />
    </div>
  )
}

export default NotFound