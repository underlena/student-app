export default function Account({ data, logout }) {


  return (
    <>
      <h3 className="text-center">Личный кабинет</h3>
      <h1 className="text-center text-success">Привет { data?.username }!</h1>
      <p>какие-то данные о пользователе</p>
      <p>email: { data?.email }</p>
      <p>phone: { data?.phone }</p>
      <p>возраст: { data?.age } лет</p>

      <hr />

      <h4>Статус резюме:</h4>

      { data?.status == 1 ?
        <p className="fw-bold text-warning">На рассмотрении</p>
        :
        data?.status == 2 ?
        <p className="fw-bold text-success">Принято</p>
        :
        <p className="fw-bold text-danger">Отклонено</p>
      }


    </>  
  );
}