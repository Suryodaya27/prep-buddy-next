import React ,{useEffect,useState} from 'react'

export function user() {
    const [user, setUser] = useState("");
    useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    } else {
      // Token does not exist, set the user to null
      setUser(null);
    }
  }, []);

  return user;
  
}

