/**
 * @file OsebniPodatki.tsx
 * @brief Komponenta za vnos in prikaz osebnih podatkov
 *
 * @opis Komponenta OsebniPodatki omogoča uporabnikom vnos osebnih podatkov, kot so ime, priimek, naslov in datum rojstva.
 * Komponenta uporablja kontekst za dostop do stanja aplikacije in izračuna starost uporabnika na podlagi vnosa datuma rojstva.
 *
 * @potrebuje react, useContext, useEffect iz "react", PodatkiContext iz "../../App"
 *
 * @verzija 1.0.0
 * @since 1.0.0
 */

import { useContext, useEffect } from "react";
import { PodatkiContext } from "../../App";


const OsebniPodatki = () => {
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
            <h2 className="mb-4 text-primary text-dark">Vnos osebnih podatkov</h2>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="ime" className="form-label">Ime:</label>
                    <input type="text" className="form-control" name="ime" value={podatkiState.ime} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="priimek" className="form-label">Priimek:</label>
                    <input type="text" className="form-control" name="priimek" value={podatkiState.priimek} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="naslov" className="form-label">Naslov:</label>
                    <input type="text" className="form-control" name="naslov" value={podatkiState.naslov} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="datumRojstva" className="form-label">Datum rojstva:</label>
                    <input type="text" className="form-control" name="datumRojstva" value={podatkiState.datumRojstva} onChange={HandleChange} style={{ borderColor: 'black', color: 'black' }}/>
                </div>
                <div className="col-md-12">
                    <span className="d-block">Starost: {podatkiState.starost}</span>
                </div>
            </div>
        </div>

    )
}



export default OsebniPodatki;
