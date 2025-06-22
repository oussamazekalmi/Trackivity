import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const UpdateActivity = () => {

    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/activities/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des données des activités');
                }
                return response.json();
            })
            .then(data => {
                setActivity(data);
                setNom(data.name);
                setDescription(data.description);
                setDateDebut(data.dateDebut);
                setTempsDebut(data.tempsDebut);
                setDateFin(data.dateFin);
                setTempsFin(data.tempsFin);
                setLocation(data.location);
                setMontant(data.montant);
                setEncadrent(data.encadrent);
            })
            .catch(error => console.error('Erreur lors du chargement des données des activités:', error));
    }, [id]);

    const navigate = useNavigate()

    const [activity, setActivity] = useState({
        name: '',
        description: '',
        dateDebut: '',
        tempsDebut: '',
        dateFin: '',
        tempsFin: '',
        location: '',
        montant: 0,
        encadrent: '',
        photo: ''
    });
    const [file, setFile] = useState(null)
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [dateDebut, setDateDebut] = useState('')
    const [tempsDebut, setTempsDebut] = useState('')
    const [dateFin, setDateFin] = useState('')
    const [tempsFin, setTempsFin] = useState('')
    const [location, setLocation] = useState('')
    const [montant, setMontant] = useState(0)
    const [encadrent, setEncadrent] = useState('')



    const handleFileChange = (event) => setFile(event.target.files[0])
    const handleNameChange = (event) => setNom(event.target.value)
    const handleDescriptionChange = (event) => setDescription(event.target.value)
    const handleDateDebutChange = (event) => setDateDebut(event.target.value)
    const handleTempsDebutChange = (event) => setTempsDebut(event.target.value)
    const handleDateFinChange = (event) => setDateFin(event.target.value)
    const handleTempsFinChange = (event) => setTempsFin(event.target.value)
    const handleLocationChange = (event) => setLocation(event.target.value)
    const handleMontantChange = (event) => setMontant(event.target.value)
    const handleEncadrentChange = (event) => setEncadrent(event.target.value)

    const randomString = () => {
        const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let segments = []
        for (let i = 0; i < 5; i++) {
            let segment = ""
            for (let j = 0; j < 10; j++) {
                segment += string.charAt(
                    Math.floor(Math.random() * string.length)
                )
            }
            segments.push(segment)
        }
        return segments.join("")
    }

    const handleUpload = async () => {
        try {
            const field = randomString() + ".png";

            const date = new Date()
            const updated_at = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            
            const updatedActivity = {
                ...activity,
                name: nom,
                description: description,
                dateDebut: dateDebut,
                tempsDebut: tempsDebut,
                dateFin: dateFin,
                tempsFin: tempsFin,
                location: location,
                montant: montant,
                encadrent: encadrent,
                photo: file ? field : activity.photo,
                statut: "Validée",
                updated_at: updated_at
            };
    
            await axios.put(`http://localhost:3000/activities/${activity.id}`, updatedActivity)
                .then(() => navigate('/activities'));
    
            if (file) {
                const data = new FormData();
                data.append("filename", field);
                data.append("image", file);
    
                await axios.post("http://localhost:3001/upload", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
        } catch (error) {
            console.error("Une erreur est survenue lors de l'upload de la photo ou de la mise à jour de l'activité:", error);
        }
    };
    

    return (
        <div className="min-h-screen px-6 py-0 rounded-none bg-white overflow-y-scroll">
            <div className="bg-white shadow-sm py-0 px-4 md:p-8 mb-2">
                <div className="grid rounded-none text-sm grid-cols-0 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">{}</p>
                        <p>Veuillez remplir tous les champs.</p>
                    </div>

                    <div className="lg:col-span-2 mb-3">
                        <div className="grid gap-6 gap-y-0 text-sm grid-cols-1 md:grid-cols-5 mb-2">
                            <div className="md:col-span-5">
                                <label htmlFor="name">Le libellé d&apos; activité</label>
                                <input type="text" name="name" id="name" defaultValue={activity?.name} onChange={handleNameChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" defaultValue={activity?.description} onChange={handleDescriptionChange} className="h-20 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50"></textarea>
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="dateDebut">Date de début</label>
                                <input type="text" name="dateDebut" id="dateDebut" defaultValue={activity?.dateDebut} onChange={handleDateDebutChange}  className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="dateDebut">Temps de début</label>
                                <input type="time" name="dateDebut" id="dateDebut" defaultValue={activity?.tempsDebut} onChange={handleTempsDebutChange}  className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="dateFin">Date de Fin</label>
                                <input type="text" name="dateFin" id="dateFin" defaultValue={activity?.dateFin} onChange={handleDateFinChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="dateDebut">Temps de Fin</label>
                                <input type="time" name="dateDebut" id="dateDebut" defaultValue={activity?.tempsFin} onChange={handleTempsFinChange}  className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="location">Lieu d&apos; activté</label>
                                <input type="text" name="location" id="location" defaultValue={activity?.location} onChange={handleLocationChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="montant">Le montant d&apos; activté</label>
                                <input type="number" name="montant" id="montant" defaultValue={activity?.montant} onChange={handleMontantChange}   className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="encadrent">L&apos; encadrent d&apos; activté</label>
                                <input type="text" name="encadrent" id="encadrent" defaultValue={activity?.encadrent} onChange={handleEncadrentChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>
                            <div className="md:col-span-2 bottom-2">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="relative col-span-2">
                                        <label htmlFor="fileInput" className="block w-full shadow-sm cursor-pointer rounded-none">
                                            Choisir une photo<input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
                                                <div className="flex items-center justify-center px-4 py-2 bg-white border-b-2 border-r-2 border-gray-700">
                                                    <svg className="shadow-sm w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                    </svg>
                                                    <span className="ml-2 text-sm font-medium text-gray-700">Choisir un fichier</span>
                                                </div>
                                                <div className="col-span-2">{file ? <span className="text-sm text-gray-700 border-b">{file.name}</span> : <a href={`http://localhost:5173/ActivitiesPhotos/${activity.photo}`} className="text-sm text-gray-700">Voir l&apos; image</a>}</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-5 text-right py-2">
                                <button type="submit" onClick={handleUpload} className="mt-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded">Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateActivity