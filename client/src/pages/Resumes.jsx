import { useState } from "react";


export default function Resumes() {

  const pattern_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pattern_password = /^[a-zA-Z0-9]{6,}$/;

  const [Form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    file: '',
  })

  const [Notify, setNotify] = useState({
    status: false,
    text: ''
  })

  const submitResume = async (e) => {
    e.preventDefault()

    if(Form.username.length < 3) 
      return setNotify({ status: false, text: 'Имя должно быть не менее 3 символов' })

    if(!pattern_email.test(Form.email)) 
        return setNotify({ status: false, text: 'Неверный формат email' })
      
    if(Form.password.length < 6) 
      return setNotify({ status: false, text: 'Пароль должен быть не менее 6 символов' })
  
    if(!pattern_password.test(Form.password)) 
      return setNotify({ status: false, text: 'Неверный формат пароля' })

    console.log(Form)

    const fd = new FormData()

    for(let key in Form) {
      fd.append(key, Form[key])
    }

    const res = await fetch('http://localhost:5000/api/resumes', {
      method: 'POST',
      body: fd
    })

    const data = await res.json()

    console.log(data)

    if(data.status == 'ok')
      setNotify({ status: true, text: 'Резюме успешно отправлено' })
    else
      setNotify({ status: false, text: 'Ошибка отправки резюме' })

  }


  return (
    <>
      <h3 className="text-center">Разместить резюме</h3>

      <div className="m-auto col-md-8">
        <form onSubmit={submitResume}>
          <div className="py-1">
            <label className="form-label">Ваше имя</label>
            <input type="text" className="form-control" 
                   onChange={ (e) => setForm({ ...Form, username: e.target.value }) } />
          </div>
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
            <label className="form-label">Файл резюме</label>
            <input type="file" className="form-control" 
                   onChange={ (e) => setForm({ ...Form, file: e.target.files[0] }) }
            />
          </div>
          <div className="py-1">
            <button className="btn btn-primary">Разместить резюме</button>
          </div>
        </form>

        <p className={`mt-2 text-${Notify.status ? 'success' : 'danger' }`}>{ Notify.text }</p>


      </div>
    </>
  );
}