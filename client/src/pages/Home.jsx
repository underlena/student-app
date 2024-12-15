import { useState, useEffect } from "react";

export default function Home() {

  const [Vacancies, setVacancies] = useState([])
  const [SearchText, setSearchText] = useState('')

  const fetchSearch = async (e) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:5000/api/vacancies?search=${SearchText}`)
    const data = await res.json()

    setVacancies(data)

    console.log(data)

  }


  return (
    <>
      <h3 className="text-center">Поиск вакансий</h3>

      <form className="m-auto col-md-8 d-flex" onSubmit={fetchSearch}>
        <input type="text" 
               className="form-control" 
               placeholder="Введите название вакансии" 
               onInput={ (e) => setSearchText(e.target.value.trim()) }       
        />
        <button className="btn btn-primary ms-1">Найти</button>
      </form>

      <hr />

      <div className="m-auto col-md-10 list-group">

        { Vacancies.length ? 
            Vacancies.map(vacancy => (
              <div className="list-group-item" key={vacancy}>
                <h5>{vacancy}</h5>
              </div>
            ))
          :
          <h2 className="text-muted">Нет результатов</h2>
        }

      </div>
    </> 
  );
}