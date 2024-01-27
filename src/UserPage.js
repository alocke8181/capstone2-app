import React, {useState, useEffect} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Navigate, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import checkAuthOrAdmin from "./Helpers";

const UserPage = () =>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {id} = useParams();
    const nav = useNavigate()

    const [loading, setLoading] = useState(false); //Change to true once chars are implemented

    //const [userJobs, setUserJobs] = useState([])


    useEffect(()=>{
        console.log(checkAuthOrAdmin(user,id));
        if(!checkAuthOrAdmin(user, id)){
            nav('/403');
        }
        //Repurpose to load characters
        // setLoading(true);
        // console.log(loading);
        // let userJobs = []
        // let promises = [];
        // user.jobs.forEach((jobID)=>{
        //     promises.push(JoblyApi.get(`/jobs/${jobID}`,{}, localStorage.getItem('token')))
        // })
        // Promise.allSettled(promises).then((results)=>{
        //     results.forEach((result)=>{
        //         userJobs.push(result.value.data.job);
        //     });
        //     setLoading(false);
        //     setUserJobs(userJobs);
        // });
    },[])


    return(
        <>
            <Card>
                <CardHeader>
                    <h1>{user.username}</h1>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        <ListGroupItem key='email'>
                            Email: {user.email}
                        </ListGroupItem>
                        <ListGroupItem key='editLink'>
                            <Link to={`/users/${user.id}/edit`}>Edit Profile</Link>
                        </ListGroupItem>
                        {/* <ListGroupItem>
                            {loading ? <p><b>Loading Jobs...</b></p> :
                                <>{userJobs.map((job)=>(
                                    <ListGroupItem key={job.id} style={{border:'2px solid black'}}>
                                        <JobCard job={job} />
                                    </ListGroupItem>))}
                                </> 
                            }
                        </ListGroupItem> */}
                    </ListGroup>
                </CardBody>
            </Card>
        </>

    )
}

export default UserPage;