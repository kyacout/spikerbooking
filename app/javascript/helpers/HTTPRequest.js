export const getReq = url => {
  return fetch(url, { method: 'GET' })
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

export const deleteReq = (url, token) => {
  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
  })
}

export const uploadPhoto = newPhoto => {
  const formData = new FormData()
  formData.append('file', newPhoto)

  // configure your fetch url appropriately
  fetch(`${baseURL}/photo/${this.props.profile.id}`, {
    method: 'PATCH',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      // do something with the returned data
    })
}
