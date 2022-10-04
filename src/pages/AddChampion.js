import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddChampion() {

    let navigate = useNavigate();

    const [champion, setChampion] = useState({
        championName: "",
        role: "",
        image: "",
        quantity: 1,

    })
    const { championName, role, image, quantity } = champion

    const onInputChange = (e) => {
        setChampion({ ...champion, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/champion/add", champion)
        navigate("/")
    }

    return (
        <div className='container' >
            <div className="row mt-5 ">
                <h1 class=" font-monospace mt-5" style={{ color: "#190E4B" }} to="/">
                </h1>
                <div className="col-md-3 offset-md-4 border rounded p-4 mt-5 shadow  " style={{ backgroundColor: "#040f1f", color: "white" }}>
                    <h2 className="text-center font-monospace mt-2 ">
                        Ekleyeceğin Şampiyonu Belirle
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3 font-monospace">
                            <label htmlFor="championName" className="form-label">Şampiyon Adı:</label>
                            <input type={"text"} className="form-control" placeholder="şampiyon adı" name="championName" value={championName} onChange={(e) => onInputChange(e)} required></input>
                        </div>
                        <label htmlFor="championName" className="form-label">Rolü:</label>
                        <div class="input-group mb-3 font-monospace" >
                            <select class="form-select font-monospace" id="inputGroupSelect01" name="role" value={role} onChange={(e) => onInputChange(e)} >
                                <option selected>Seç</option>
                                <option value="Dövüşçü">Dövüşçü</option>
                                <option value="Büyücü">Büyücü</option>
                                <option value="Nişancı">Nişancı</option>
                                <option value="Destek">Destek</option>
                                <option value="Suikastçi">Suikastçi</option>
                                <option value="Tank">Tank</option>
                            </select>
                        </div>
                        <div className="mb-3 font-monospace">
                            <label htmlFor="image" className="form-label">Resim Linki:</label>
                            <input type={"text"} className="form-control" placeholder="resim linki" name="image" value={image} onChange={(e) => onInputChange(e)} required></input>
                        </div>

                        <button type="submit" class="btn btn-light mx-0">Ekle</button>
                        <Link type="button" class="btn btn-danger mx-1" to="/">İptal</Link>
                    </form>
                </div>
            </div></div>

    )
}
