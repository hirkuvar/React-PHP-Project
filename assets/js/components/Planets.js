import React, {Component} from 'react';
import axios from 'axios';
    
    
class Planets extends Component {
    constructor() {
        super();
        
        this.state = { planets: [], loading: true}
    }
    
    componentDidMount() {
        this.getPlanets();
    }
    
    getPlanets() {
        axios.get(`http://localhost:8000/api/planets`).then(planets => {
           this.setState({ planets: planets.data, loading: false})
       })
    }
    
    render() {
        const loading = this.state.loading;
        return (
            <div className="data-section"> 
                <h1>List Planets</h1>
                { loading ? ( 
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>ROTATION_PERIOD</th>
                                <th>ORBITAL_PERIOD</th>
                                <th>DIAMETER</th>
                                <th>CLIMATE</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.planets.map((planet, key) =>
                            <tr key={key} > 
                                <td>{planet.name}</td>
                                <td>{planet.rotation_period}</td>
                                <td>{planet.orbital_period}</td>
                                <td>{planet.diameter}</td>
                                <td>{planet.climate}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }
}
    
export default Planets;