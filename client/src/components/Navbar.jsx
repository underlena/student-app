import { NavLink } from 'react-router-dom'

export default function Navbar({ data, logout }) {

  

    return (
      <div className="navbar">
        <div className="container">
            <h2 className={`text-secondary`}>Платформа для студентов</h2>

            <nav>
                <NavLink to="/" className={`n-link`}>Вакансии</NavLink>
                <NavLink to="/resumes" className={`n-link`}>Резюме</NavLink>
                <span className={`mx-3`}>|</span>
                { data 
                  ?
                  <>
                    <NavLink to="/account" className={`btn btn-success`}>Личный кабинет</NavLink>
                    <button className={`btn btn-danger ms-1`} onClick={ logout }>Выйти</button>
                  </>
                  :
                  <NavLink to="/login" className={`btn btn-primary ms-1`}>Войти</NavLink>
                }
                
                
                
            </nav>
        </div>
      </div>
    );
  }