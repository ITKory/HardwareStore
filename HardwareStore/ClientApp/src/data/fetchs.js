import { JsxEmit } from "typescript"

export function GetProductList(setProducts) {

  fetch('api/product/products', { method: 'GET', headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + sessionStorage.getItem('accessToken') } })
    .then(res => res.json())
    .then(
      (result) => {
        setProducts(result)
      },
    )
}


export async function ChangeProduct(student, setProducts) {

  await fetch('api/student/Edit', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(student) })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },
    )
    .then(GetProductList(setProducts))
}


export function RemoveProduct(setProducts, ProductId, Products) {
  const copy = [...Products]
  const current = copy.find(t => t.id === ProductId)
  fetch('api/student/Delete/' + current.id, { method: 'Delete', headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + sessionStorage.getItem('accessToken') }, body: JSON.stringify(current.id) })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },
    )

  setProducts([...Products].filter(t => t.id !== ProductId))

}

export async function CreateProduct(student, setProducts) {

  await fetch('api/student/Add', { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + sessionStorage.getItem('accessToken') }, body: JSON.stringify(student) })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },
    )
    .then(GetProductList(setProducts))

}

export function Register(user) {

  fetch('api/account/register', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then((result) => console.log(result))


}



export function Login({ auth, history, user }) {
  // fetch('api/account/auth', {
  //   method: "POST",
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(user)
  // })
  // .then(res => console.log(res.body))
  // .then(res => console.log(res))

  (async () => {
    const rawResponse = await fetch('api/account/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (rawResponse.ok) {
      const content = await rawResponse.json();
      sessionStorage.setItem("accessToken", content.access_token);


      const roleResponse = await fetch('api/account/get-role', {
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " +content.access_token },
      })


      const role = await roleResponse.json();
      auth.signin(() => {
      if (role.role == 'Admin'){
        history.push('/admin')
      }
      else{
        history.push('/user')
      }
    })
    }
  })();

  // .then(res => {
  //   if (res.ok) {
  //       console.log(res)
  //       console.log(JSON.stringify(res).access_token)
  //     auth.signin( async () => {



  //    const role = await fetch('api/account/get-role', {
  //         headers: { 'Content-Type': 'application/json', "Authorization": "Bearer "   },

  //       })


  //       if (role == 'admin') {
  //         history.push('/admin')
  //       }
  //       else {
  //         history.push('/user')
  //       }
  //     })
  //   }
  // });
  // .then(
  //   (result) => {
  //     // if (result.status == 200) {
  //     //   sessionStorage.setItem("accessToken", result.access_token);
  //     //   auth.signin(() => {
  //     //     if (result.role == 'admin') {
  //     //       history.push('/admin')
  //     //     }
  //     //     else {
  //     //       history.push('/user')
  //     //     }

  //     //   });
  //     // }
  //     // else {
  //     //   console.log("Error: ", result.status, result.errorText);
  //     // }
  //     console.log(result)

  //   },
  // )

}