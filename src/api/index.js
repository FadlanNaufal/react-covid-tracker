import axios from 'axios'

const URL = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changeableURL = URL

    if(country){
        changeableURL = `${URL}/countries/${country}`
    }

    try {
        const {data} = await axios.get(changeableURL);

        const modifiedData = {
            confirmed : data.confirmed,
            recovered : data.recovered,
            deaths : data.deaths,
            lastUpdate : data.lastUpdate,
        }

        return modifiedData
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async() =>{
    try {
        const {data} = await axios.get( `${URL}/daily` );

        const modifiedData = data.map((dailyData)=>({
            confirmed : dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            recovered : dailyData.recovered.total,
            date : dailyData.reportDate,
        }))

        return modifiedData

    } catch (error) {
        console.log(error)
    }
}

export const fetchCountryData = async () =>{
    try {
        const { data : {countries}} = await axios.get(`${URL}/countries`)
        return countries.map((country)=> country.name)
    } catch (error) {
        console.log('country error',error)
    }
}