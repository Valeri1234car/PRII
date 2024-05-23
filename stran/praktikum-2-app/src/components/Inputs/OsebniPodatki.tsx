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
            <h2 className="mb-4 text-primary fw-bold">Vnos osebnih podatkov</h2>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="ime" className="form-label">Ime:</label>
                    <input type="text" className="form-control" name="ime" value={podatkiState.ime} onChange={HandleChange} style={{ borderColor: 'blue', color: 'blue' }}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="priimek" className="form-label">Priimek:</label>
                    <input type="text" className="form-control" name="priimek" value={podatkiState.priimek} onChange={HandleChange} style={{ borderColor: 'green', color: 'green' }}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="naslov" className="form-label">Naslov:</label>
                    <input type="text" className="form-control" name="naslov" value={podatkiState.naslov} onChange={HandleChange} style={{ borderColor: 'purple', color: 'purple' }}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="datumRojstva" className="form-label">Datum rojstva:</label>
                    <input type="text" className="form-control" name="datumRojstva" value={podatkiState.datumRojstva} onChange={HandleChange} style={{ borderColor: 'orange', color: 'orange' }}/>
                </div>
                <div className="col-md-12">
                    <span className="d-block">Starost: {podatkiState.starost}</span>
                </div>
            </div>
        </div>

    )
}

export default OsebniPodatki;