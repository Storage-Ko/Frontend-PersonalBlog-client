import style from './Profile.module.css'
import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react';

interface ProfileInterface {
    avatar_url: String,
    bio: String,
    company: String,
    created_at: Date,
    email: String,
    html_url: String,
    id: String,
    location: String,
    login: String,
    name: String,
    updated_at: Date,
    _id: String,
}

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const PreLoad = async() => {
        await axios.get(`http://122.34.166.121:5010/crawl/profile`)
        .then(res => {
            setProfile(res.data[0]);
            console.log(res.data[0]);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        PreLoad();
    }, []);
    
    return (
        <div style={{ width: 1000, height: 2000 }}>
            <Head>
                <title>NEON | Profile</title>
            </Head>
            {isLoading && (
               
                    <div style={{ padding: "300px 0" }}>
                      <Loader inline="centered" active>
                        Loading
                      </Loader>
                    </div>
              
            )}
            {!isLoading && (
                <div>
                    <img className={style.img} src={profile.avatar_url}></img>
                </div>
            )}
        </div>
    )
}