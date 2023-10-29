import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

import useRequest from '../../hooks/use-request'

export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [errors, setErrors] = useState([])
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest()

        // try {
        //     const response = await axios.post('/api/users/signup', {
        //         email, password
        //     })

        //     console.log(response.data)
        // } catch (error) {
        //     setErrors(error.response.data.errors)
        // }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email</label>
                <input
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            {
                // errors.length > 0 && (
                //     <div className="alert alert-danger">
                //         <h4>Ooops.....</h4>
                //         <ul className='my-0'>

                //             {errors.map(err => (
                //                 <li key={err.message}>{err.message}</li>
                //             ))}
                //         </ul>
                //     </div>
                // )

                errors
            }
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}