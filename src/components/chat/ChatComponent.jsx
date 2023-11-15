import React, { useEffect, useState } from "react";
import ChatService from "../../services/ChatService";
import AccountService from "../../services/AccountService";

export function ChatComponent() {
    const [email, setEmail] = useState(null);
    const [chat, setChat] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [accountNames, setAccountNames] = useState([]);
    const [error, setError] = useState(null);

    function submitHandler(e) {
        e.preventDefault();
        handleGetUser(email);
    }

    function handleGetUser(toEmail) {
        ChatService.getUserConversation(toEmail)
            .then((res) => {
                const chatArray = res.data;

                if (chatArray.length > 0) {
                    setChat(chatArray);
                    setError(null); // Clear any previous errors
                } else {
                    setError("No messages found");
                }
            })
            .catch((error) => {
                setError("Error fetching messages");
                console.error("Error fetching messages:", error);
            });
    }

    function fetchAccountNames() {
        ChatService.getAllUsers()
            .then((res) => {
                setAccountNames(res.data);
                console.log(accountNames);
            })
            .catch((error) => {
                setError("Error fetching account names");
                console.error("Error fetching account names:", error);
            });
    }

    useEffect(() => {
        fetchAccountNames();
    }, []);

    // New function to handle user selection
    const handleUserSelection = (selectedAccount) => {
        const toEmail = selectedAccount.email;
        console.log("toEmail="+toEmail);
        handleGetUser(toEmail);
        setSelectedUser(selectedAccount);
        setChat([]);
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
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    chat.map((message) => (
                        <div key={message.id} className="message-row">
                            <strong>{message.fromAccount.name}:</strong> {message.message}
                        </div>
                    ))
                )}
                <form className="text-box" onSubmit={submitHandler}>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" />
                    <label className="text"></label>
                </form>
            </div>
        </div>
    );
}
