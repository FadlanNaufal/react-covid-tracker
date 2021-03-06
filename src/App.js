import React from 'react'
import { Cards, CountryPicker, Chart } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

class App extends React.Component{

    state = {
        data : {},
        country : ''
    }

    async componentDidMount() {
        const data = await fetchData()
        console.log(data)

        this.setState({
            data : data
        })
    }

    handleCountryChange = async(country) =>{
        const fetchedData = await fetchData(country)
        console.log(fetchedData)
       
        this.setState({
            data : fetchedData,
            country : country
        })
    }

    render(){

        const {data,country} = this.state

        return(
            <div className={styles.container}>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App

