
const url_Base = 'http://localhost:3000';

// const token =  localStorage.getItem('token')

export const getData = async (url:string) => {

    const res = await fetch(`${url_Base}/api/${url}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
    })
   
    return await res.json()
}

export const postData = async (url:string, data:any) => {

    const res = await fetch(`${url_Base}/api/${url}` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(data)
    })
   
    return await res.json()
}

