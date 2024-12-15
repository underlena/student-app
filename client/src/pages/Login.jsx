import { useState } from "react";


export default function Login() {

  const pattern_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pattern_password = /^[a-zA-Z0-9]{6,}$/;

  const [Form, setForm] = useState({
    email: '',
    password: '',
  })

  const [Err, setErr] = useState('')

  const login = async (e) => {
    e.preventDefault()

    if(!pattern_email.test(Form.email)) 
      return setErr('Неверный формат email')

    if(Form.password.length < 6) 
      return setErr('Пароль должен быть не менее 6 символов')
  
    if(!pattern_password.test(Form.password)) 
      return setErr('Неверный формат пароля')
  
    const fd = new FormData()

    for(let key in Form) {
      fd.append(key, Form[key])
    }

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      body: fd
    })

    const data = await res.json()

    console.log(data)

    if(data.status == 'ok')
    {
      setErr('')
      localStorage.setItem('token_login', data.token_login)
      window.location.assign('/account')
    }
    else
      setErr('Неправильный логин или пароль')

  }


  return (
    <>
    <h3 className="text-center">Войти в личный кабинет</h3>

    <div className="m-auto col-md-8">
        <form onSubmit={ login }>
          <div className="py-1">
            <label className="form-label">Ваш email</label>
            <input type="email" className="form-control" 
                   onChange={ (e) => setForm({ ...Form, email: e.target.value }) }
            />
          </div>
          <div className="py-1">
            <label className="form-label">Пароль</label>
            <input type="password" className="form-control" 
                   onChange={ (e) => setForm({ ...Form, password: e.target.value }) }
            />
          </div>
          <div className="py-1">
            <button className="btn btn-primary">Войти</button>
          </div>
        </form>

        <p className="mt-2 text-danger">{ Err }</p>
    </div>
    </>
  );
}