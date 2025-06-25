export const fetchData = async (username) => {
  try{const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`)
  const data = await response.json()
  console.log(data)
  return data
} catch (error){
  console.error("Failed to fetch", error)
}
}

