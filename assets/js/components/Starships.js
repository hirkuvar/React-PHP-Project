import React, {Component} from 'react';
import axios from 'axios';
    
    
class Starships extends Component {
    constructor() {
        super();
        
        this.state = { starships: [], loading: true}
    }
    
    componentDidMount() {
        this.getPosts();
    }
    
    getPosts() {
        axios.get(`http://localhost:8000/api/starships`).then(starships => {
           this.setState({ starships: starships.data, loading: false})
       })
    }
    
    render() {
        const loading = this.state.loading;
        return (
            <div className="data-section"> 
                <h1>List Starships</h1>
                { loading ? ( 
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>MODEL</th>
                                <th>MANUFACTURER</th>
                                <th>COST_IN_CREDITS</th>
                                <th>LENGTH</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.starships.map((starship, key) =>
                            <tr key={key} > 
                                <td>{starship.name}</td>
                                <td>{starship.model}</td>
                                <td>{starship.manufacturer}</td>
                                <td>{starship.cost_in_credits}</td>
                                <td>{starship.length}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div> 
        )
    }
}
    
export default Starships;