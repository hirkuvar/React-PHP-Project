import React, {Component} from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
    
class Users extends Component {
    constructor() {
        super();
        this.state = { users: [], loading: true};
    }
    componentDidMount() {
        this.getUsers();
    }
    
    getUsers() {
        axios.get(`http://localhost:8000/api/users`).then(users => {
            this.setState({ users: users.data, loading: false})
        })
    }
    
    render() {
        const loading = this.state.loading;
        return(
            <div className="data-section"> 
                <SearchBar />

                <h1>List Users</h1>
                { loading ? ( 
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>
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
                    { this.state.users.map((user, key) =>
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
    }
}
export default Users;