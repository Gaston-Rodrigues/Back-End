const logoutBtn = document.getElementById('logoutBtn')

logoutBtn.addEventListener('click', async (e) => {
    const result = await fetch('https://back-end-production-4d62.up.railway.app/api/session/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
    }})
    const { redirect } = await result.json()
    window.location.href = redirect
})