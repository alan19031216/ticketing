import buildClient from "../api/build-client";
import Link from 'next/link'

const LandingPage = ({ currentUser, tickets }) => {
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // });

    // console.log(currentUser)

    // return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                        View
                    </Link>
                </td>
            </tr>
        )
    })
    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    )
};

// LandingPage.getInitialProps = async ({ req }) => {
LandingPage.getInitialProps = async (context, client, currentUser) => {
    // if (typeof window === 'undefined') {
    //     // we are on the server
    //     // request should be made to http://ingress-nginx.ingress-nginx-controller.svc.cluster.local
    //     const { data } = await axios.get(
    //         ' http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    //         {
    //             headers: req.headers
    //         }
    //     )

    //     return data
    // }
    // else {
    //     // We are on the browser
    //     // request can be made with a base url
    //     const { data } = await axios.get('/api/users/currentuser');

    //     return data
    // }


    // return response.data
    // return {}

    // const { data } = await buildClient(context).get('/api/users/currentuser');
    // return data

    const { data } = await client.get('/api/tickets')
    return { tickets: data }
}

export default LandingPage;
