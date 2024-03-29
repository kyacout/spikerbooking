export const getReq = (url, params = '') => {
  return fetch(`${url}?${new URLSearchParams(params)}`, { method: 'GET' })
    .then(res => res.json())
    .then(body => {
      if (body.errors) {
        return { errors: body.errors }
      } else {
        return { data: body }
      }
    })
}

export const postFormData = (url, data, token) => {
  const formData = new FormData()
  Object.keys(data).forEach(k => formData.append(k, data[k]))
  return fetch(url, {
    method: 'POST',
    headers: { 'X-CSRF-Token': token },
    body: formData,
  })
    .then(res => res.json())
    .then(body => {
      if (body.errors) {
        return { errors: body.errors }
      } else {
        return { data: body }
      }
    })
}

export const postReq = (url, body, token, contentType = 'application/json') => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': contentType, 'X-CSRF-Token': token },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(body => {
      if (body.errors) {
        return { errors: body.errors }
      } else {
        return { data: body }
      }
    })
}

export const putReq = (url, body, token, contentType = 'application/json') => {
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': contentType, 'X-CSRF-Token': token },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(body => {
      if (body.errors) {
        return { errors: body.errors }
      } else {
        return { data: body }
      }
    })
}

export const deleteReq = (url, token) => {
  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
  })
}
