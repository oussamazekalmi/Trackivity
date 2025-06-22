import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Archive = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [filter, setFilter] = useState("latest");

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:3000/activities');
                const allActivities = await response.json();

                const date = new Date()
                const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
               
                const userRole = localStorage.getItem('role')
                const userId = localStorage.getItem('id')

                const filteredActivities = allActivities.filter( 
                    activity => {
                        return activity?.dateFin < today
                    }
                );
                if (userRole === 'stagiaire') {
                    const registrationsResponse = await fetch('http://localhost:3000/registrations');
                    const registrations = await registrationsResponse.json();
                    const userActivityIds = registrations
                        .filter(registration => registration.userId === userId)
                        .map(registration => registration.activityId);

                    const userActivities = filteredActivities.filter(activity => userActivityIds.includes(activity.id));
                    setActivities(userActivities);
                } else {
                    setActivities(filteredActivities);
                }
            }
            catch (error) {
                console.error('Erreur lors du chargement des données des activités:', error);
            }
        }
        fetchActivities()
    }, []);

    const edit = (id) => {
        navigate('/activities/' + id + '/updateActivity');
    }

    const destroy = async (id) => {
        try {
            await axios.delete('http://localhost:3000/activities/' + id).then(
                setActivities(activities.filter(activity => activity.id !== id))
            )
            
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'activité:', error);
        }
    }

    const view = (id) => {
        navigate('/activities/' + id + '/detailsActivity');
    }

    const sortActivities = (a, b) => {
        if (filter === "latest") {
            return new Date(b.created_at) - new Date(a.created_at);
        } else {
            return new Date(a.created_at) - new Date(b.created_at);
        }
    };
    
    return (
        <main className="max-w-full h-full flex bg-gray-100">
            <div className="w-full pb-20 pl-6 m-6 flex flex-col">
                <div className="flex justify-end mb-4">
                    <button className={`mr-2 px-3 py-1 rounded ${filter === 'latest' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilter('latest')}>Nouveaux</button>
                    <button className={`px-3 py-1 rounded ${filter === 'oldest' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilter('oldest')}>Anciennes</button>
                </div>

                <div className="flex flex-wrap pb-5 items-start justify-start gap-x-4 gap-y-6 overflow-y-scroll">
                    {activities?.sort(sortActivities).map((activity) => (
                        <div key={activity.id} className="w-72 h-96 flex-shrink-0 shadow-gray-400 bg-white shadow-lg rounded-md"  style={{position:"relative"}} >
                            <img className="w-full h-48 object-cover rounded-t-md" src={activity.photo ? `/ActivitiesPhotos/${activity.photo}` : '/ActivitiesPhotos/Blank.jpg'} alt={activity.photo ? "Photo descriptive de l'activité" : "Aucune photo disponible"} />
                            <h1 className="bg-gray-100 p-2 font-extralight text-lg">{activity.name}</h1>
                            <p className="text-gray-800 font-light m-4 flex">
                                <svg className="w-7 mr-4" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                        <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" fill="#a0a8af" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0"/>
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <path d="M22 7.99992V11.9999M10.25 5.49991H6.8C5.11984 5.49991 4.27976 5.49991 3.63803 5.82689C3.07354 6.11451 2.6146 6.57345 2.32698 7.13794C2 7.77968 2 8.61976 2 10.2999L2 11.4999C2 12.4318 2 12.8977 2.15224 13.2653C2.35523 13.7553 2.74458 14.1447 3.23463 14.3477C3.60218 14.4999 4.06812 14.4999 5 14.4999V18.7499C5 18.9821 5 19.0982 5.00963 19.1959C5.10316 20.1455 5.85441 20.8968 6.80397 20.9903C6.90175 20.9999 7.01783 20.9999 7.25 20.9999C7.48217 20.9999 7.59826 20.9999 7.69604 20.9903C8.64559 20.8968 9.39685 20.1455 9.49037 19.1959C9.5 19.0982 9.5 18.9821 9.5 18.7499V14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </g>
                                </svg>
                                À partir du &nbsp;{activity.dateDebut}
                            </p>
                            <p className="text-gray-800 font-light m-4 flex">
                                <svg className="w-7 mr-4" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                        <path transform="translate(-2.4, -2.4), scale(1.7999999999999998)" fill="#a0a8af" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0"/>
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H13.5M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"/>
                                    </g>
                                </svg>
                                À &nbsp;{activity.location}
                            </p>
                            <div className="w-64 flex justify-center mx-auto relative bottom-12">
                                <button type="button" onClick={() => edit(activity.id)} className="btn bg-gray-300 hover:bg-gray-400 text-white font-bold rounded-r-none p-0">
                                    <svg className="w-6 h-6 mx-auto" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"/>
                                        <g id="SVGRepo_iconCarrier"> <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H20C20.4142 21.25 20.75 21.5858 20.75 22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22Z" fill="#f7f7f7"/> <path opacity="0.5" d="M19.0807 7.37162C20.3095 6.14279 20.3095 4.15046 19.0807 2.92162C17.8519 1.69279 15.8595 1.69279 14.6307 2.92162L13.9209 3.63141C13.9306 3.66076 13.9407 3.69052 13.9512 3.72066C14.2113 4.47054 14.7022 5.45356 15.6256 6.37698C16.549 7.30039 17.532 7.79126 18.2819 8.05142C18.3119 8.06183 18.3415 8.07187 18.3708 8.08155L19.0807 7.37162Z" fill="#f7f7f7"/> <path d="M13.9511 3.59961L13.9205 3.63017C13.9303 3.65952 13.9403 3.68928 13.9508 3.71942C14.211 4.4693 14.7018 5.45232 15.6252 6.37574C16.5487 7.29915 17.5317 7.79002 18.2816 8.05018C18.3113 8.0605 18.3407 8.07046 18.3696 8.08005L11.5198 14.9299C11.058 15.3917 10.827 15.6227 10.5724 15.8213C10.2721 16.0555 9.94711 16.2564 9.60326 16.4202C9.31177 16.5591 9.00196 16.6624 8.38235 16.869L5.11497 17.9581C4.81005 18.0597 4.47388 17.9804 4.24661 17.7531C4.01934 17.5258 3.93998 17.1897 4.04162 16.8847L5.13074 13.6173C5.33728 12.9977 5.44055 12.6879 5.57947 12.3964C5.74334 12.0526 5.94418 11.7276 6.17844 11.4273C6.37702 11.1727 6.60794 10.9418 7.06971 10.48L13.9511 3.59961Z" fill="#f7f7f7"/> </g>
                                    </svg>
                                </button>
                                <button type="button" onClick={() => view(activity.id)} className="btn bg-gray-300 hover:bg-gray-400 border-r-2 border-l-2 border-gray-400 text-white font-bold rounded-none p-0">
                                    <svg className="w-8 h-8 mx-auto" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" strokeWidth="0.9600000000000002">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.624"/>
                                        <g id="SVGRepo_iconCarrier"> <path d="M18.4379 10.8112C18.6892 11.2462 18.8149 11.4637 18.8149 12C18.8149 12.5363 18.6892 12.7538 18.4379 13.1888C17.5834 14.6675 15.6561 17 12 17C8.34394 17 6.41663 14.6675 5.56211 13.1888C5.31076 12.7538 5.18508 12.5363 5.18508 12C5.18508 11.4637 5.31076 11.2462 5.56211 10.8112C6.41663 9.33247 8.34394 7 12 7C15.6561 7 17.5834 9.33247 18.4379 10.8112Z" fill="#d1d1d1" fillOpacity="0.24"/> <circle cx="12" cy="12" r="3" fill="#ebebeb"/> <path d="M17.5 3.5H17.7C19.4913 3.5 20.387 3.5 20.9435 4.0565C21.5 4.61299 21.5 5.50866 21.5 7.3V7.5M17.5 20.5H17.7C19.4913 20.5 20.387 20.5 20.9435 19.9435C21.5 19.387 21.5 18.4913 21.5 16.7V16.5M6.5 3.5H6.3C4.50866 3.5 3.61299 3.5 3.0565 4.0565C2.5 4.61299 2.5 5.50866 2.5 7.3V7.5M6.5 20.5H6.3C4.50866 20.5 3.61299 20.5 3.0565 19.9435C2.5 19.387 2.5 18.4913 2.5 16.7V16.5" stroke="#d1d1d1" strokeOpacity="0.24" strokeLinecap="round"/> </g>
                                    </svg>
                                </button>
                                <button type="button" onClick={() => destroy(activity.id)}  className="btn bg-gray-300 hover:bg-gray-400 text-white font-bold rounded-l-none p-0">
                                    <svg className="w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                        <g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" fill="#fff"/> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" fill="#fff"/> </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Archive;
