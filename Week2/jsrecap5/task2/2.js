document.addEventListener('submit', async function(evt){
    evt.preventDefault();
    console.log("moi")


    const data = {

        body: JSON.stringify({
            name: document.querySelector('input[name=name]').value,
            job: document.querySelector('input[name=job]').value
        }),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    }

    try {
        const response = await fetch(`https://reqres.in/api/users/`, data);
        if (!response.ok) throw new Error('Invalid input!');
        const json = await response.json();
        console.log('result', json);

    } catch (error) {
        console.log('error', error);

    } finally {
        console.log('async load complete.')
    }
});

