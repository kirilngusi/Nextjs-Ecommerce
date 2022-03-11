
const url_Base = 'http://localhost:3000';

export const getData = async (url:string) => {
    const res = await fetch(`${url_Base}/api/${url}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
   
    return await res.json()
}

export const postData = async (url:string, data:any) => {
    const res = await fetch(`${url_Base}/api/${url}` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
   
    return await res.json()
}

