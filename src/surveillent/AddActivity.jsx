import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddActivity = () => {
    useEffect(() => {
        fetch('http://localhost:3000/activities')
            .then(response => response.json())
            .then(data => setActivity(data))
            .catch(error => console.error('Erreur lors du chargement des données des activités:', error))
    }, [])

    const navigate = useNavigate()

    const [activity, setActivity] = useState([])
    const [file, setFile] = useState(null)
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [dateDebut, setDateDebut] = useState(new Date())
    const [tempsDebut, setTempsDebut] = useState('')
    const [dateFin, setDateFin] = useState(new Date())
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
            const field = randomString() + ".png"



            const date = new Date()
            const debut = new Date(dateDebut)
            const fin = new Date(dateFin)

            const formattedDateDebut = `${debut.getFullYear()}-${String(debut.getMonth() + 1).padStart(2, '0')}-${String(debut.getDate()).padStart(2, '0')}`
            const formattedDateFin = `${fin.getFullYear()}-${String(fin.getMonth() + 1).padStart(2, '0')}-${String(fin.getDate()).padStart(2, '0')}`
            const id = activity.length + 1
            const created_at = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

            const newActivity = {       
                "id" : String(id),     
                "name": nom,
                "description": description,
                "dateDebut": formattedDateDebut,
                "tempsDebut" : tempsDebut,
                "dateFin": formattedDateFin,
                "tempsFin" : tempsFin,
                "location": location,
                "statut": "Validée",
                "photo": field,
                "montant": montant,
                "encadrent": encadrent,
                "created_at" : created_at
            }
            
            await axios.post("http://localhost:3000/activities", newActivity).then(
                () => navigate('/activities')
            )

            const data = new FormData()
            data.append("filename", field)
            data.append("image", file)
            await axios.post("http://localhost:3001/upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            
        } 
        catch (error) {
            console.error("An error occurred while uploading the photo:", error)
        }
    }

    return (
        <div className="min-h-screen px-6 py-0 rounded-none bg-white overflow-y-scroll">
            <div className="bg-white shadow-sm py-0 px-4 md:p-8 mb-2">
                <div className="grid gap-4 gap-y-2 rounded-none text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Ajouter une nouvelle activité</p>
                        <p>Veuillez remplir tous les champs.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid gap-6 gap-y-0 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5">
                                <label htmlFor="name">Le libellé d&apos; activité</label>
                                <input type="text" name="name" id="name" onChange={handleNameChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" onChange={handleDescriptionChange}  className="h-16 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50"></textarea>
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="dateDebut">Date de début</label>
                                <input type="date" name="dateDebut" id="dateDebut" onChange={handleDateDebutChange}  className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="dateDebut">Temps de début</label>
                                <input type="time" name="dateDebut" id="dateDebut" onChange={handleTempsDebutChange}  className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="dateFin">Date de Fin</label>
                                <input type="date" name="dateFin" id="dateFin" onChange={handleDateFinChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="dateDebut">Temps de Fin</label>
                                <input type="time" name="dateDebut" id="dateDebut" onChange={handleTempsFinChange}  className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="location">Lieu d&apos; activté</label>
                                <input type="text" name="location" id="location" onChange={handleLocationChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="montant">Le montant d&apos; activté</label>
                                <input type="number" name="montant" id="montant" onChange={handleMontantChange}   className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>

                            <div className="md:col-span-3">
                                <label htmlFor="encadrent">L&apos; encadrent d&apos; activté</label>
                                <input type="text" name="encadrent" id="encadrent" onChange={handleEncadrentChange} className="h-10 font-semibold mt-1 rounded-none px-4 py-2 w-full border-b-2 border-gray-700 outline-none bg-gray-50" />
                            </div>
                            <div className="md:col-span-2">
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
                                                <div className="col-span-2">{file && <span className="text-sm text-gray-700">{file.name}</span>}</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-5 text-right py-4">
                                <button type="submit" onClick={handleUpload} className="mt-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-9 rounded">Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddActivity
