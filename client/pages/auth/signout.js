import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Router from 'next/router'

import useRequest from '../../hooks/use-request'

const SignOut = () => {
    const router = useRouter();
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => router.push('/'),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div> Signing Out... </div>;
};

export default SignOut;
