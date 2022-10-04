import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FaGrin, FaFrown, FaTrashAlt, FaUndoAlt, FaPen, FaSearch } from "react-icons/fa";
export default function Home() {

    const [inputText, setInputText] = useState("");


    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    let filterH = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const [champion, setChampion] = useState([])
    useEffect(() => {
        loadChampion();
    }, []);

    const loadChampion = async () => {
        const result = await axios.get("http://localhost:8080/champion/getAll")
        setChampion(result.data);
    }
    const deleteChampion = async (id) => {
        await axios.delete(`http://localhost:8080/champion/${id}`)
        loadChampion()

    }
    const resetQuantity = async (id) => {
        await axios.put(`http://localhost:8080/champion/${id}`, { quantity: "0" })
        loadChampion()
    }
    const updateQuantity = async (id, val) => {
        await axios.put(`http://localhost:8080/champion/${id}`, { val: champion.quantity }).then((res) => {
            console.log(val);
        }).catch((err) => {
            console.log(err)
        })
        loadChampion()
    }

    return (
        <div class="row justify-content-center mt-5 " >
            <div class=" col-5 mt-5  text-center">
                <h1 class="  font-monospace mt-4 fs-1" style={{ color: "#190E4B" }} to="/">
                    Şampiyon Kartları</h1>
                    <div class=" input-group rounded mt-5  text-center" input={inputText} >
                        <input type="search" class="form-control rounded" placeholder="Arama yap" aria-label="Search" aria-describedby="search-addon" onChange={inputHandler} />
                        <span class="input-group-text border-0" id="search-addon">
                            <i class="fas"><FaSearch></FaSearch></i>
                        </span>
                    </div>
                    <div class="input-group mb-2 font-monospace mt-2" >
                        <select class="form-select font-monospace" id="inputGroupSelect01" name="role" onChange={filterH}>
                            <option value="">Tümü</option>
                            <option value="Dövüşçü">Dövüşçü</option>
                            <option value="Büyücü">Büyücü</option>
                            <option value="Nişancı">Nişancı</option>
                            <option value="Destek">Destek</option>
                            <option value="Suikastçi">Suikastçi</option>
                            <option value="Tank">Tank</option>
                        </select>
                    </div>
            </div>

            <div class="col-12 mt-2 ">
                <div class="row row-cols-1 row-cols-md-6 mt-1 ">


                    <Link type="button" class="btn btn-dark font-monospace  mt-5 mb-5  align-bottom  fs-1" to="/addChampion" style={{ backgroundColor: "#040f1f" }}>Şampiyon Kartı Eklemek İçin Buraya Tıkla !!!</Link>
                    {champion.filter(champion => {
                        if (inputText === "") {
                            //if query is empty
                            return champion;
                        }  if (champion.championName.toLowerCase().includes(inputText.toLowerCase())) {
                            //returns filtered array
                            return champion;
                        } else if (champion.role.toLowerCase().includes(inputText.toLowerCase())) {
                            return champion;
                        }

                    })
                        .map((champion, index) => (
                            <div class="col-sm mt-5 mb-5 " key={index}>
                                <div class="card h-100 foto shadow ">
                                    <a ><img src={champion.image} class="card-img-top " /></a>
                                    <div class="card-body " style={{ backgroundColor: "#040f1f", color: 'white' }}>
                                        <h5 class="card-title  font-monospace  text-lg-center "> {champion.championName}</h5>
                                        <p class="card-text section-white font-monospace text-lg-center">
                                            {champion.role}
                                        </p>
                                        <p class="card-text section-white font-monospace text-lg-center">Değeri:
                                            <span maxlength="3" style={{ color: 'cyan' }}> {champion.quantity}$</span>
                                        </p>
                                        <div class="text-center mt-5">
                                            <Link type="button" style={{ backgroundColor: "transparent", color: "yellow", border: "none", fontSize: 14 }} class="btn  mx-2" to={`/updatechampion/${champion.id}`}><FaPen /></Link>
                                            <button style={{ backgroundColor: "transparent", color: "red", border: "none", fontSize: 14 }} class="btn  mx-2" onClick={() => deleteChampion(champion.id)}><FaTrashAlt /></button>
                                            <button style={{ backgroundColor: "transparent", color: "cyan", border: "none", fontSize: 14 }} class="btn  mx-2" onClick={() => resetQuantity(champion.id)}><FaUndoAlt /></button>
                                        </div>
                                    </div>

                                </div> </div>

                        ))
                    }


                </div>
            </div>

        </div>
    )
}
