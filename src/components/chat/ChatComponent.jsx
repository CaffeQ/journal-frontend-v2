import React, { useEffect, useState } from "react";
import ChatService from "../../services/ChatService";
import AccountService from "../../services/AccountService";

export function ChatComponent() {
    const [email, setEmail] = useState(null);
    const [chat, setChat] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // New state to keep track of the selected user
    const [accountNames, setAccountNames] = useState([]);

    function handleGetChats() {}

    function submitHandler(e) {
        e.preventDefault();
        handleGetUser(email);
    }

    function handleGetUser() {
        ChatService.getUser()
            .then((res) => {
                const chatArray = res.data;

            if (chatArray.length > 0) {
                setChat(chatArray);
                console.log(chatArray);
            } else {
                console.error("No users found");
            }
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    }

    function fetchAccountNames() {
        ChatService.getAllUsers()
            .then((res) => {
                setAccountNames(res.data);
            })
            .catch((error) => {
                console.error("Error fetching account names:", error);
            });
    }

    useEffect(() => {
        fetchAccountNames();
    }, []);
    useEffect(() => {
        handleGetUser();
    }, [accountNames]);
    

    // New function to handle user selection
    const handleUserSelection = (selectedAccount) => {
        handleGetUser(selectedAccount.email);
        setSelectedUser(selectedAccount);
    };

    return (
        <div className="box">
            <div className="users-box">
                <div className="search-bar"></div>
                <header className="message">Messages</header>
                {accountNames.length > 0 && (
                    <div className="user-boxes">
                        {accountNames.map((account) => (
                            <div
                                key={account.id}
                                className={`user-box ${selectedUser === account.id ? "selected" : ""}`}
                                onClick={() => handleUserSelection(account)}
                            >
                                {account.name}
                            </div>
                        ))}
                    </div>
                )}
            
            </div>
            <div className="message-box">
            {chat.map((message) => (
                    <div key={message.id} className="message-row">
                        <strong>{message.fromAccount.name}:</strong> {message.message}
                    </div>
                ))}
                <form className="text-box" onSubmit={submitHandler}>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" />
                    <label className="text"></label>
                </form>
            </div>
        </div>
    );
}
