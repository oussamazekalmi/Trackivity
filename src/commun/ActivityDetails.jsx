import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivityDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const [activity, setActivity] = useState({});
    const [registrations, setRegistrations] = useState([]);
    const [showBloc, setShowBloc] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/activities/${id}`)
        .then(response => setActivity(response.data))
        .catch(error => console.error('Erreur lors du chargement des données de l\'activité:', error));
    }, [id]); 
    
    useEffect(() => {
        axios.get(`http://localhost:3000/registrations`)
        .then(response => setRegistrations(response.data))
        .catch(error => console.error('Erreur lors du chargement des données des activités:', error));
    }, []); 

    const back = () => {
        navigate('/activities')
    }

    const toggleBloc = () => {
        setShowBloc(!showBloc);
    }

    const register = async() => {
        const id = registrations.length + 1
        const data = {
            "activityId" : activity.id,
            "userId" : localStorage.getItem('id'),
            "id" : String(id)
        }
        await axios.post('http://localhost:3000/registrations', data ).then(
            //alert
        )
    }

    return (
        <div className="w-full h-full flex mx-auto pb-8 pt-1 px-40 bg-gray-100">
            <div key={activity.id} className="w-96 relative mr-12 h-full flex-shrink-0 shadow-gray-400 bg-white shadow-lg rounded-md">
                <img className="w-full h-60 object-cover rounded-t-md" src={activity.photo ? `/ActivitiesPhotos/${activity.photo}` : '/ActivitiesPhotos/Blank.jpg'} alt={activity.photo ? "Photo descriptive de l'activité" : "Aucune photo disponible"} />
                <h1 className="bg-gray-800 text-white p-2 font-light text-xl">{activity.name}</h1>
                <p className="text-gray-800 m-4 flex">
                    <svg className="w-7 mr-4" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0">
                            <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" fill="#4A5568" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0"/>
                        </g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <path d="M22 7.99992V11.9999M10.25 5.49991H6.8C5.11984 5.49991 4.27976 5.49991 3.63803 5.82689C3.07354 6.11451 2.6146 6.57345 2.32698 7.13794C2 7.77968 2 8.61976 2 10.2999L2 11.4999C2 12.4318 2 12.8977 2.15224 13.2653C2.35523 13.7553 2.74458 14.1447 3.23463 14.3477C3.60218 14.4999 4.06812 14.4999 5 14.4999V18.7499C5 18.9821 5 19.0982 5.00963 19.1959C5.10316 20.1455 5.85441 20.8968 6.80397 20.9903C6.90175 20.9999 7.01783 20.9999 7.25 20.9999C7.48217 20.9999 7.59826 20.9999 7.69604 20.9903C8.64559 20.8968 9.39685 20.1455 9.49037 19.1959C9.5 19.0982 9.5 18.9821 9.5 18.7499V14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
                    </svg>
                    {activity.dateDebut === activity.dateFin ? 'Le ' + activity.dateDebut + ' De ' + activity.tempsDebut + ' À ' + activity.tempsFin : 'De ' + activity.dateDebut + ' À ' + activity.tempsDebut + ' Jusqu\'À  Le ' + activity.dateFin + ' À ' + activity.tempsFin}
                </p>
                <p className="text-gray-800 m-4 flex">
                    <svg className="w-7 mr-4" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0">
                            <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" fill="#4A5568" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0"/>
                        </g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H13.5M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"/>
                        </g>
                    </svg>
                    À &nbsp;{activity.location}
                </p>
                
                <p className="text-gray-800 m-4 flex">
                    <svg fill="#ffffff" className="w-7 mr-4" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-30 -30 359.97 359.97" xmlSpace="preserve" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
                            <path transform="translate(-30, -30), scale(22.498125)" fill="#4A5568" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0"/>
                        </g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M149.985,126.898c34.986,0,63.449-28.463,63.449-63.449C213.435,28.463,184.971,0,149.985,0S86.536,28.463,86.536,63.449 C86.536,98.436,114.999,126.898,149.985,126.898z M149.985,15.15c26.633,0,48.299,21.667,48.299,48.299 s-21.667,48.299-48.299,48.299s-48.299-21.667-48.299-48.299S123.353,15.15,149.985,15.15z"/> <path d="M255.957,271.919l-20.807-86.313c-2.469-10.244-11.553-17.399-22.093-17.399c-13.216,0-114.332,0-126.145,0 c-10.538,0-19.623,7.155-22.093,17.399l-20.807,86.313c-3.444,14.289,7.377,28.051,22.093,28.051h167.76 C248.563,299.97,259.407,286.229,255.957,271.919z M66.105,284.82c-4.898,0-8.513-4.581-7.364-9.35l20.807-86.314 c0.823-3.415,3.851-5.799,7.365-5.799H121.4l-9.553,67.577c-0.283,2,0.244,4.029,1.464,5.637l21.422,28.249H66.105z M127.291,249.932l9.411-66.574h26.567l9.411,66.574l-22.695,29.927L127.291,249.932z M233.865,284.82h-68.628l21.421-28.248 c1.22-1.609,1.747-3.638,1.464-5.637l-9.553-67.577h34.487c3.513,0,6.542,2.385,7.365,5.8l20.807,86.313 C242.377,280.235,238.769,284.82,233.865,284.82z"/> </g> </g> </g> </g>
                    </svg>
                    {activity.encadrent}
                </p>
                <div className="w-80 flex justify-center absolute bottom-2 start-8">
                    <button type="button" onClick={back} className="btn bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-r-none p-1">
                        <svg viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="si-glyph si-glyph-button-arrow-left mx-auto w-6" fill="#ffffff" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <title>1188</title> <defs> </defs> <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g transform="translate(1.000000, 0.000000)" fill="#ffffff"> <path d="M0,8.041 C0,3.652 3.582,0.082 7.985,0.082 C12.386,0.082 15.968,3.652 15.968,8.041 C15.968,12.43 12.386,16 7.985,16 C3.582,16 0,12.43 0,8.041 L0,8.041 Z M14.057,8.041 C14.057,4.708 11.342,1.996 8.006,1.996 C4.669,1.996 1.954,4.708 1.954,8.041 C1.954,11.374 4.67,14.086 8.006,14.086 C11.343,14.086 14.057,11.374 14.057,8.041 L14.057,8.041 Z" className="si-glyph-fill"> </path> <path d="M7.975,5.02 L4.071,8.022 L7.976,10.973 L7.976,8.97 L11.116,8.97 C11.461,8.97 11.907,8.646 11.907,8.015 C11.907,7.385 11.424,7.04 11.081,7.04 L7.976,7.04 L7.976,5.02 L7.975,5.02 Z" className="si-glyph-fill"> </path> </g> </g> </g>
                        </svg>
                    </button>
                    <button type="button" onClick={toggleBloc} className="btn bg-gray-700 hover:bg-gray-800 border-r-2 border-l-2 border-gray-800 text-white font-bold rounded-none p-1">
                        <svg fill="#ffffff" className="w-7 mx-auto" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M22,9V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V18H19.5a.5.5,0,0,0,.5-.5V8h1A1,1,0,0,1,22,9ZM2,15V5A1,1,0,0,1,3,4H17a1,1,0,0,1,1,1V15a1,1,0,0,1-1,1H3A1,1,0,0,1,2,15Zm11-5a1,1,0,0,0,1,1h1a1,1,0,0,0,0-2H14A1,1,0,0,0,13,10ZM8,10a2,2,0,1,0,2-2A2,2,0,0,0,8,10ZM4,10a1,1,0,0,0,1,1H6A1,1,0,0,0,6,9H5A1,1,0,0,0,4,10Z"/>
                            </g>
                        </svg>
                    </button>
                    <button type="button" onClick={register} className="btn bg-gray-700 hover:bg-gray-800 tex-white font-bold rounded-l-none p-1">
                        <svg className="w-6 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <path d="M21.9998 5.11V16.47C21.9998 17.92 20.9598 18.53 19.6898 17.83L17.7598 16.75C17.5998 16.66 17.4998 16.49 17.4998 16.31V8.99C17.4998 6.45 15.4298 4.38 12.8898 4.38H8.81984C8.44984 4.38 8.18984 3.99 8.35984 3.67C8.87984 2.68 9.91984 2 11.1098 2H18.8898C20.5998 2 21.9998 3.4 21.9998 5.11Z" fill="#ffffff"/> <path d="M12.89 5.87891H5.11C3.4 5.87891 2 7.27891 2 8.98891V20.3489C2 21.7989 3.04 22.4089 4.31 21.7089L8.24 19.5189C8.66 19.2889 9.34 19.2889 9.76 19.5189L13.69 21.7089C14.96 22.4089 16 21.7989 16 20.3489V8.98891C16 7.27891 14.6 5.87891 12.89 5.87891ZM11 12.7489H9.75V13.9989C9.75 14.4089 9.41 14.7489 9 14.7489C8.59 14.7489 8.25 14.4089 8.25 13.9989V12.7489H7C6.59 12.7489 6.25 12.4089 6.25 11.9989C6.25 11.5889 6.59 11.2489 7 11.2489H8.25V9.99891C8.25 9.58891 8.59 9.24891 9 9.24891C9.41 9.24891 9.75 9.58891 9.75 9.99891V11.2489H11C11.41 11.2489 11.75 11.5889 11.75 11.9989C11.75 12.4089 11.41 12.7489 11 12.7489Z" fill="#ffffff"/> </g>
                        </svg>
                    </button>
                </div>
            </div>
            {showBloc && 
                <>
                    <div className="w-full h-72 p-6 shadow-lg bg-white relative">
                        <h1 className="w-32 text-center bg-gray-100 text-gray-800 px-2 py-2 text-xl">Description</h1>
                        <div className="mt-4 text-justify">
                            <p className="pb-4">{activity.description}</p>
                            {activity.montant === 0    ?
                                <span className="absolute bottom-20 right-6"><span className="line-through font-semibold">0 DH</span> <span className="bg-green-100 px-3 pb-1 rounded-none">gratuit</span></span>
                                                            :  
                                <span className="absolute bottom-20 right-6"><span>{activity.montant} DH</span> <span className="bg-gray-100 px-3 pb-1 rounded-none">Réservez votre place</span></span>
                            }
                            <div className="border-gray-700 border-b-2 absolute bottom-16 left-0 w-full"></div>
                            <button type="button" onClick={register} className="btn w-20 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl p-2 absolute bottom-2 right-6">
                                <svg className="w-6 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <path d="M21.9998 5.11V16.47C21.9998 17.92 20.9598 18.53 19.6898 17.83L17.7598 16.75C17.5998 16.66 17.4998 16.49 17.4998 16.31V8.99C17.4998 6.45 15.4298 4.38 12.8898 4.38H8.81984C8.44984 4.38 8.18984 3.99 8.35984 3.67C8.87984 2.68 9.91984 2 11.1098 2H18.8898C20.5998 2 21.9998 3.4 21.9998 5.11Z" fill="#4A5568"/> <path d="M12.89 5.87891H5.11C3.4 5.87891 2 7.27891 2 8.98891V20.3489C2 21.7989 3.04 22.4089 4.31 21.7089L8.24 19.5189C8.66 19.2889 9.34 19.2889 9.76 19.5189L13.69 21.7089C14.96 22.4089 16 21.7989 16 20.3489V8.98891C16 7.27891 14.6 5.87891 12.89 5.87891ZM11 12.7489H9.75V13.9989C9.75 14.4089 9.41 14.7489 9 14.7489C8.59 14.7489 8.25 14.4089 8.25 13.9989V12.7489H7C6.59 12.7489 6.25 12.4089 6.25 11.9989C6.25 11.5889 6.59 11.2489 7 11.2489H8.25V9.99891C8.25 9.58891 8.59 9.24891 9 9.24891C9.41 9.24891 9.75 9.58891 9.75 9.99891V11.2489H11C11.41 11.2489 11.75 11.5889 11.75 11.9989C11.75 12.4089 11.41 12.7489 11 12.7489Z" fill="#4A5568"/> </g>
                                </svg>
                            </button>
                            <button type="button" onClick={toggleBloc} className="btn w-20 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl p-2  absolute bottom-2 left-6">
                                <svg className="w-7 mx-auto" viewBox="-1.6 -1.6 19.20 19.20" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" strokeWidth="0.00016" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.736"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ActivityDetails;
