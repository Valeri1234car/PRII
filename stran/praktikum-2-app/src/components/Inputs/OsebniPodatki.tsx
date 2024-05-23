import React, { useContext, useEffect } from "react";
import { PodatkiContext } from "../../App";
import { Podatki } from "../../interface/Podatki";
import { zneskiMesecnihAnuitet } from "../../interface/ZneskiMesecnihAnuitet";

const OsebniPodatki: React.FC = () => {
    const { podatkiState, setPodatkiState, HandleChange } = useContext(PodatkiContext);

    useEffect(() => {
        function calculateAge(dateOfBirth: Date) {
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

        if (age >= 18) {
            setPodatkiState({ ...podatkiState, starost: age, starost18: true });
        } else {
            setPodatkiState({ ...podatkiState, starost: age });
        }
    }, [podatkiState.datumRojstva]);

    return (
        <div className="vnosItem">
            <h2>Vnos osebnih podatkov</h2>
            <div className="vnosnaPolja">
                <div>
                    <label htmlFor="ime">Ime:</label>
                    <input type="text" name="ime" value={podatkiState.ime} onChange={HandleChange} />
                    <label htmlFor="priimek">Priimek:</label>
                    <input type="text" name="priimek" value={podatkiState.priimek} onChange={HandleChange} />
                </div>
                <div>
                    <label htmlFor="naslov">Naslov:</label>
                    <input type="text" name="naslov" value={podatkiState.naslov} onChange={HandleChange} />
                    <label htmlFor="datumRojstva">Datum rojstva:</label>
                    <input type="text" name="datumRojstva" value={podatkiState.datumRojstva} onChange={HandleChange} />
                    <span>Starost: {podatkiState.starost}</span>
                </div>
            </div>
        </div>
    );
};

export default OsebniPodatki;
