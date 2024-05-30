import {useContext, useState} from "react";
import { PodatkiContext } from "../../App";
function FinancniIzpiski() {
    const { data, HandleChange } = useContext(PodatkiContext);

    return (
        <div className="vnosItem">
            <h2 className="mb-4 text-info text-dark">Financni Izpiski</h2>
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th></th>
                        <th>T-3</th>
                        <th>T-2</th>
                        <th>T-1</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mesečni promet v dobro:</td>
                        <td><input type="number" className="form-control" name="mesecniPrometDobro.t1" onChange={HandleChange} value={data.mesecniPrometDobro?.t1 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="mesecniPrometDobro.t2" onChange={HandleChange} value={data.mesecniPrometDobro?.t2 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="mesecniPrometDobro.t3" onChange={HandleChange} value={data.mesecniPrometDobro?.t3 ?? 0} /></td>
                    </tr>
                    <tr>
                        <td>Mesečni promet v breme:</td>
                        <td><input type="number" className="form-control" name="mesecniPrometBreme.t1" onChange={HandleChange} value={data.mesecniPrometBreme?.t1 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="mesecniPrometBreme.t2" onChange={HandleChange} value={data.mesecniPrometBreme?.t2 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="mesecniPrometBreme.t3" onChange={HandleChange} value={data.mesecniPrometBreme?.t3 ?? 0} /></td>
                    </tr>
                    <tr>
                        <td>Stanje na TRR:</td>
                        <td><input type="number" className="form-control" name="stanjeTRR.t1" onChange={HandleChange} value={data.stanjeTRR?.t1 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="stanjeTRR.t2" onChange={HandleChange} value={data.stanjeTRR?.t2 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="stanjeTRR.t3" onChange={HandleChange} value={data.stanjeTRR?.t3 ?? 0} /></td>
                    </tr>
                    <tr>
                        <td>Znesek prejemkov iz dela oz. pokojnina:</td>
                        <td><input type="number" className="form-control" name="znesekPrejemkovPokojnina.t1" onChange={HandleChange} value={data.znesekPrejemkovPokojnina?.t1 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="znesekPrejemkovPokojnina.t2" onChange={HandleChange} value={data.znesekPrejemkovPokojnina?.t2 ?? 0} /></td>
                        <td><input type="number" className="form-control" name="znesekPrejemkovPokojnina.t3" onChange={HandleChange} value={data.znesekPrejemkovPokojnina?.t3 ?? 0} /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FinancniIzpiski