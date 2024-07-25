import React from 'react';
import Header from './header';
import {userId,username} from './session';


function Home(){
    return(<>
    <Header/>
    hello
    <h1>{userId}</h1>
        <h1>welcome={username}</h1>
        </>);
       }
export default Home;