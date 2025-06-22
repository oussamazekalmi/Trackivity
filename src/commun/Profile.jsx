import { Link, useNavigate } from 'react-router-dom';
import Male from '/Profile/Male.jpg'
import Female from '/Profile/Female.jpeg'
import Unknown from '/Profile/profile.png'
import { useEffect, useState } from 'react';


const Profile = () => {

    const navigate = useNavigate();
    const [showBloc, setShowBloc] = useState(false);
    const [archives, setArchives] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [showMoreArchive, setShowMoreArchive] = useState(false);
    const [showMoreUpComing, setShowMoreUpComing] = useState(false);

    const userRole = localStorage.getItem('role');

    const userId = localStorage.getItem('id');

    useEffect(() => {

        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:3000/activities');
                const allActivities = await response.json();

               const date = new Date()
               const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                
                const filteredArchiveActivities = allActivities.filter( 
                    activity => {
                        return activity?.dateFin < today
                    }
                );

                const filteredUpComingActivities = allActivities.filter( 
                    activity => {
                        return activity?.dateDebut >= today
                    }
                );

                setUpComing(filteredUpComingActivities)

                if (userRole === 'stagiaire') {
                    const registrationsResponse = await fetch('http://localhost:3000/registrations');
                    const registrations = await registrationsResponse.json();
                    const userActivityIds = registrations
                        .filter(registration => registration.userId === userId)
                        .map(registration => registration.activityId);

                    const userActivities = filteredArchiveActivities.filter(activity => userActivityIds.includes(activity.id));
                    setArchives(userActivities);
                } else {
                    setArchives(filteredArchiveActivities);
                }


            } catch (error) {
                console.error('Erreur lors du chargement des données des activités:', error);
            }
        };

        fetchActivities();
    }, [userRole, userId]);

    const back = () => {
        navigate('/activities')
    }

    const toggleBloc = () => {
        setShowBloc(!showBloc);
    }


    const showArchive = () => {
        setShowMoreArchive(!showMoreArchive);
    };  
    
    const showUpComing = () => {
        setShowMoreUpComing(!showMoreUpComing);
    };  

    return (
        <div className="min-h-screen p-6 bg-gray-100 overflow-y-scroll">
            <div className="container mx-auto bg-white p-6 rounded-lg shadow-md mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="col-span-1">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex flex-col items-center text-center">
                                <div className='relative'>
                                    <img src={localStorage.getItem('genre') === "M" ? Male : localStorage.getItem('genre') === "F" ? Female : Unknown} alt="Admin" className="rounded-full w-36 h-36 border-4 border-gray-800" />
                                    <span className='absolute left-6 bottom-1 bg-blue-500 w-5 h-5 rounded-xl'>&nbsp;</span>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold">{localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom')}</h4>
                                    <p className="text-gray-500">{localStorage.getItem('role')}</p>
                                    <p className="text-gray-400 text-sm">{localStorage.getItem('fonction')}</p>
                                    <div className="w-80 flex justify-center mx-auto pb-2">
                                        <button type="button" onClick={back} className="btn bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-r-none p-1">
                                            <svg viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="si-glyph si-glyph-button-arrow-left mx-auto w-6" fill="#ffffff" stroke="#ffffff">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                                <g id="SVGRepo_iconCarrier"> <title>1188</title> <defs> </defs> <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g transform="translate(1.000000, 0.000000)" fill="#ffffff"> <path d="M0,8.041 C0,3.652 3.582,0.082 7.985,0.082 C12.386,0.082 15.968,3.652 15.968,8.041 C15.968,12.43 12.386,16 7.985,16 C3.582,16 0,12.43 0,8.041 L0,8.041 Z M14.057,8.041 C14.057,4.708 11.342,1.996 8.006,1.996 C4.669,1.996 1.954,4.708 1.954,8.041 C1.954,11.374 4.67,14.086 8.006,14.086 C11.343,14.086 14.057,11.374 14.057,8.041 L14.057,8.041 Z" className="si-glyph-fill"> </path> <path d="M7.975,5.02 L4.071,8.022 L7.976,10.973 L7.976,8.97 L11.116,8.97 C11.461,8.97 11.907,8.646 11.907,8.015 C11.907,7.385 11.424,7.04 11.081,7.04 L7.976,7.04 L7.976,5.02 L7.975,5.02 Z" className="si-glyph-fill"> </path> </g> </g> </g>
                                            </svg>
                                        </button>
                                        <button type="button" onClick={toggleBloc} className="btn bg-gray-700 hover:bg-gray-800 border-l-2 border-gray-800 text-white font-bold rounded-l-none p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-gray mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2zM3 11h18" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-span-2">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="w-44 font-semibold">Nom Complet:</span>
                                    <span className="text-gray-500">{localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom')}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-44 font-semibold">{localStorage.getItem('role') === 'admin' ? 'Fonction' : 'Spécialité'}:</span>
                                    <span className="text-gray-500">{localStorage.getItem('fonction')}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-44 font-semibold">Adresse E-mail:</span>
                                    <span className="text-gray-500">{localStorage.getItem('mail')}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-44 font-semibold">Téléphone Stagiaire:</span>
                                    <span className="text-gray-500">{localStorage.getItem('phone')}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-44 font-semibold">Téléphone Parent:</span>
                                    <span className="text-gray-500">{localStorage.getItem('parent_phone')}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-44 font-semibold">Adresse:</span>
                                    <span className="text-gray-500">{localStorage.getItem('adresse')}</span>
                                </div>
                                <div className="text-right">
                                    <button type="button"  className="btn w-12 bg-blue-500 text-white font-bold p-1">
                                        <svg className="w-6 h-6 mx-auto" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"/>
                                            <g id="SVGRepo_iconCarrier"> <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H20C20.4142 21.25 20.75 21.5858 20.75 22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22Z" fill="#f7f7f7"/> <path opacity="0.5" d="M19.0807 7.37162C20.3095 6.14279 20.3095 4.15046 19.0807 2.92162C17.8519 1.69279 15.8595 1.69279 14.6307 2.92162L13.9209 3.63141C13.9306 3.66076 13.9407 3.69052 13.9512 3.72066C14.2113 4.47054 14.7022 5.45356 15.6256 6.37698C16.549 7.30039 17.532 7.79126 18.2819 8.05142C18.3119 8.06183 18.3415 8.07187 18.3708 8.08155L19.0807 7.37162Z" fill="#f7f7f7"/> <path d="M13.9511 3.59961L13.9205 3.63017C13.9303 3.65952 13.9403 3.68928 13.9508 3.71942C14.211 4.4693 14.7018 5.45232 15.6252 6.37574C16.5487 7.29915 17.5317 7.79002 18.2816 8.05018C18.3113 8.0605 18.3407 8.07046 18.3696 8.08005L11.5198 14.9299C11.058 15.3917 10.827 15.6227 10.5724 15.8213C10.2721 16.0555 9.94711 16.2564 9.60326 16.4202C9.31177 16.5591 9.00196 16.6624 8.38235 16.869L5.11497 17.9581C4.81005 18.0597 4.47388 17.9804 4.24661 17.7531C4.01934 17.5258 3.93998 17.1897 4.04162 16.8847L5.13074 13.6173C5.33728 12.9977 5.44055 12.6879 5.57947 12.3964C5.74334 12.0526 5.94418 11.7276 6.17844 11.4273C6.37702 11.1727 6.60794 10.9418 7.06971 10.48L13.9511 3.59961Z" fill="#f7f7f7"/> </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        {showBloc && (
                            <div className="mt-6 flex space-x-4">
                                <div className="w-1/2 h-full bg-white p-4 rounded-lg shadow-md">
                                    <h6 className="text-lg font-semibold text-gray-600 flex mb-6">
                                        <svg className='w-8 mr-6'
                                            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.891 384.891" xmlSpace="preserve" fill="#000000" >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <g>
                                                        <rect x="13.438" y="207.825" style={{ fill: "#CAA977" }} width="214.023" height="154.009"></rect>
                                                        <rect y="170.511" style={{ fill: "#DFCAA3" }} width="227.461" height="37.314"></rect>
                                                        <rect x="227.461" y="207.825" style={{ fill: "#A88D63" }} width="143.992" height="154.009"></rect>
                                                        <rect x="227.461" y="170.511" style={{ fill: "#CAA977" }} width="157.43" height="37.314"></rect>
                                                        <path style={{ fill: "#333E48" }} d="M332.096,230.972c6.074,0,11,4.925,11,11s-4.926,11-11,11H285.82c-6.076,0-11-4.925-11-11 s4.924-11,11-11H332.096z"></path>
                                                        <rect x="13.437" y="284.829" style={{ fill: "#e6e6e6" }} width="95.963" height="40.9"></rect>
                                                    </g>
                                                    <g>
                                                        <rect x="95.475" y="51.815" style={{ fill: "#CAA977" }} width="164.949" height="118.695"></rect>
                                                        <rect x="85.117" y="23.057" style={{ fill: "#DFCAA3" }} width="175.307" height="28.759"></rect>
                                                        <rect x="260.424" y="51.815" style={{ fill: "#A88D63" }} width="110.977" height="118.695"></rect>
                                                        <rect x="260.424" y="23.057" style={{ fill: "#CAA977" }} width="121.332" height="28.759"></rect>
                                                        <path style={{ fill: "#333E48" }} d="M341.066,69.654c4.682,0,8.478,3.796,8.478,8.478c0,4.683-3.797,8.479-8.478,8.479h-35.664 c-4.684,0-8.479-3.796-8.479-8.479c0-4.682,3.795-8.478,8.479-8.478C305.402,69.654,341.066,69.654,341.066,69.654z"></path>
                                                        <rect x="95.475" y="111.163" style={{ fill: "#e6e6e6" }} width="73.959" height="31.521"></rect>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        Archives
                                    </h6>
                                    <div className="mt-2 space-y-2">
                                        {showMoreArchive ? archives.map(activity => (
                                            <div key={activity.id} className="pb-4">
                                                <div className='flex justify-between'>
                                                    <div className="font-semibold text-gray-700 flex mb-2">
                                                        <svg className='w-5 mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"> <path d="M8.00009 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#333E48" strokeWidth="1.2" strokeLinecap="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10.5653 12.3677L15.4644 6.37999C15.6742 6.12352 15.6364 5.7455 15.3799 5.53567C15.1235 5.32583 14.7455 5.36363 14.5356 5.6201L9.6434 11.5995L10.5653 12.3677ZM8.03225 15.4637L7.11035 14.6954L6.14267 15.8782C6.00694 16.044 5.76456 16.0735 5.59309 15.9449L2.36 13.52C2.0949 13.3212 1.71882 13.3749 1.52 13.64C1.32118 13.9051 1.3749 14.2812 1.64 14.48L4.87309 16.9049C5.559 17.4193 6.52849 17.3016 7.07142 16.638L8.03225 15.4637Z" fill="#2A4157" fillOpacity="0.62"></path> </g>
                                                        </svg>
                                                        {activity.name}
                                                    </div>
                                                    <Link to={`/activities/${activity.id}/detailsActivity`}>
                                                        <svg className='w-5 mb-2' fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(1, 0, 0, 1, 0, 0)rotate(45)">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"> <title>angle-double-line</title> <path className="clr-i-outline clr-i-outline-path-1" d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"></path><path className="clr-i-outline clr-i-outline-path-2" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path> <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> </g>
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div className="text-sm text-gray-400 border-b flex justify-end">{activity.dateDebut === activity.dateFin ? 
                                                    activity.dateDebut : 
                                                    activity.dateDebut} 
                                                    <svg className='w-4 mx-1' viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"><path fill="none" stroke="#333E48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="m30 99 42 42 90-90m0 90L72 51"></path></g>
                                                    </svg>
                                                    {activity.dateFin}
                                                </div>
                                            </div>
                                            )) : archives.slice(0, 2).map(activity => (
                                            <div key={activity.id} className="pb-4">
                                                <div className='flex justify-between'>
                                                    <div className="font-semibold text-gray-700 flex mb-2">
                                                        <svg className='w-5 mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"> <path d="M8.00009 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#333E48" strokeWidth="1.2" strokeLinecap="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10.5653 12.3677L15.4644 6.37999C15.6742 6.12352 15.6364 5.7455 15.3799 5.53567C15.1235 5.32583 14.7455 5.36363 14.5356 5.6201L9.6434 11.5995L10.5653 12.3677ZM8.03225 15.4637L7.11035 14.6954L6.14267 15.8782C6.00694 16.044 5.76456 16.0735 5.59309 15.9449L2.36 13.52C2.0949 13.3212 1.71882 13.3749 1.52 13.64C1.32118 13.9051 1.3749 14.2812 1.64 14.48L4.87309 16.9049C5.559 17.4193 6.52849 17.3016 7.07142 16.638L8.03225 15.4637Z" fill="#2A4157" fillOpacity="0.62"></path> </g>
                                                        </svg>
                                                        {activity.name}
                                                    </div>
                                                    <Link to={`/activities/${activity.id}/detailsActivity`}>
                                                        <svg className='w-5 mb-2' fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(1, 0, 0, 1, 0, 0)rotate(45)">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"> <title>angle-double-line</title> <path className="clr-i-outline clr-i-outline-path-1" d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"></path><path className="clr-i-outline clr-i-outline-path-2" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path> <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> </g>
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div className="text-sm text-gray-400 border-b flex justify-end">{activity.dateDebut === activity.dateFin ? 
                                                    activity.dateDebut : 
                                                    activity.dateDebut} 
                                                    <svg className='w-4 mx-1' viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"><path fill="none" stroke="#333E48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="m30 99 42 42 90-90m0 90L72 51"></path></g>
                                                    </svg>
                                                    {activity.dateFin}
                                                </div>
                                            </div>
                                        ))}
                                        {archives.length > 2 && (
                                            <button onClick={showArchive} className="text-blue-500 font-semibold">
                                                {!showMoreArchive   ? 
                                                    <div className='flex justify-start'>
                                                        <svg viewBox="0 0 1024 1024" className="w-8 icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF"></path><path d="M469.3 704c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L558.3 512 439.2 392.8c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l149.3 149.3c16.7 16.7 16.7 43.7 0 60.3L499.5 691.5c-8.3 8.3-19.3 12.5-30.2 12.5z" fill="#5F6379"></path></g>
                                                        </svg>  
                                                    </div>  : 
                                                    <div className='flex justify-end'>
                                                        <svg viewBox="0 0 1024 1024" className="w-8 icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF"></path><path d="M469.3 704c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L558.3 512 439.2 392.8c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l149.3 149.3c16.7 16.7 16.7 43.7 0 60.3L499.5 691.5c-8.3 8.3-19.3 12.5-30.2 12.5z" fill="#5F6379"></path></g>
                                                        </svg>
                                                    </div>
                                                }
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2 h-full bg-white p-4 rounded-lg shadow-md">
                                    <h6 className="text-lg font-semibold text-gray-600 flex mb-6">
                                        <svg className='w-8 mr-6' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 58" xmlSpace="preserve" fill="#000000" >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <g>
                                                        <polygon style={{ fill: "#F05565" }} points="46.5,4 46.5,8 39.5,8 39.5,4 15.5,4 15.5,8 8.5,8 8.5,4 0.5,4 0.5,15 54.5,15 54.5,4" ></polygon>
                                                        <polygon style={{ fill: "#EFEBDE" }} points="8.5,15 0.5,15 0.5,58 54.5,58 54.5,15 46.5,15 39.5,15 15.5,15" ></polygon>
                                                        <path style={{ fill: "#D5D0BB" }} d="M37.5,22h-2h-7h-2h-7h-2h-9v9v2v7v2v9h9h2h7h2h7h2h9v-9v-2v-7v-2v-9H37.5z M28.5,24h7v7h-7V24z M35.5,40h-7v-7h7V40z M19.5,33h7v7h-7V33z M19.5,24h7v7h-7V24z M10.5,24h7v7h-7V24z M10.5,33h7v7h-7V33z M17.5,49h-7v-7h7V49z M26.5,49h-7v-7h7V49z M35.5,49h-7v-7h7V49z M44.5,49h-7v-7h7V49z M44.5,40h-7v-7h7V40z M37.5,31v-7h7v7H37.5z" ></path>
                                                        <rect x="8.5" style={{ fill: "#36495E" }} width="7" height="8"></rect>
                                                        <rect x="39.5" style={{ fill: "#36495E" }} width="7" height="8"></rect>
                                                        <rect x="19.5" y="33" style={{ fill: "#7F6E5D" }} width="7" height="7"></rect>
                                                    </g>
                                                    <g>
                                                        <path style={{ fill: "#EFC41A" }} d="M56.261,57H32.57c-0.955,0-1.55-1.036-1.069-1.861l11.845-20.306c0.478-0.819,1.66-0.819,2.138,0 L57.33,55.139C57.811,55.964,57.216,57,56.261,57z" ></path>
                                                        <path style={{ fill: "#FFFFFF" }} d="M44.5,50c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1s1,0.448,1,1v8 C45.5,49.552,45.052,50,44.5,50z" ></path> 
                                                        <path style={{ fill: "#FFFFFF" }} d="M44.5,54c-0.26,0-0.52-0.11-0.71-0.29c-0.18-0.19-0.29-0.45-0.29-0.71c0-0.26,0.11-0.52,0.29-0.71 c0.38-0.37,1.04-0.37,1.42,0c0.18,0.19,0.29,0.45,0.29,0.71c0,0.26-0.11,0.52-0.29,0.71C45.02,53.89,44.77,54,44.5,54z" ></path>
                                                    </g>
                                                </g>
                                            </g>
                                            </svg>

                                        À venir
                                    </h6>
                                    <div className="mt-2 space-y-2">
                                        {showMoreUpComing ? upComing.map(activity => (
                                            <div key={activity.id} className="pb-4">
                                            <div className='flex justify-between'>
                                                <div className="font-semibold text-gray-700 flex mb-2">
                                                    <svg className='w-5 mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"> <path d="M8.00009 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#333E48" strokeWidth="1.2" strokeLinecap="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10.5653 12.3677L15.4644 6.37999C15.6742 6.12352 15.6364 5.7455 15.3799 5.53567C15.1235 5.32583 14.7455 5.36363 14.5356 5.6201L9.6434 11.5995L10.5653 12.3677ZM8.03225 15.4637L7.11035 14.6954L6.14267 15.8782C6.00694 16.044 5.76456 16.0735 5.59309 15.9449L2.36 13.52C2.0949 13.3212 1.71882 13.3749 1.52 13.64C1.32118 13.9051 1.3749 14.2812 1.64 14.48L4.87309 16.9049C5.559 17.4193 6.52849 17.3016 7.07142 16.638L8.03225 15.4637Z" fill="#2A4157" fillOpacity="0.62"></path> </g>
                                                    </svg>
                                                    {activity.name}
                                                </div>
                                                <Link to={`/activities/${activity.id}/detailsActivity`}>
                                                    <svg className='w-5 mb-2' fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(1, 0, 0, 1, 0, 0)rotate(45)">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"> <title>angle-double-line</title> <path className="clr-i-outline clr-i-outline-path-1" d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"></path><path className="clr-i-outline clr-i-outline-path-2" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path> <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> </g>
                                                    </svg>
                                                </Link>
                                            </div>
                                            <div className="text-sm text-gray-400 border-b flex justify-end">{activity.dateDebut === activity.dateFin ? 
                                                activity.dateDebut : 
                                                activity.dateDebut} 
                                                <svg className='w-4 mx-1' viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier"><path fill="none" stroke="#333E48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="m30 99 42 42 90-90m0 90L72 51"></path></g>
                                                </svg>
                                                {activity.dateFin}
                                            </div>
                                        </div>
                                        )) : upComing.slice(0, 2).map(activity => (
                                            <div key={activity.id} className="pb-4">
                                                <div className='flex justify-between'>
                                                    <div className="font-semibold text-gray-700 flex mb-2">
                                                        <svg className='w-5 mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"> <path d="M8.00009 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#333E48" strokeWidth="1.2" strokeLinecap="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M10.5653 12.3677L15.4644 6.37999C15.6742 6.12352 15.6364 5.7455 15.3799 5.53567C15.1235 5.32583 14.7455 5.36363 14.5356 5.6201L9.6434 11.5995L10.5653 12.3677ZM8.03225 15.4637L7.11035 14.6954L6.14267 15.8782C6.00694 16.044 5.76456 16.0735 5.59309 15.9449L2.36 13.52C2.0949 13.3212 1.71882 13.3749 1.52 13.64C1.32118 13.9051 1.3749 14.2812 1.64 14.48L4.87309 16.9049C5.559 17.4193 6.52849 17.3016 7.07142 16.638L8.03225 15.4637Z" fill="#2A4157" fillOpacity="0.62"></path> </g>
                                                        </svg>
                                                        {activity.name}
                                                    </div>
                                                    <Link to={`/activities/${activity.id}/detailsActivity`}>
                                                        <svg className='w-5 mb-2' fill="#000000" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(1, 0, 0, 1, 0, 0)rotate(45)">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"> <title>angle-double-line</title> <path className="clr-i-outline clr-i-outline-path-1" d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"></path><path className="clr-i-outline clr-i-outline-path-2" d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"></path> <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> </g>
                                                        </svg>
                                                    </Link>
                                                </div>
                                                <div className="text-sm text-gray-400 border-b flex justify-end">{activity.dateDebut === activity.dateFin ? 
                                                    activity.dateDebut : 
                                                    activity.dateDebut} 
                                                    <svg className='w-4 mx-1' viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"><path fill="none" stroke="#333E48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="m30 99 42 42 90-90m0 90L72 51"></path></g>
                                                    </svg>
                                                    {activity.dateFin}
                                                </div>
                                            </div>
                                        ))}
                                        {upComing.length > 2 && (
                                            <button onClick={showUpComing} className="text-blue-500 font-semibold">
                                                {!showMoreUpComing   ? 
                                                    <div className='flex justify-start'>
                                                        <svg viewBox="0 0 1024 1024" className="w-8 icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF"></path><path d="M469.3 704c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L558.3 512 439.2 392.8c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l149.3 149.3c16.7 16.7 16.7 43.7 0 60.3L499.5 691.5c-8.3 8.3-19.3 12.5-30.2 12.5z" fill="#5F6379"></path></g>
                                                        </svg>  
                                                    </div>  : 
                                                    <div className='flex justify-end'>
                                                        <svg viewBox="0 0 1024 1024" className="w-8 icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier"><path d="M512 1024C229.7 1024 0 794.3 0 512S229.7 0 512 0s512 229.7 512 512-229.7 512-512 512z m0-938.7C276.7 85.3 85.3 276.7 85.3 512S276.7 938.7 512 938.7 938.7 747.3 938.7 512 747.3 85.3 512 85.3z" fill="#3688FF"></path><path d="M469.3 704c-10.9 0-21.8-4.2-30.2-12.5-16.7-16.7-16.7-43.7 0-60.3L558.3 512 439.2 392.8c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l149.3 149.3c16.7 16.7 16.7 43.7 0 60.3L499.5 691.5c-8.3 8.3-19.3 12.5-30.2 12.5z" fill="#5F6379"></path></g>
                                                        </svg>
                                                    </div>
                                                }
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Profile;
