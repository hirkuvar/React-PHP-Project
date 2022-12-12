import React, {useState} from 'react';
import axios from 'axios';


const searchBar = () => {

    const [searchInput, setSearchInput] = useState("");
    const [searchedUser, setsearchedUser] = useState({});
    const [initState, setinitState] = useState(true);
    const [isEmpty, setisEmpty] = useState();

    const handleChange = (e) => {
    setSearchInput(e.target.value);
    };

    const searchUser = () => {
        axios.get(`https://swapi.dev/api/people/`, {
            params: {search: searchInput},
        }).then(function(response) {
            if (response.data.count > 0 ) {
                setsearchedUser(response.data.results);
                setinitState(false);
                setisEmpty(false);
            } else {
                setisEmpty(true);
                setinitState(false);
            }
        });
    };

    return ( 
        <div className="data-section">
            <h1>Search User</h1>
                <input
                    type="search"
                    placeholder="Search here"
                    onChange={handleChange}
                />
            <button 
                onClick={searchUser} 
                disabled={!searchInput}>
                    Submit
            </button>
            { initState ? ( 
                    <p> Enter name to search for user. </p>
                ) : isEmpty ? (
                    <p> User not found. </p>  
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>HEIGHT</th>
                                <th>MASS</th>
                                <th>HAIR_COLOR</th>
                            </tr>
                        </thead>
                    <tbody>
                    { searchedUser.map((user, key) =>
                        <tr key={key} > 
                            <td>{user.name}</td>
                            <td>{user.height}</td>
                            <td>{user.mass}</td>
                            <td>{user.hair_color}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )} 
        </div>
    )
};

export default searchBar;








