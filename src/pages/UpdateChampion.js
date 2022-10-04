import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateChampion() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [champion, setChampion] = useState({
        quantity: "",
    })
    const { quantity } = champion

    const onInputChange = (e) => {
        setChampion({ champion, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        loadChampion()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/champion/${id}`, champion)
        navigate("/")

    }

    const loadChampion = async () => {
        const result = await axios.get(`http://localhost:8080/champion/${id}`)
        setChampion(result.data);
    }

    return (
        <div className='container' >
            <div className="row mt-5 ">
                <h1 class=" font-monospace mt-5" style={{ color: "#190E4B" }} to="/">
                </h1>
                <div className="col-md-3 offset-md-4 border rounded p-4 mt-5 shadow  " style={{ backgroundColor: "#040f1f", color: "white" }}>
                    <h2 className="text-center font-monospace mt-2 ">
                        Güncelle
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3 font-monospace">
                            <label htmlFor="quantity" className="form-label">Kart Değeri:</label>
                            <input type={"number"} maxlength="3" className="form-control" placeholder="Enter your Job" name="quantity" value={quantity} onChange={(e) => onInputChange(e)} required></input>
                        </div>
                        <button type="submit" class="btn btn-light mx-0">Güncelle</button>
                        <Link type="button" class="btn btn-danger mx-1" to="/">İptal</Link>
                    </form>
                </div>
            </div></div>

    )
}
