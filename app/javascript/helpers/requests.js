export const postReq = (url, body, token) => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(body => {
      if (body.errors) {
        return { errors: body.errors }
      } else {
        return { data: body.data }
      }
    })
}

export const deleteReq = (url, token) => {
  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
  })
}
