import "./chatComponent.css";
import AccountService from "../../services/AccountService";
import {useEffect, useState} from "react";
import ChatService from "../../services/ChatService";

export function ChatComponent(){
    const [email,setEmail] = useState(null);
    const [user,setUser] = useState(null);

    function handleGetChats(){
        
    }
    function submitHandler(e){
        e.preventDefault();
        handleGetUser(email)
    }
    function handleGetUser(email){
        ChatService.getUser(email).then((res)=>{
            console.log("-------");
            setUser(res.data);
            console.log(res.data);
            console.log("-------");
        });
    }

    useEffect(() =>{
        // handleGetUser(email);
    },[]);

    return(
        <div className="box">
                <div className="users-box">
                    <div className="search-bar">
                    </div>
                    <header className="message">Messages</header>
                    <div>{user && user.name}</div>
                    <div>{user && user.email}</div>
                </div>
                <div className="message-box">
                    <form className="center" onSubmit={submitHandler}>
                        <input onChange={e=> setEmail(e.target.value)} type="text" />
                        <label className="text"></label>
                    </form>
                </div>
        </div>
    )
}