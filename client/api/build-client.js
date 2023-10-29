import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        // request should be made to http://ingress-nginx.ingress-nginx-controller.svc.cluster.local
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    }
    else {
        // We are on the browser
        // request can be made with a base url
        return axios.create({ baseURL: '/' });
    }

}