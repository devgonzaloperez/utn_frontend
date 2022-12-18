import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosPrivateInstance } from "../../services/axios";


export const Users = () => {

    const [users, setUsers] = useState();

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () =>{
            try{
                const response = await axiosPrivateInstance.get('/users');
                isMounted && setUsers(response.data);
            }
            catch(error){
                console.log(error);
            }
        }
        getUsers();
        return () =>{
            isMounted = false;
            controller.abort();
        }
    }, []) //Replace with react query!!!

    return (
        <article>
            <h2>Users List</h2>
            {
                users?.length 
                    ? <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li> )}
                    </ul>
                    : <h3>No hay usuarios aún!</h3>
            }
            <Link to='/home'>
                Volver a home
            </Link>
        </article>
    )
};