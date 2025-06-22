import { useEffect, useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import Male from '/Profile/Male.jpg'
import Female from '/Profile/Female.jpeg'
import Unknown from '/Profile/profile.png'

    
  export default function NavBar() {

      const navigate = useNavigate()
      const [isOpen, setIsOpen] = useState(false)

      const handleProfileClick = () => {

        setIsOpen(!isOpen);
      }

      const profile = () => {
          navigate('/activities/users/'+ localStorage.getItem('id') +'/profile')
      }

      const logout = () => {
          localStorage.removeItem('id')
          localStorage.removeItem('username')
          localStorage.removeItem('role')
          localStorage.removeItem('genre')
          localStorage.removeItem('nom')
          localStorage.removeItem('prenom')
          navigate('/')
      }

      useEffect(()=>{
        !(localStorage.getItem('username')) && navigate('/')
      }, [navigate])

      return (
        <div className="h-screen w-full bg-white relative flex overflow-hidden">

            <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
                <Link to={'/activities/users/'+ localStorage.getItem('id') +'/profile'} className="text-decoration-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
          
              <div className="text-white h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
                <Link to='/activities' className="text-decoration-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2zM3 11h18" />
                  </svg>
                </Link>
              </div>

              <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
                <Link to='/activities/activitiesHistory' className="text-decoration-none">
                  <svg
                        className="w-6 h-6 text-gray-200 hover:text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="5"
                          y="2"
                          width="14"
                          height="20"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                </Link>
              </div>

            </aside>

            <div className="w-full h-full flex flex-col">
              <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 py-1 bg-gray-800">
                <div className="flex flex-shrink-0 items-center space-x-4 text-white">
                  
                  <div className="flex flex-col items-end ">
                    <div className="text-md font-medium ">{localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom')}</div>
                    <div className="text-sm font-regular">{localStorage.getItem('role')}</div>
                  </div>

                  <div className="relative">
                      <div className="relative h-12 w-12 rounded-full cursor-pointer bg-gray-200 border-2 border-gray-400" onClick={handleProfileClick}>
                          <img className="rounded-full object-cover" src={localStorage.getItem('genre') === "M" ? Male : localStorage.getItem('genre') === "F" ? Female : Unknown} alt="photo de profil" />
                          <span className='absolute left-0 bottom-0 bg-blue-500 w-3 h-3 rounded-xl'>&nbsp;</span>
                      </div>

                      {isOpen && (
                          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-10 cursor-default">
                              <span
                                  onClick={profile}
                                  className="block py-2 px-4 w-full font-semibold text-gray-800 text-left hover:bg-gray-100"
                              >
                                  <span className="px-2">Profil</span>
                              </span>

                              <span onClick={logout} className="block py-2 px-4 hover:bg-gray-100 w-full font-semibold text-gray-800 text-left">
                                  Déconnexion
                              </span>
                          </div>
                      )}
                  </div>
                </div>
              </header>
              <Outlet />
            </div>
          </div>
      )
    }
          
              
