import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../styles/dateForm.css'

const DateForm = () => {

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [isChineseSign, setIsChineseSign] = useState(false)
    const [horoscopeInfo, setHoroscopeInfo] = useState('');
    const [isError, setIsError] = useState(false)

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.get(`http://localhost:3000/horoscope?birthdate=${year}-${month}-${day}`);
                setIsError(false)
                setHoroscopeInfo(response.data);
            } catch (error) {
                setIsError(true)
                console.error('Error fetching horoscope:', error);
                
            }

   
    };

    const renderZodiacText = () => {
      

        if (isError === true) {
            return  <span className='date-form-error'>DATE IS INVALID</span>
        }

        if (isChineseSign === true ) {
            return <span> Your zodiac sign depending on chinese calendar is {horoscopeInfo.zodiacSign}</span>
        }

        if (horoscopeInfo) {

        return  <span> Your zodiac sign is {horoscopeInfo.astroSign}</span>



        }

        


    }

    console.log(horoscopeInfo)

    return (
        <div>
            <h2>Enter Your Birthday</h2>

            <span> Date must be with the format YYYY-MM-DD</span>
          
            <form onSubmit={handleSubmit} className='date-form-form-container'>
                <label>
                    Year:
                    <input type="number" placeholder='1999' className='date-form-text-input' value={year} onChange={(e) => setYear(e.target.value)} />
                </label>
                <label>
                    Month:
                    <input type="number" placeholder='01' className='date-form-text-input' value={month} onChange={(e) => setMonth(e.target.value)} />
                </label>
                <label>
                    Day:
                    <input type="number" placeholder='01' className='date-form-text-input' value={day} onChange={(e) => setDay(e.target.value)} />
                </label>

               <div>
                  <input type='radio'  className='date-form-radio-container'
                         id='chinese-sign' 
                         checked={isChineseSign}
                         onClick={() => setIsChineseSign(!isChineseSign)} 
                  />
                  <span>I need my zodiac sign depending on chinese calendar</span>
               </div>
                <button className='date-form-button' type="submit"> 
                    <span className='data-form-button-label'> Get my zodiac sign </span>
                </button>
            </form>

            {renderZodiacText()}
         
        </div>
    );
}


export default DateForm;