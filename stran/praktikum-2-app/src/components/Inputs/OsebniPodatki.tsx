import { useContext, useEffect } from "react";
import { PodatkiContext } from "../../App";
import { Podatki } from "../../interface/Podatki";
import { zneskiMesecnihAnuitet } from "../../interface/ZneskiMesecnihAnuitet";


const OsebniPodatki = () =>{

    const {podatkiState, setPodatkiState,setStran,HandleChange} = useContext(PodatkiContext);


    // const HandleChange = (e:any) =>{
    //     const {name,value} = e.target;

    //     setPodatkiState((prevState:any) => ({
    //         ...prevState,
    //         [name]:value,
    //     }))
    // }

    


//----racunanje starosti------
    useEffect(()=>{
        function calculateAge(dateOfBirth:Date) {
            const today = new Date();
            const dob = new Date(dateOfBirth);
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
        
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            return age;
        }
        const age = calculateAge(podatkiState.datumRojstva);

        setPodatkiState({...podatkiState,starost:age})
    }, [podatkiState.datumRojstva])


//------racunanje mesecne anuitete -------
    

    return(
        <div className="vnosItem">
            <h2>Vnos osebnih podatkov</h2>
            <div className="vnosnaPolja">
                <div><label htmlFor="ime">Ime:</label>
                <input type="text" name="ime" value={podatkiState.ime} onChange={HandleChange}/>
                <label htmlFor="priimek">Priimek:</label>
                <input type="text" name="priimek" value={podatkiState.priimek} onChange={HandleChange}/></div>
                <div><label htmlFor="naslov">Naslov:</label>
                <input type="text" name="naslov" value={podatkiState.naslov} onChange={HandleChange}/>
                <label htmlFor="datumRojstva">Datum rojstva:</label>
                <input type="text" name="datumRojstva" value={podatkiState.datumRojstva} onChange={HandleChange}/>
                {/* <label htmlFor="starost">Starost:</label> */}
                <span>Starost:{podatkiState.starost}</span></div>
            </div>
            
        </div>
    )
}

export default OsebniPodatki;