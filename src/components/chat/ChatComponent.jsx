import "./chatComponent.css";

export function ChatComponent(){

    
    return(
        <div className="box">
                <div className="users-box">
                    <div className="search-bar"></div>
                    <header className="message">Messages</header>
                </div>
                <div className="message-box"></div>
        </div>
    )
}