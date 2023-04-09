import React, { useState, useEffect } from "react";
import axios from "axios";
import companyLogo from "./eastvantage.jpeg";

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
}

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api");
        const user = response.data.results[0];
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    const response = await axios.get("https://randomuser.me/api");
    const user = response.data.results[0];
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };
 if (isLoading) {
   return <div className="loader">Loading...</div>;
 }
 

  return (
    <div>
      <header>
        <img src={companyLogo} alt="logo" />
        
      </header>

      <div className="container">
        <h1>
          {user?.name.title} {user?.name.first} {user?.name.last}
        </h1>
        <p>{user?.email}</p>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </div>
  );
};

export default UserDetails;
