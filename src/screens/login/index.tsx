import React, {FormEvent} from 'react';
import qs from "qs";
import {cleanObject} from "../../utils";
import {useAuth} from "../../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {
    const {login, user} = useAuth()

    // const login = (param:{username: string, password: string}) => {
    //     fetch(`${apiUrl}/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify(param)
    //     }).then(async response => {
    //         if (response.ok) {
    //         }
    //     })
    // }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        login({username, password})
    }

    return <form onSubmit={handleSubmit}>
        {
            user? <div>
                Logged in, username: {user.name}
                token: {user.token}
            </div> : null
        }

        <div>
            <label htmlFor="username">Username</label>
            <input type="text" id={"username"}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id={"password"}/>
        </div>
        <button type={"submit"}>Log in</button>
    </form>
}