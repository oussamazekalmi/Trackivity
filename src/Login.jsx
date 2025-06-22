import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import App from './App.module.css';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.getItem('username') && navigate('/activities')
      }, [navigate])

    useEffect(()=>{
        isSubmitted && navigate('/activities')
      }, [navigate, isSubmitted])

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erreur lors du chargement des données des utilisateurs:', error));
    }, []);

    const onSubmit = data => {
        const user = users.find(user => user.username === data.username && user.password === data.password);
        if (user && (data.username != '' && data.password != '')) {
            // Authentification réussie, créer le cookie et rediriger vers la page de tableau de bord
            localStorage.setItem('id',user.id);
            localStorage.setItem('username',user.username);
            localStorage.setItem('role',user.role);
            localStorage.setItem('fonction',user.fonction);
            localStorage.setItem('mail',user.email);
            localStorage.setItem('phone',user.telephone_stagiaire);
            localStorage.setItem('parent_phone',user.telephone_parent);
            localStorage.setItem('adresse',user.adresse);
            localStorage.setItem('genre',user.genre);
            localStorage.setItem('nom',user.nom);
            localStorage.setItem('prenom',user.prenom);
        } else {
            // Authentification échouée, afficher un message d'erreur
            setError('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    };


    return (
        <>
            <div className={App.background}>
                <div className={App.shape}></div>
                <div className={App.shape}></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Se connecter</h3>

                <label htmlFor="username">Nom d&apos; utilisateur</label>
                <input type="text" className='rounded-md px-3' placeholder="Nom d'utilisateur" id="username" {...register('username', { required: 'Ce champ est requis.' })} />
                {errors.username && <span>{errors.username.message}</span>}

                <label htmlFor="password">Mot de passe</label>
                <input type="password" className='rounded-md px-3' placeholder="Mot de passe" id="password" {...register('password', { required: 'Ce champ est requis.' })} />
                {errors.password && <span>{errors.password.message}</span>}

                {error && <span>{error}</span>}

                <button type="submit" className="mt-10 hover:bg-gray-300 bg-gray-100 py-2">Connexion</button>
                <a onClick={() => navigate('/')} className="absolute bottom-16 right-8 hover:underline hover:text-gray-300 transition-colors cursor-pointer duration-300">
                    Mot de passe oublié ?
                </a>
            </form>
        </>
    );
}
